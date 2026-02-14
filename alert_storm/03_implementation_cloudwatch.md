# CloudWatch 告警风暴解决方案实现

## 一、动态阈值实现（Anomaly Detection）

### 1.1 实现原理
使用 CloudWatch Anomaly Detection 基于机器学习自动学习指标的正常行为模式，并创建动态阈值带。

### 1.2 完整代码实现

#### Python 代码实现

```python
import boto3
import json
from typing import Dict, List, Optional

class CloudWatchAnomalyDetector:
    def __init__(self, region_name: str = 'us-east-1'):
        """
        初始化 CloudWatch 异常检测器
        
        Args:
            region_name: AWS 区域名称
        """
        self.cloudwatch = boto3.client('cloudwatch', region_name=region_name)
    
    def create_anomaly_detector(self, 
                              namespace: str, 
                              metric_name: str, 
                              dimensions: List[Dict] = None,
                              stat: str = 'Average') -> str:
        """
        创建异常检测模型
        
        Args:
            namespace: 指标命名空间
            metric_name: 指标名称
            dimensions: 指标维度
            stat: 统计方法
            
        Returns:
            异常检测器 ARN
        """
        try:
            # 构建指标配置
            metric_config = {
                'Namespace': namespace,
                'MetricName': metric_name,
                'Stat': stat
            }
            
            if dimensions:
                metric_config['Dimensions'] = dimensions
            
            # 创建异常检测器
            response = self.cloudwatch.put_anomaly_detector(
                Namespace=namespace,
                MetricName=metric_name,
                Dimensions=dimensions or [],
                Stat=stat
            )
            
            print(f"异常检测器创建成功: {namespace}/{metric_name}")
            return response.get('ResponseMetadata', {}).get('RequestId')
            
        except Exception as e:
            print(f"创建异常检测器失败: {str(e)}")
            raise
    
    def create_anomaly_alarm(self,
                           alarm_name: str,
                           namespace: str,
                           metric_name: str,
                           threshold: float = 2.0,
                           dimensions: List[Dict] = None,
                           sns_topic_arn: str = None) -> str:
        """
        创建基于异常检测的告警
        
        Args:
            alarm_name: 告警名称
            namespace: 指标命名空间
            metric_name: 指标名称
            threshold: 异常阈值（标准差倍数）
            dimensions: 指标维度
            sns_topic_arn: SNS 主题 ARN
            
        Returns:
            告警 ARN
        """
        try:
            # 构建告警配置
            alarm_config = {
                'AlarmName': alarm_name,
                'ComparisonOperator': 'LessThanLowerOrGreaterThanUpperThreshold',
                'EvaluationPeriods': 2,
                'Metrics': [
                    {
                        'Id': 'm1',
                        'ReturnData': True,
                        'MetricStat': {
                            'Metric': {
                                'Namespace': namespace,
                                'MetricName': metric_name,
                                'Dimensions': dimensions or []
                            },
                            'Period': 300,
                            'Stat': 'Average'
                        }
                    },
                    {
                        'Id': 'ad1',
                        'Expression': f'ANOMALY_DETECTION_FUNCTION(m1, {threshold})'
                    }
                ],
                'ThresholdMetricId': 'ad1',
                'ActionsEnabled': True,
                'AlarmDescription': f'基于异常检测的告警: {metric_name}',
                'Unit': 'None'
            }
            
            # 添加 SNS 通知
            if sns_topic_arn:
                alarm_config['AlarmActions'] = [sns_topic_arn]
                alarm_config['OKActions'] = [sns_topic_arn]
            
            # 创建告警
            response = self.cloudwatch.put_metric_alarm(**alarm_config)
            
            print(f"异常检测告警创建成功: {alarm_name}")
            return f"arn:aws:cloudwatch:{self.cloudwatch.meta.region_name}:*:alarm:{alarm_name}"
            
        except Exception as e:
            print(f"创建异常检测告警失败: {str(e)}")
            raise

# 使用示例
if __name__ == "__main__":
    # 初始化检测器
    detector = CloudWatchAnomalyDetector(region_name='us-east-1')
    
    # 为 EC2 CPU 使用率创建异常检测
    dimensions = [{'Name': 'InstanceId', 'Value': 'i-1234567890abcdef0'}]
    
    # 创建异常检测模型
    detector.create_anomaly_detector(
        namespace='AWS/EC2',
        metric_name='CPUUtilization',
        dimensions=dimensions
    )
    
    # 创建基于异常检测的告警
    detector.create_anomaly_alarm(
        alarm_name='EC2-CPU-Anomaly-Detection',
        namespace='AWS/EC2',
        metric_name='CPUUtilization',
        threshold=2.0,  # 2个标准差
        dimensions=dimensions,
        sns_topic_arn='arn:aws:sns:us-east-1:123456789012:alerts'
    )
```

#### Terraform 配置

```hcl
# 异常检测器配置
resource "aws_cloudwatch_anomaly_detector" "cpu_anomaly" {
  metric_name = "CPUUtilization"
  namespace   = "AWS/EC2"
  stat        = "Average"
  
  dimensions = {
    InstanceId = var.instance_id
  }
  
  tags = {
    Name        = "CPU异常检测"
    Environment = var.environment
  }
}

# 基于异常检测的告警
resource "aws_cloudwatch_metric_alarm" "cpu_anomaly_alarm" {
  alarm_name          = "ec2-cpu-anomaly-${var.instance_id}"
  comparison_operator = "LessThanLowerOrGreaterThanUpperThreshold"
  evaluation_periods  = "2"
  threshold_metric_id = "e1"
  
  metric_query {
    id          = "e1"
    expression  = "ANOMALY_DETECTION_FUNCTION(m1, 2)"
    label       = "CPU异常检测"
    return_data = "true"
  }
  
  metric_query {
    id = "m1"
    
    metric {
      metric_name = "CPUUtilization"
      namespace   = "AWS/EC2"
      period      = "300"
      stat        = "Average"
      
      dimensions = {
        InstanceId = var.instance_id
      }
    }
  }
  
  alarm_description = "EC2实例CPU使用率异常检测告警"
  alarm_actions     = [aws_sns_topic.alerts.arn]
  ok_actions        = [aws_sns_topic.alerts.arn]
  
  tags = {
    Name        = "CPU异常告警"
    Environment = var.environment
  }
}
```

## 二、复合告警实现（Composite Alarms）

### 2.1 实现原理

使用 CloudWatch Composite Alarms 实现告警关联和抑制。复合告警通过逻辑表达式组合多个告警，实现：
- 告警关联：识别相关告警之间的依赖关系
- 告警抑制：当根因告警触发时，自动抑制依赖告警
- 告警聚合：将多个告警合并为单一通知

### 2.2 复合告警规则语法

#### 2.2.1 基本语法

复合告警使用 **AlarmRule** 表达式定义规则，支持以下逻辑运算符：

| 运算符 | 说明 | 示例 |
|-------|------|------|
| `AND` | 所有告警都触发 | `ALARM("A") AND ALARM("B")` |
| `OR` | 任意告警触发 | `ALARM("A") OR ALARM("B")` |
| `NOT` | 告警未触发 | `NOT ALARM("A")` |
| `()` | 分组优先级 | `(ALARM("A") OR ALARM("B")) AND ALARM("C")` |

#### 2.2.2 常见规则模式

**模式 1: OR 规则（任意组件故障）**
```python
# 任意一个组件告警就触发
alarm_rule = 'ALARM("EC2-CPU-High") OR ALARM("RDS-Connection-Failed") OR ALARM("API-Timeout")'
```

**模式 2: AND 规则（多个条件同时满足）**
```python
# 必须同时满足多个条件
alarm_rule = 'ALARM("High-CPU") AND ALARM("High-Memory") AND ALARM("High-Disk-IO")'
```

**模式 3: 复杂组合规则**
```python
# 根因告警 OR (依赖告警 AND 无根因)
alarm_rule = '''
ALARM("RootCause-NetworkDown") OR 
(ALARM("Dependent-ServiceUnavailable") AND NOT ALARM("RootCause-NetworkDown"))
'''
```

**模式 4: 服务健康检查（至少 N 个组件故障）**
```python
# 至少 2 个组件故障才触发
alarm_rule = '''
(ALARM("Component-A") AND ALARM("Component-B")) OR
(ALARM("Component-A") AND ALARM("Component-C")) OR
(ALARM("Component-B") AND ALARM("Component-C"))
'''
```

### 2.3 完整代码实现

#### 2.3.1 Python 代码实现

```python
class CompositeAlarmManager:
    def __init__(self, region_name: str = 'us-east-1'):
        """
        初始化复合告警管理器
        
        Args:
            region_name: AWS 区域名称
        """
        self.cloudwatch = boto3.client('cloudwatch', region_name=region_name)
    
    def create_composite_alarm(self,
                             alarm_name: str,
                             alarm_rule: str,
                             alarm_description: str = None,
                             actions_enabled: bool = True,
                             alarm_actions: List[str] = None,
                             ok_actions: List[str] = None,
                             actions_suppressor: str = None,
                             actions_suppressor_wait_period: int = None,
                             actions_suppressor_extension_period: int = None) -> str:
        """
        创建复合告警
        
        Args:
            alarm_name: 复合告警名称
            alarm_rule: 告警规则表达式（如 'ALARM("A") OR ALARM("B")'）
            alarm_description: 告警描述
            actions_enabled: 是否启用操作
            alarm_actions: 告警时的操作（SNS ARN 列表）
            ok_actions: 恢复时的操作（SNS ARN 列表）
            actions_suppressor: 告警抑制器（告警名称）
            actions_suppressor_wait_period: 抑制等待时间（秒）
            actions_suppressor_extension_period: 抑制延长时间（秒）
            
        Returns:
            复合告警 ARN
        """
        try:
            # 构建基本参数
            params = {
                'AlarmName': alarm_name,
                'AlarmRule': alarm_rule,
                'ActionsEnabled': actions_enabled
            }
            
            # 添加可选参数
            if alarm_description:
                params['AlarmDescription'] = alarm_description
            if alarm_actions:
                params['AlarmActions'] = alarm_actions
            if ok_actions:
                params['OKActions'] = ok_actions
            
            # 添加告警抑制配置
            if actions_suppressor:
                params['ActionsSuppressor'] = actions_suppressor
                if actions_suppressor_wait_period:
                    params['ActionsSuppressorWaitPeriod'] = actions_suppressor_wait_period
                if actions_suppressor_extension_period:
                    params['ActionsSuppressorExtensionPeriod'] = actions_suppressor_extension_period
            
            # 创建复合告警
            response = self.cloudwatch.put_composite_alarm(**params)
            
            print(f"复合告警创建成功: {alarm_name}")
            return f"arn:aws:cloudwatch:{self.cloudwatch.meta.region_name}:*:alarm:{alarm_name}"
            
        except Exception as e:
            print(f"创建复合告警失败: {str(e)}")
            raise
    
    def create_service_health_composite(self,
                                      service_name: str,
                                      component_alarms: List[str],
                                      sns_topic_arn: str = None) -> str:
        """
        创建服务健康状态复合告警
        
        Args:
            service_name: 服务名称
            component_alarms: 组件告警列表
            sns_topic_arn: SNS 主题 ARN
            
        Returns:
            复合告警 ARN
        """
        # 构建告警规则：任意组件告警触发时，服务告警
        alarm_rule = self.build_or_rule(component_alarms)
        
        composite_alarm_name = f"{service_name}-service-health"
        
        return self.create_composite_alarm(
            alarm_name=composite_alarm_name,
            alarm_rule=alarm_rule,
            alarm_description=f"{service_name} 服务健康状态告警",
            alarm_actions=[sns_topic_arn] if sns_topic_arn else None,
            ok_actions=[sns_topic_arn] if sns_topic_arn else None
        )
    
    def create_suppression_composite(self,
                                   alarm_name: str,
                                   root_cause_alarm: str,
                                   dependent_alarms: List[str],
                                   sns_topic_arn: str = None) -> str:
        """
        创建带抑制功能的复合告警
        
        当根因告警触发时，自动抑制依赖告警的通知
        
        Args:
            alarm_name: 复合告警名称
            root_cause_alarm: 根因告警名称
            dependent_alarms: 依赖告警列表
            sns_topic_arn: SNS 主题 ARN
            
        Returns:
            复合告警 ARN
        """
        # 构建规则：根因 OR 依赖告警
        dependent_rule = self.build_or_rule(dependent_alarms)
        alarm_rule = f'ALARM("{root_cause_alarm}") OR ({dependent_rule})'
        
        return self.create_composite_alarm(
            alarm_name=alarm_name,
            alarm_rule=alarm_rule,
            alarm_description=f"复合告警 - 根因: {root_cause_alarm}",
            actions_suppressor=root_cause_alarm,  # 根因告警作为抑制器
            actions_suppressor_wait_period=300,    # 等待 5 分钟
            actions_suppressor_extension_period=60, # 延长 1 分钟
            alarm_actions=[sns_topic_arn] if sns_topic_arn else None
        )
    
    @staticmethod
    def build_or_rule(alarm_names: List[str]) -> str:
        """构建 OR 规则"""
        return ' OR '.join([f'ALARM("{name}")' for name in alarm_names])
    
    @staticmethod
    def build_and_rule(alarm_names: List[str]) -> str:
        """构建 AND 规则"""
        return ' AND '.join([f'ALARM("{name}")' for name in alarm_names])
    
    @staticmethod
    def build_suppression_rule(primary_alarm: str, dependent_alarms: List[str]) -> str:
        """
        构建抑制规则：主告警触发时抑制依赖告警
        
        规则逻辑：主告警 OR (依赖告警 AND NOT 主告警)
        """
        dependent_rule = CompositeAlarmManager.build_or_rule(dependent_alarms)
        return f'ALARM("{primary_alarm}") OR ({dependent_rule} AND NOT ALARM("{primary_alarm}"))'
```

#### 2.3.2 使用示例

```python
# 初始化管理器
manager = CompositeAlarmManager(region_name='us-east-1')

# 示例 1: 简单 OR 规则
manager.create_composite_alarm(
    alarm_name='Service-Health-Check',
    alarm_rule='ALARM("EC2-Down") OR ALARM("RDS-Down") OR ALARM("LoadBalancer-Unhealthy")',
    alarm_description='服务健康检查 - 任意组件故障触发',
    alarm_actions=['arn:aws:sns:us-east-1:123456789012:critical-alerts']
)

# 示例 2: 根因抑制规则
manager.create_composite_alarm(
    alarm_name='Database-Connection-Alert',
    alarm_rule='ALARM("DB-Connection-Failed") AND NOT ALARM("RootCause-RDS-Down")',
    alarm_description='数据库连接失败（排除 RDS 宕机情况）',
    alarm_actions=['arn:aws:sns:us-east-1:123456789012:alerts']
)

# 示例 3: 使用 ActionsSuppressor
manager.create_composite_alarm(
    alarm_name='Composite-App-Health',
    alarm_rule='ALARM("RootCause-EC2-Down") OR ALARM("Dependent-DB-Connection-Failed")',
    actions_suppressor='RootCause-EC2-Down',  # 当根因触发时抑制通知
    actions_suppressor_wait_period=300,        # 等待 5 分钟
    actions_suppressor_extension_period=60,    # 延长 1 分钟
    alarm_actions=['arn:aws:sns:us-east-1:123456789012:alerts']
)

# 示例 4: 复杂健康评分
manager.create_composite_alarm(
    alarm_name='Critical-Service-Degradation',
    alarm_rule='''
    (ALARM("High-Error-Rate") AND ALARM("High-Latency")) OR
    (ALARM("Database-Slow") AND ALARM("Cache-Miss-High")) OR
    ALARM("Infrastructure-Critical")
    ''',
    alarm_description='服务严重降级 - 多维度评估',
    alarm_actions=['arn:aws:sns:us-east-1:123456789012:pagerduty']
)

# 示例 5: 使用辅助方法创建带抑制的复合告警
manager.create_suppression_composite(
    alarm_name='Network-Dependent-Alerts',
    root_cause_alarm='NetworkSwitch-Down',
    dependent_alarms=['Server-01-Down', 'Server-02-Down', 'LoadBalancer-Unhealthy'],
    sns_topic_arn='arn:aws:sns:us-east-1:123456789012:alerts'
)
```

### 2.4 通过 CloudWatch Console 创建

#### 2.4.1 创建步骤

**步骤 1: 进入创建页面**
```
AWS Console → CloudWatch → Alarms → Create alarm → Create a composite alarm
```

或直接访问：
```
https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#alarmsV2:composite/create
```

**步骤 2: 配置告警名称和描述**
- **Alarm name**: 输入告警名称（如 `Service-Health-Composite`）
- **Alarm description**: 输入描述（可选）

**步骤 3: 定义告警规则**

Console 提供两种方式：

**方式 A: 可视化规则构建器（推荐新手）**

```
┌─────────────────────────────────────────────────┐
│ Alarm rule builder                              │
├─────────────────────────────────────────────────┤
│                                                 │
│ [Add condition]                                 │
│                                                 │
│ ┌─────────────────────────────────────────┐   │
│ │ Condition 1                              │   │
│ │ Alarm: [Select alarm ▼] EC2-CPU-High    │   │
│ │ State: [ALARM ▼]                         │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ [AND] [OR]                                      │
│                                                 │
│ ┌─────────────────────────────────────────┐   │
│ │ Condition 2                              │   │
│ │ Alarm: [Select alarm ▼] RDS-Down        │   │
│ │ State: [ALARM ▼]                         │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ [Add condition]                                 │
└─────────────────────────────────────────────────┘
```

**方式 B: 直接输入规则表达式（推荐高级用户）**

切换到 "Expression" 模式，直接输入：
```
ALARM("EC2-CPU-High") OR ALARM("RDS-Down")
```

**步骤 4: 配置告警抑制（可选）**

```
┌─────────────────────────────────────────────────┐
│ Actions suppressor (optional)                   │
├─────────────────────────────────────────────────┤
│                                                 │
│ ☑ Enable actions suppressor                    │
│                                                 │
│ Suppressor alarm: [Select ▼] RootCause-Down    │
│                                                 │
│ Wait period: [300] seconds                      │
│ Extension period: [60] seconds                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

**步骤 5: 配置通知**

```
┌─────────────────────────────────────────────────┐
│ Notification                                    │
├─────────────────────────────────────────────────┤
│                                                 │
│ Alarm state trigger: [In alarm ▼]              │
│                                                 │
│ Send notification to:                           │
│ [Select an SNS topic ▼] critical-alerts         │
│                                                 │
│ [+ Add notification]                            │
│                                                 │
└─────────────────────────────────────────────────┘
```

**步骤 6: 预览和创建**
- 预览告警规则
- 点击 **Create alarm**

#### 2.4.2 Console 的优势和限制

**✅ 优势**
- **可视化操作**：无需编写代码
- **实时验证**：自动验证规则语法
- **告警选择器**：下拉菜单选择现有告警
- **即时预览**：查看规则效果

**⚠️ 限制**
- **批量创建困难**：一次只能创建一个
- **复杂规则不便**：超过 5 个条件时表达式更方便
- **无版本控制**：不如 IaC（Terraform/CloudFormation）
- **难以复制**：无法快速复制相似配置

#### 2.4.3 最佳实践建议

**适合用 Console 的场景：**
- 快速测试和验证
- 创建 1-2 个简单复合告警
- 学习和理解复合告警概念
- 临时应急处理

**适合用代码/IaC 的场景：**
- 批量创建多个告警
- 需要版本控制和审计
- 自动化部署
- 复杂的告警规则（> 5 个条件）
```