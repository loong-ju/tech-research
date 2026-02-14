# Prometheus + Grafana 告警风暴解决方案实现

## 一、Alertmanager 配置实现

### 1.1 告警分组和聚合

完整的 `alertmanager.yml` 配置：

```yaml
# 全局配置
global:
  # SMTP 配置
  smtp_smarthost: 'localhost:587'
  smtp_from: 'alertmanager@company.com'
  smtp_auth_username: 'alertmanager@company.com'
  smtp_auth_password: 'password'

# 告警分组和路由配置
route:
  # 默认分组等待时间 - 收集同组告警
  group_wait: 30s
  # 分组间隔时间 - 同组新告警等待时间
  group_interval: 5m
  # 重复告警间隔 - 防止告警风暴
  repeat_interval: 4h
  
  # 默认分组标签 - 按服务和告警类型分组
  group_by: ['cluster', 'service', 'alertname']
  
  # 默认接收器
  receiver: 'default-receiver'
  
  # 子路由配置 - 多级路由策略
  routes:
    # 高优先级告警 - 立即发送
    - match:
        severity: critical
      group_wait: 10s
      group_interval: 1m
      repeat_interval: 30m
      receiver: 'critical-alerts'
      
    # 基础设施告警 - 按集群分组
    - match_re:
        service: ^(kubernetes|etcd|docker).*
      group_by: ['cluster', 'alertname']
      group_wait: 1m
      group_interval: 10m
      receiver: 'infrastructure-team'
      
    # 应用告警 - 按应用分组
    - match_re:
        service: ^(web|api|database).*
      group_by: ['service', 'instance']
      group_wait: 2m
      group_interval: 15m
      receiver: 'application-team'
      
    # 网络告警 - 特殊处理
    - match:
        category: network
      group_by: ['cluster', 'network_zone']
      group_wait: 5m
      group_interval: 30m
      receiver: 'network-team'

# 告警抑制规则配置
inhibit_rules:
  # 节点宕机时抑制该节点上的所有其他告警
  - source_match:
      alertname: 'NodeDown'
    target_match_re:
      instance: '.*'
    equal: ['instance']
    
  # 服务不可用时抑制该服务的性能告警
  - source_match:
      alertname: 'ServiceDown'
    target_match_re:
      alertname: '(HighCPU|HighMemory|SlowResponse)'
    equal: ['service', 'instance']
    
  # 集群级别告警抑制节点级别告警
  - source_match:
      severity: 'critical'
      scope: 'cluster'
    target_match:
      severity: 'warning'
      scope: 'node'
    equal: ['cluster']
    
  # 网络分区告警抑制连接性告警
  - source_match:
      alertname: 'NetworkPartition'
    target_match_re:
      alertname: '(ConnectionFailed|HighLatency)'
    equal: ['network_zone']

# 接收器配置
receivers:
  # 默认接收器
  - name: 'default-receiver'
    email_configs:
      - to: 'ops-team@company.com'
        subject: '[{{ .Status | toUpper }}] {{ .GroupLabels.alertname }}'
        body: |
          {{ range .Alerts }}
          告警: {{ .Annotations.summary }}
          详情: {{ .Annotations.description }}
          时间: {{ .StartsAt.Format "2006-01-02 15:04:05" }}
          标签: {{ range .Labels.SortedPairs }}{{ .Name }}={{ .Value }} {{ end }}
          {{ end }}
    
  # 关键告警接收器
  - name: 'critical-alerts'
    email_configs:
      - to: 'oncall@company.com'
        subject: '[紧急] {{ .GroupLabels.alertname }}'
        body: |
          紧急告警通知！
          {{ range .Alerts }}
          告警: {{ .Annotations.summary }}
          影响: {{ .Annotations.impact }}
          处理建议: {{ .Annotations.runbook }}
          {{ end }}
    webhook_configs:
      - url: 'http://alert-correlation-service:8080/webhook/critical'
        send_resolved: true
    
  # 基础设施团队
  - name: 'infrastructure-team'
    email_configs:
      - to: 'infra-team@company.com'
        subject: '[基础设施] {{ .GroupLabels.service }}'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
        channel: '#infrastructure'
        title: '基础设施告警'
        text: '{{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'
    
  # 应用团队
  - name: 'application-team'
    email_configs:
      - to: 'app-team@company.com'
        subject: '[应用] {{ .GroupLabels.service }}'
    webhook_configs:
      - url: 'http://alert-correlation-service:8080/webhook/application'
        send_resolved: true
    
  # 网络团队
  - name: 'network-team'
    email_configs:
      - to: 'network-team@company.com'
        subject: '[网络] {{ .GroupLabels.network_zone }}'

# 模板配置
templates:
  - '/etc/alertmanager/templates/*.tmpl'
```

### 1.2 告警抑制规则详解

抑制规则的工作原理：

```yaml
# 高级抑制规则示例
inhibit_rules:
  # 1. 级联故障抑制 - 上游服务故障时抑制下游告警
  - source_match:
      alertname: 'DatabaseDown'
    target_match_re:
      alertname: '(APISlowResponse|WebServiceError)'
    equal: ['environment']
    
  # 2. 维护窗口抑制 - 维护期间抑制相关告警
  - source_match:
      alertname: 'MaintenanceWindow'
    target_match_re:
      alertname: '.*'
    equal: ['service', 'instance']
    
  # 3. 资源耗尽抑制 - 磁盘满时抑制写入相关告警
  - source_match:
      alertname: 'DiskSpaceFull'
    target_match_re:
      alertname: '(LogWriteError|DatabaseWriteError)'
    equal: ['instance']
    
  # 4. 时间窗口抑制 - 工作时间外降低告警优先级
  - source_match:
      alertname: 'OffHours'
    target_match:
      severity: 'warning'
    target_match_re:
      alertname: '^(?!Critical).*'
```

### 1.3 多级路由策略

```yaml
# 复杂路由配置示例
route:
  group_by: ['cluster']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'default'
  
  routes:
    # 第一级：按环境路由
    - match:
        environment: 'production'
      group_by: ['service', 'severity']
      receiver: 'prod-alerts'
      routes:
        # 第二级：按严重程度路由
        - match:
            severity: 'critical'
          group_wait: 0s
          repeat_interval: 15m
          receiver: 'prod-critical'
          
        - match:
            severity: 'warning'
          group_wait: 5m
          repeat_interval: 2h
          receiver: 'prod-warning'
          
    # 测试环境路由
    - match:
        environment: 'staging'
      group_wait: 10m
      repeat_interval: 12h
      receiver: 'staging-alerts'
      
    # 按业务线路由
    - match:
        business_unit: 'payment'
      receiver: 'payment-team'
      routes:
        - match:
            severity: 'critical'
          receiver: 'payment-oncall'
        - match:
            severity: 'warning'
          receiver: 'payment-dev'
```

## 二、Prometheus 告警规则实现

### 2.1 动态阈值规则

使用 PromQL 实现基于历史数据的动态阈值：

```yaml
# prometheus-rules.yml
groups:
  - name: dynamic-thresholds
    rules:
      # CPU 使用率动态阈值 - 基于过去7天同时段平均值
      - alert: HighCPUDynamic
        expr: |
          (
            avg_over_time(cpu_usage_percent[1h]) > 
            (
              avg_over_time(cpu_usage_percent[7d] offset 7d) * 1.5 + 
              stddev_over_time(cpu_usage_percent[7d] offset 7d) * 2
            )
          ) and (
            avg_over_time(cpu_usage_percent[1h]) > 70
          )
        for: 10m
        labels:
          severity: warning
          category: performance
        annotations:
          summary: "CPU 使用率异常高于历史基线"
          description: "实例 {{ $labels.instance }} CPU 使用率 {{ $value }}% 超过历史基线"
          
      # 内存使用动态阈值 - 考虑业务周期性
      - alert: HighMemoryDynamic
        expr: |
          (
            memory_usage_percent > 
            (
              quantile_over_time(0.95, memory_usage_percent[4w] offset 1w) and
              memory_usage_percent > 80
            )
          )
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: "内存使用率超过历史95分位数"
          
      # 响应时间动态阈值 - 基于移动平均和标准差
      - alert: SlowResponseDynamic
        expr: |
          (
            avg_over_time(http_request_duration_seconds[5m]) > 
            (
              avg_over_time(http_request_duration_seconds[1h] offset 1h) + 
              3 * stddev_over_time(http_request_duration_seconds[1h] offset 1h)
            )
          ) and (
            rate(http_requests_total[5m]) > 10
          )
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "响应时间异常 - 超过统计基线"
          description: "服务 {{ $labels.service }} 响应时间 {{ $value }}s 异常"

### 2.2 抗噪音规则

使用多种技术减少告警噪音：

```yaml
  - name: noise-resistant-rules
    rules:
      # 使用 for 子句避免瞬时抖动
      - alert: HighCPUStable
        expr: cpu_usage_percent > 85
        for: 10m  # 持续10分钟才触发
        labels:
          severity: warning
        annotations:
          summary: "CPU 持续高使用率"
          
      # 移动平均平滑数据
      - alert: HighErrorRateSmooth
        expr: |
          (
            rate(http_requests_total{status=~"5.."}[10m]) / 
            rate(http_requests_total[10m])
          ) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "错误率持续升高"
          
      # 多条件组合减少误报
      - alert: ServiceDegraded
        expr: |
          (
            (rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])) > 0.01
          ) and (
            histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1.0
          ) and (
            rate(http_requests_total[5m]) > 1
          )
        for: 3m
        labels:
          severity: warning
        annotations:
          summary: "服务性能下降 - 多指标确认"
          
      # 基于趋势的告警 - 使用 deriv() 函数
      - alert: CPUTrendIncreasing
        expr: |
          deriv(cpu_usage_percent[30m]) > 2 and 
          cpu_usage_percent > 60
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: "CPU 使用率持续上升趋势"
          
      # 异常检测 - 基于分位数
      - alert: AnomalousTraffic
        expr: |
          (
            rate(http_requests_total[5m]) > 
            quantile_over_time(0.99, rate(http_requests_total[5m])[1d] offset 1d)
          ) or (
            rate(http_requests_total[5m]) < 
            quantile_over_time(0.01, rate(http_requests_total[5m])[1d] offset 1d)
          )
        for: 10m
        labels:
          severity: info
        annotations:
          summary: "流量异常 - 超出正常范围"

### 2.3 复合条件规则

组合多个指标的复杂告警规则：

```yaml
  - name: composite-rules
    rules:
      # 系统整体健康度评估
      - alert: SystemHealthDegraded
        expr: |
          (
            (cpu_usage_percent > 80) + 
            (memory_usage_percent > 85) + 
            (disk_usage_percent > 90) + 
            (load_average_5m / cpu_cores > 2)
          ) >= 2
        for: 5m
        labels:
          severity: warning
          category: system
        annotations:
          summary: "系统整体健康度下降"
          description: "多个系统指标同时异常"
          
      # 应用性能综合评估
      - alert: ApplicationPerformanceIssue
        expr: |
          (
            (
              rate(http_requests_total{status=~"5.."}[5m]) / 
              rate(http_requests_total[5m])
            ) > 0.02
          ) and (
            histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2.0
          ) and (
            up == 1
          )
        for: 3m
        labels:
          severity: critical
          category: application
        annotations:
          summary: "应用性能严重问题"
          description: "错误率和响应时间同时异常"
          runbook: "https://wiki.company.com/runbook/app-performance"
          
      # 数据库连接池问题
      - alert: DatabaseConnectionIssue
        expr: |
          (
            (db_connections_active / db_connections_max) > 0.8
          ) and (
            rate(db_connection_errors_total[5m]) > 0.1
          ) and (
            db_query_duration_95percentile > 5
          )
        for: 2m
        labels:
          severity: critical
          category: database
        annotations:
          summary: "数据库连接问题"
          description: "连接池使用率高且出现连接错误"
          
      # 网络问题综合判断
      - alert: NetworkIssueDetected
        expr: |
          (
            (network_packet_loss_percent > 1) or
            (network_latency_ms > 100) or
            (network_bandwidth_utilization > 0.9)
          ) and (
            rate(network_errors_total[5m]) > 10
          )
        for: 5m
        labels:
          severity: warning
          category: network
        annotations:
          summary: "网络问题检测"
          description: "网络质量指标异常"
          
      # 存储子系统问题
      - alert: StorageSubsystemIssue
        expr: |
          (
            (disk_usage_percent > 85) and
            (disk_io_utilization > 0.8) and
            (disk_queue_depth > 10)
          ) or (
            rate(disk_errors_total[5m]) > 0
          )
        for: 5m
        labels:
          severity: warning
          category: storage
        annotations:
          summary: "存储子系统问题"
          description: "磁盘使用率、IO利用率或队列深度异常"
```

## 三、自定义告警关联服务实现

### 3.1 架构设计

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Alertmanager  │───▶│  Flask API 服务   │───▶│   Redis 存储    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │   关联分析引擎    │
                       └──────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │   通知发送模块    │
                       └──────────────────┘
```

技术栈：
- **Flask**: Web API 框架
- **Redis**: 告警数据存储和缓存
- **Celery**: 异步任务处理
- **NetworkX**: 依赖关系图分析

### 3.2 完整代码实现

#### 主应用文件 `app.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
告警关联分析服务主应用
提供告警接收、关联分析、根因分析等功能
"""

from flask import Flask, request, jsonify
import redis
import json
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import networkx as nx
from dataclasses import dataclass, asdict
import hashlib

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Redis 连接配置
redis_client = redis.Redis(
    host='redis', 
    port=6379, 
    db=0, 
    decode_responses=True
)

@dataclass
class Alert:
    """告警数据结构"""
    fingerprint: str
    alertname: str
    instance: str
    service: str
    severity: str
    status: str  # firing, resolved
    starts_at: str
    ends_at: Optional[str]
    labels: Dict[str, str]
    annotations: Dict[str, str]
    
    def to_dict(self) -> Dict:
        return asdict(self)
    
    @classmethod
    def from_dict(cls, data: Dict) -> 'Alert':
        return cls(**data)

class AlertCorrelationEngine:
    """告警关联分析引擎"""
    
    def __init__(self, redis_client):
        self.redis = redis_client
        self.dependency_graph = nx.DiGraph()
        self._load_dependencies()
    
    def _load_dependencies(self):
        """加载服务依赖关系图"""
        # 从配置或数据库加载依赖关系
        dependencies = [
            ('web-frontend', 'api-gateway'),
            ('api-gateway', 'user-service'),
            ('api-gateway', 'order-service'),
            ('user-service', 'database'),
            ('order-service', 'database'),
            ('order-service', 'payment-service'),
            ('payment-service', 'external-payment-api'),
        ]
        
        self.dependency_graph.add_edges_from(dependencies)
        logger.info(f"加载了 {len(dependencies)} 个服务依赖关系")
    
    def process_alert(self, alert: Alert) -> Dict:
        """处理单个告警"""
        # 存储告警到 Redis
        self._store_alert(alert)
        
        # 执行关联分析
        correlation_result = self._correlate_alert(alert)
        
        # 根因分析
        root_cause = self._analyze_root_cause(alert)
        
        # 生成处理建议
        recommendations = self._generate_recommendations(alert, root_cause)
        
        return {
            'alert': alert.to_dict(),
            'correlation': correlation_result,
            'root_cause': root_cause,
            'recommendations': recommendations
        }
    
    def _store_alert(self, alert: Alert):
        """存储告警到 Redis"""
        key = f"alert:{alert.fingerprint}"
        
        # 存储告警详情
        self.redis.hset(key, mapping=alert.to_dict())
        self.redis.expire(key, 86400 * 7)  # 7天过期
        
        # 添加到时间序列索引
        timestamp = datetime.now().timestamp()
        self.redis.zadd("alerts:timeline", {alert.fingerprint: timestamp})
        
        # 添加到服务索引
        service_key = f"alerts:service:{alert.service}"
        self.redis.sadd(service_key, alert.fingerprint)
        self.redis.expire(service_key, 86400)
        
        logger.info(f"存储告警: {alert.alertname} - {alert.instance}")
    
    def _correlate_alert(self, alert: Alert) -> Dict:
        """告警关联分析"""
        correlations = {
            'temporal': self._find_temporal_correlations(alert),
            'spatial': self._find_spatial_correlations(alert),
            'causal': self._find_causal_correlations(alert)
        }
        
        return correlations
    
    def _find_temporal_correlations(self, alert: Alert) -> List[Dict]:
        """时间关联分析 - 查找时间窗口内的相关告警"""
        time_window = 300  # 5分钟窗口
        current_time = datetime.now().timestamp()
        
        # 获取时间窗口内的告警
        related_alerts = self.redis.zrangebyscore(
            "alerts:timeline",
            current_time - time_window,
            current_time + time_window
        )
        
        correlations = []
        for alert_id in related_alerts:
            if alert_id != alert.fingerprint:
                alert_data = self.redis.hgetall(f"alert:{alert_id}")
                if alert_data:
                    correlations.append({
                        'type': 'temporal',
                        'alert_id': alert_id,
                        'alertname': alert_data.get('alertname'),
                        'service': alert_data.get('service'),
                        'correlation_score': 0.8
                    })
        
        return correlations[:10]  # 限制返回数量
    
    def _find_spatial_correlations(self, alert: Alert) -> List[Dict]:
        """空间关联分析 - 查找同一服务或实例的相关告警"""
        correlations = []
        
        # 同服务告警
        service_alerts = self.redis.smembers(f"alerts:service:{alert.service}")
        for alert_id in service_alerts:
            if alert_id != alert.fingerprint:
                alert_data = self.redis.hgetall(f"alert:{alert_id}")
                if alert_data and alert_data.get('status') == 'firing':
                    correlations.append({
                        'type': 'spatial',
                        'alert_id': alert_id,
                        'alertname': alert_data.get('alertname'),
                        'correlation_score': 0.9
                    })
        
        return correlations
    
    def _find_causal_correlations(self, alert: Alert) -> List[Dict]:
        """因果关联分析 - 基于依赖关系图"""
        correlations = []
        
        if alert.service in self.dependency_graph:
            # 查找上游依赖的告警
            upstream_services = list(self.dependency_graph.predecessors(alert.service))
            for service in upstream_services:
                service_alerts = self.redis.smembers(f"alerts:service:{service}")
                for alert_id in service_alerts:
                    alert_data = self.redis.hgetall(f"alert:{alert_id}")
                    if alert_data and alert_data.get('status') == 'firing':
                        correlations.append({
                            'type': 'causal',
                            'alert_id': alert_id,
                            'service': service,
                            'relationship': 'upstream',
                            'correlation_score': 0.95
                        })
        
        return correlations
    
    def _analyze_root_cause(self, alert: Alert) -> Dict:
        """根因分析"""
        # 获取所有相关告警
        all_correlations = self._correlate_alert(alert)
        
        # 构建告警图
        alert_graph = nx.DiGraph()
        alert_graph.add_node(alert.fingerprint, **alert.to_dict())
        
        # 添加相关告警节点和边
        for corr_type, correlations in all_correlations.items():
            for corr in correlations:
                alert_graph.add_node(corr['alert_id'])
                alert_graph.add_edge(
                    alert.fingerprint, 
                    corr['alert_id'],
                    type=corr_type,
                    score=corr['correlation_score']
                )
        
        # 计算中心性指标找出根因
        try:
            centrality = nx.betweenness_centrality(alert_graph)
            root_cause_candidate = max(centrality, key=centrality.get)
            
            return {
                'root_cause_alert': root_cause_candidate,
                'confidence': centrality[root_cause_candidate],
                'analysis_method': 'graph_centrality'
            }
        except:
            return {
                'root_cause_alert': alert.fingerprint,
                'confidence': 0.5,
                'analysis_method': 'fallback'
            }
    
    def _generate_recommendations(self, alert: Alert, root_cause: Dict) -> List[str]:
        """生成处理建议"""
        recommendations = []
        
        # 基于告警类型的建议
        if 'cpu' in alert.alertname.lower():
            recommendations.extend([
                "检查CPU密集型进程",
                "考虑水平扩容",
                "检查是否有死循环或低效算法"
            ])
        elif 'memory' in alert.alertname.lower():
            recommendations.extend([
                "检查内存泄漏",
                "分析内存使用模式",
                "考虑增加内存或优化内存使用"
            ])
        elif 'disk' in alert.alertname.lower():
            recommendations.extend([
                "清理临时文件和日志",
                "检查磁盘IO性能",
                "考虑扩容存储"
            ])
        
        # 基于根因分析的建议
        if root_cause['confidence'] > 0.8:
            recommendations.append(f"优先处理根因告警: {root_cause['root_cause_alert']}")
        
        return recommendations

# 全局关联引擎实例
correlation_engine = AlertCorrelationEngine(redis_client)

@app.route('/webhook/alerts', methods=['POST'])
def receive_alerts():
    """接收 Alertmanager webhook 告警"""
    try:
        data = request.get_json()
        
        if not data or 'alerts' not in data:
            return jsonify({'error': '无效的告警数据'}), 400
        
        results = []
        
        for alert_data in data['alerts']:
            # 解析告警数据
            alert = Alert(
                fingerprint=alert_data.get('fingerprint', ''),
                alertname=alert_data.get('labels', {}).get('alertname', ''),
                instance=alert_data.get('labels', {}).get('instance', ''),
                service=alert_data.get('labels', {}).get('service', 'unknown'),
                severity=alert_data.get('labels', {}).get('severity', 'info'),
                status=alert_data.get('status', 'firing'),
                starts_at=alert_data.get('startsAt', ''),
                ends_at=alert_data.get('endsAt'),
                labels=alert_data.get('labels', {}),
                annotations=alert_data.get('annotations', {})
            )
            
            # 处理告警
            result = correlation_engine.process_alert(alert)
            results.append(result)
        
        return jsonify({
            'status': 'success',
            'processed': len(results),
            'results': results
        })
        
    except Exception as e:
        logger.error(f"处理告警时出错: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/alerts/<alert_id>', methods=['GET'])
def get_alert(alert_id):
    """获取告警详情"""
    alert_data = redis_client.hgetall(f"alert:{alert_id}")
    
    if not alert_data:
        return jsonify({'error': '告警不存在'}), 404
    
    return jsonify(alert_data)

@app.route('/api/correlations/<alert_id>', methods=['GET'])
def get_correlations(alert_id):
    """获取告警关联信息"""
    alert_data = redis_client.hgetall(f"alert:{alert_id}")
    
    if not alert_data:
        return jsonify({'error': '告警不存在'}), 404
    
    alert = Alert.from_dict(alert_data)
    correlations = correlation_engine._correlate_alert(alert)
    
    return jsonify(correlations)

@app.route('/health', methods=['GET'])
def health_check():
    """健康检查"""
    try:
        redis_client.ping()
        return jsonify({'status': 'healthy', 'redis': 'connected'})
    except:
        return jsonify({'status': 'unhealthy', 'redis': 'disconnected'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=False)
```

#### 通知发送模块 `notification.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
通知发送模块
支持邮件、Slack、钉钉等多种通知方式
"""

import smtplib
import requests
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, List
import logging

logger = logging.getLogger(__name__)

class NotificationManager:
    """通知管理器"""
    
    def __init__(self, config: Dict):
        self.config = config
        
    def send_correlation_notification(self, correlation_result: Dict):
        """发送关联分析结果通知"""
        alert = correlation_result['alert']
        correlations = correlation_result['correlation']
        root_cause = correlation_result['root_cause']
        
        # 构建通知内容
        message = self._build_correlation_message(alert, correlations, root_cause)
        
        # 根据告警严重程度选择通知方式
        if alert['severity'] == 'critical':
            self._send_urgent_notification(message)
        else:
            self._send_normal_notification(message)
    
    def _build_correlation_message(self, alert: Dict, correlations: Dict, root_cause: Dict) -> Dict:
        """构建关联分析消息"""
        # 统计相关告警数量
        total_correlations = sum(len(corrs) for corrs in correlations.values())
        
        message = {
            'title': f'告警关联分析 - {alert["alertname"]}',
            'alert_info': {
                'name': alert['alertname'],
                'service': alert['service'],
                'instance': alert['instance'],
                'severity': alert['severity'],
                'status': alert['status']
            },
            'correlation_summary': {
                'total_related_alerts': total_correlations,
                'temporal_correlations': len(correlations.get('temporal', [])),
                'spatial_correlations': len(correlations.get('spatial', [])),
                'causal_correlations': len(correlations.get('causal', []))
            },
            'root_cause_analysis': {
                'suspected_root_cause': root_cause['root_cause_alert'],
                'confidence': root_cause['confidence'],
                'method': root_cause['analysis_method']
            },
            'recommendations': correlation_result.get('recommendations', [])
        }
        
        return message
    
    def _send_urgent_notification(self, message: Dict):
        """发送紧急通知 - 多渠道"""
        # 发送邮件
        self._send_email(message, urgent=True)
        
        # 发送 Slack 通知
        self._send_slack(message, urgent=True)
        
        # 发送钉钉通知
        self._send_dingtalk(message, urgent=True)
    
    def _send_normal_notification(self, message: Dict):
        """发送普通通知"""
        self._send_email(message, urgent=False)
    
    def _send_email(self, message: Dict, urgent: bool = False):
        """发送邮件通知"""
        try:
            smtp_config = self.config.get('smtp', {})
            
            msg = MIMEMultipart()
            msg['From'] = smtp_config.get('from')
            msg['To'] = smtp_config.get('to_urgent' if urgent else 'to_normal')
            msg['Subject'] = f"{'[紧急] ' if urgent else ''}{message['title']}"
            
            # 构建邮件正文
            body = self._format_email_body(message)
            msg.attach(MIMEText(body, 'html', 'utf-8'))
            
            # 发送邮件
            server = smtplib.SMTP(smtp_config.get('host'), smtp_config.get('port'))
            server.starttls()
            server.login(smtp_config.get('username'), smtp_config.get('password'))
            server.send_message(msg)
            server.quit()
            
            logger.info(f"邮件通知发送成功: {message['title']}")
            
        except Exception as e:
            logger.error(f"邮件发送失败: {str(e)}")
    
    def _send_slack(self, message: Dict, urgent: bool = False):
        """发送 Slack 通知"""
        try:
            slack_config = self.config.get('slack', {})
            webhook_url = slack_config.get('webhook_url')
            
            if not webhook_url:
                return
            
            # 构建 Slack 消息
            slack_message = {
                "text": message['title'],
                "attachments": [
                    {
                        "color": "danger" if urgent else "warning",
                        "fields": [
                            {
                                "title": "告警信息",
                                "value": f"服务: {message['alert_info']['service']}\n"
                                        f"实例: {message['alert_info']['instance']}\n"
                                        f"严重程度: {message['alert_info']['severity']}",
                                "short": True
                            },
                            {
                                "title": "关联分析",
                                "value": f"相关告警: {message['correlation_summary']['total_related_alerts']}个\n"
                                        f"根因置信度: {message['root_cause_analysis']['confidence']:.2f}",
                                "short": True
                            }
                        ]
                    }
                ]
            }
            
            response = requests.post(webhook_url, json=slack_message)
            response.raise_for_status()
            
            logger.info(f"Slack 通知发送成功: {message['title']}")
            
        except Exception as e:
            logger.error(f"Slack 发送失败: {str(e)}")
    
    def _send_dingtalk(self, message: Dict, urgent: bool = False):
        """发送钉钉通知"""
        try:
            dingtalk_config = self.config.get('dingtalk', {})
            webhook_url = dingtalk_config.get('webhook_url')
            
            if not webhook_url:
                return
            
            # 构建钉钉消息
            dingtalk_message = {
                "msgtype": "markdown",
                "markdown": {
                    "title": message['title'],
                    "text": f"## {message['title']}\n\n"
                           f"**告警信息:**\n"
                           f"- 服务: {message['alert_info']['service']}\n"
                           f"- 实例: {message['alert_info']['instance']}\n"
                           f"- 严重程度: {message['alert_info']['severity']}\n\n"
                           f"**关联分析:**\n"
                           f"- 相关告警数量: {message['correlation_summary']['total_related_alerts']}\n"
                           f"- 根因置信度: {message['root_cause_analysis']['confidence']:.2f}\n\n"
                           f"**处理建议:**\n" + 
                           "\n".join([f"- {rec}" for rec in message['recommendations']])
                }
            }
            
            if urgent:
                dingtalk_message["at"] = {"isAtAll": True}
            
            response = requests.post(webhook_url, json=dingtalk_message)
            response.raise_for_status()
            
            logger.info(f"钉钉通知发送成功: {message['title']}")
            
        except Exception as e:
            logger.error(f"钉钉发送失败: {str(e)}")
    
    def _format_email_body(self, message: Dict) -> str:
        """格式化邮件正文"""
        return f"""
        <html>
        <body>
            <h2>{message['title']}</h2>
            
            <h3>告警信息</h3>
            <ul>
                <li>告警名称: {message['alert_info']['name']}</li>
                <li>服务: {message['alert_info']['service']}</li>
                <li>实例: {message['alert_info']['instance']}</li>
                <li>严重程度: {message['alert_info']['severity']}</li>
                <li>状态: {message['alert_info']['status']}</li>
            </ul>
            
            <h3>关联分析结果</h3>
            <ul>
                <li>相关告警总数: {message['correlation_summary']['total_related_alerts']}</li>
                <li>时间关联: {message['correlation_summary']['temporal_correlations']}</li>
                <li>空间关联: {message['correlation_summary']['spatial_correlations']}</li>
                <li>因果关联: {message['correlation_summary']['causal_correlations']}</li>
            </ul>
            
            <h3>根因分析</h3>
            <ul>
                <li>疑似根因: {message['root_cause_analysis']['suspected_root_cause']}</li>
                <li>置信度: {message['root_cause_analysis']['confidence']:.2f}</li>
                <li>分析方法: {message['root_cause_analysis']['method']}</li>
            </ul>
            
            <h3>处理建议</h3>
            <ul>
                {''.join([f'<li>{rec}</li>' for rec in message['recommendations']])}
            </ul>
        </body>
        </html>
        """

### 3.3 Docker 部署

#### Dockerfile

```dockerfile
FROM python:3.9-slim

# 设置工作目录
WORKDIR /app

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖文件
COPY requirements.txt .

# 安装 Python 依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY . .

# 创建非 root 用户
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# 启动命令
CMD ["python", "app.py"]
```

#### requirements.txt

```txt
Flask==2.3.3
redis==4.6.0
requests==2.31.0
networkx==3.1
celery==5.3.1
gunicorn==21.2.0
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  # Redis 服务
  redis:
    image: redis:7-alpine
    container_name: alert-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3

  # 告警关联服务
  alert-correlation:
    build: .
    container_name: alert-correlation-service
    ports:
      - "8080:8080"
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - FLASK_ENV=production
    depends_on:
      redis:
        condition: service_healthy
    volumes:
      - ./config:/app/config
      - ./logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Celery Worker (异步任务处理)
  celery-worker:
    build: .
    container_name: alert-celery-worker
    command: celery -A app.celery worker --loglevel=info
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      redis:
        condition: service_healthy
    volumes:
      - ./config:/app/config
      - ./logs:/app/logs
    restart: unless-stopped

  # Nginx 反向代理
  nginx:
    image: nginx:alpine
    container_name: alert-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - alert-correlation
    restart: unless-stopped

volumes:
  redis_data:
    driver: local
```

#### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    upstream alert_service {
        server alert-correlation:8080;
    }

    server {
        listen 80;
        server_name localhost;

        # 健康检查
        location /health {
            proxy_pass http://alert_service;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        # API 路由
        location /api/ {
            proxy_pass http://alert_service;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Webhook 路由
        location /webhook/ {
            proxy_pass http://alert_service;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # 增加超时时间
            proxy_read_timeout 300s;
            proxy_connect_timeout 75s;
        }
    }
}
```

## 四、Grafana 可视化配置

### 4.1 告警仪表板

#### 告警概览仪表板 JSON 配置

```json
{
  "dashboard": {
    "title": "告警风暴监控仪表板",
    "panels": [
      {
        "title": "告警数量趋势",
        "type": "graph",
        "targets": [
          {
            "expr": "increase(alertmanager_alerts_received_total[5m])",
            "legendFormat": "接收告警数"
          },
          {
            "expr": "increase(alertmanager_alerts_invalid_total[5m])",
            "legendFormat": "无效告警数"
          }
        ],
        "yAxes": [
          {
            "label": "告警数量",
            "min": 0
          }
        ]
      },
      {
        "title": "告警状态分布",
        "type": "piechart",
        "targets": [
          {
            "expr": "alertmanager_alerts{state=\"active\"}",
            "legendFormat": "活跃告警"
          },
          {
            "expr": "alertmanager_alerts{state=\"suppressed\"}",
            "legendFormat": "抑制告警"
          }
        ]
      },
      {
        "title": "告警分组效果",
        "type": "stat",
        "targets": [
          {
            "expr": "alertmanager_notification_requests_total / alertmanager_alerts_received_total",
            "legendFormat": "分组压缩比"
          }
        ]
      },
      {
        "title": "服务告警热力图",
        "type": "heatmap",
        "targets": [
          {
            "expr": "sum by (service) (rate(prometheus_notifications_total[5m]))",
            "legendFormat": "{{service}}"
          }
        ]
      }
    ]
  }
}
```

#### 告警关联分析仪表板

```json
{
  "dashboard": {
    "title": "告警关联分析",
    "panels": [
      {
        "title": "关联告警网络图",
        "type": "nodeGraph",
        "targets": [
          {
            "expr": "alert_correlation_graph",
            "legendFormat": "关联关系"
          }
        ]
      },
      {
        "title": "根因分析置信度",
        "type": "gauge",
        "targets": [
          {
            "expr": "alert_root_cause_confidence",
            "legendFormat": "置信度"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "min": 0,
            "max": 1,
            "thresholds": {
              "steps": [
                {"color": "red", "value": 0},
                {"color": "yellow", "value": 0.5},
                {"color": "green", "value": 0.8}
              ]
            }
          }
        }
      },
      {
        "title": "告警处理时间",
        "type": "histogram",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, alert_resolution_time_bucket)",
            "legendFormat": "95分位数"
          },
          {
            "expr": "histogram_quantile(0.50, alert_resolution_time_bucket)",
            "legendFormat": "中位数"
          }
        ]
      }
    ]
  }
}
```

### 4.2 告警质量监控

#### 告警质量指标面板

```json
{
  "dashboard": {
    "title": "告警质量监控",
    "panels": [
      {
        "title": "告警噪音比率",
        "type": "stat",
        "targets": [
          {
            "expr": "(sum(rate(alertmanager_alerts_received_total[1h])) - sum(rate(alertmanager_notifications_total[1h]))) / sum(rate(alertmanager_alerts_received_total[1h]))",
            "legendFormat": "噪音比率"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "percentunit",
            "thresholds": {
              "steps": [
                {"color": "green", "value": 0},
                {"color": "yellow", "value": 0.2},
                {"color": "red", "value": 0.5}
              ]
            }
          }
        }
      },
      {
        "title": "告警响应时间",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(alert_response_time_seconds_bucket[5m]))",
            "legendFormat": "95分位响应时间"
          }
        ]
      },
      {
        "title": "误报率趋势",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(false_positive_alerts_total[1h]) / rate(total_alerts_total[1h])",
            "legendFormat": "误报率"
          }
        ]
      }
    ]
  }
}
```

## 五、部署和运维

### 5.1 Kubernetes 部署

#### Prometheus 部署配置

```yaml
# prometheus-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      containers:
      - name: prometheus
        image: prom/prometheus:latest
        ports:
        - containerPort: 9090
        volumeMounts:
        - name: config-volume
          mountPath: /etc/prometheus
        - name: storage-volume
          mountPath: /prometheus
        args:
          - '--config.file=/etc/prometheus/prometheus.yml'
          - '--storage.tsdb.path=/prometheus'
          - '--web.console.libraries=/etc/prometheus/console_libraries'
          - '--web.console.templates=/etc/prometheus/consoles'
          - '--storage.tsdb.retention.time=15d'
          - '--web.enable-lifecycle'
      volumes:
      - name: config-volume
        configMap:
          name: prometheus-config
      - name: storage-volume
        persistentVolumeClaim:
          claimName: prometheus-storage

---
# prometheus-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: prometheus
  namespace: monitoring
spec:
  selector:
    app: prometheus
  ports:
  - port: 9090
    targetPort: 9090
  type: ClusterIP
```

#### Alertmanager 部署配置

```yaml
# alertmanager-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: alertmanager
  namespace: monitoring
spec:
  replicas: 2  # 高可用部署
  selector:
    matchLabels:
      app: alertmanager
  template:
    metadata:
      labels:
        app: alertmanager
    spec:
      containers:
      - name: alertmanager
        image: prom/alertmanager:latest
        ports:
        - containerPort: 9093
        volumeMounts:
        - name: config-volume
          mountPath: /etc/alertmanager
        - name: storage-volume
          mountPath: /alertmanager
        args:
          - '--config.file=/etc/alertmanager/alertmanager.yml'
          - '--storage.path=/alertmanager'
          - '--web.external-url=http://alertmanager.example.com'
          - '--cluster.listen-address=0.0.0.0:9094'
          - '--cluster.peer=alertmanager-0.alertmanager:9094'
          - '--cluster.peer=alertmanager-1.alertmanager:9094'
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
      volumes:
      - name: config-volume
        configMap:
          name: alertmanager-config
      - name: storage-volume
        persistentVolumeClaim:
          claimName: alertmanager-storage

---
# alertmanager-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: alertmanager
  namespace: monitoring
spec:
  selector:
    app: alertmanager
  ports:
  - name: web
    port: 9093
    targetPort: 9093
  - name: cluster
    port: 9094
    targetPort: 9094
  type: ClusterIP
```

#### 告警关联服务部署

```yaml
# alert-correlation-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: alert-correlation
  namespace: monitoring
spec:
  replicas: 3
  selector:
    matchLabels:
      app: alert-correlation
  template:
    metadata:
      labels:
        app: alert-correlation
    spec:
      containers:
      - name: alert-correlation
        image: alert-correlation:latest
        ports:
        - containerPort: 8080
        env:
        - name: REDIS_HOST
          value: "redis-service"
        - name: REDIS_PORT
          value: "6379"
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: alert-correlation-service
  namespace: monitoring
spec:
  selector:
    app: alert-correlation
  ports:
  - port: 8080
    targetPort: 8080
  type: ClusterIP
```

### 5.2 监控和维护

#### 系统监控脚本

```bash
#!/bin/bash
# monitor-alert-system.sh
# 告警系统健康监控脚本

set -e

NAMESPACE="monitoring"
LOG_FILE="/var/log/alert-system-monitor.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

check_prometheus() {
    log "检查 Prometheus 状态..."
    
    # 检查 Pod 状态
    if ! kubectl get pods -n $NAMESPACE -l app=prometheus | grep -q Running; then
        log "ERROR: Prometheus Pod 未运行"
        return 1
    fi
    
    # 检查 API 响应
    if ! kubectl exec -n $NAMESPACE deployment/prometheus -- wget -q --spider http://localhost:9090/-/healthy; then
        log "ERROR: Prometheus API 不健康"
        return 1
    fi
    
    log "Prometheus 状态正常"
    return 0
}

check_alertmanager() {
    log "检查 Alertmanager 状态..."
    
    # 检查集群状态
    CLUSTER_STATUS=$(kubectl exec -n $NAMESPACE deployment/alertmanager -- wget -qO- http://localhost:9093/api/v1/status)
    
    if echo $CLUSTER_STATUS | grep -q '"cluster":{"status":"ready"}'; then
        log "Alertmanager 集群状态正常"
    else
        log "WARNING: Alertmanager 集群状态异常"
    fi
    
    return 0
}

check_alert_correlation() {
    log "检查告警关联服务状态..."
    
    # 检查服务响应
    HEALTH_STATUS=$(kubectl exec -n $NAMESPACE deployment/alert-correlation -- curl -s http://localhost:8080/health)
    
    if echo $HEALTH_STATUS | grep -q '"status":"healthy"'; then
        log "告警关联服务状态正常"
    else
        log "ERROR: 告警关联服务不健康"
        return 1
    fi
    
    return 0
}

check_redis() {
    log "检查 Redis 状态..."
    
    if ! kubectl exec -n $NAMESPACE deployment/redis -- redis-cli ping | grep -q PONG; then
        log "ERROR: Redis 连接失败"
        return 1
    fi
    
    # 检查内存使用
    MEMORY_USAGE=$(kubectl exec -n $NAMESPACE deployment/redis -- redis-cli info memory | grep used_memory_human)
    log "Redis 内存使用: $MEMORY_USAGE"
    
    return 0
}

cleanup_old_alerts() {
    log "清理过期告警数据..."
    
    # 清理7天前的告警数据
    kubectl exec -n $NAMESPACE deployment/alert-correlation -- python3 -c "
import redis
import time
r = redis.Redis(host='redis-service', port=6379, decode_responses=True)
cutoff = time.time() - 7*24*3600
deleted = r.zremrangebyscore('alerts:timeline', 0, cutoff)
print(f'清理了 {deleted} 条过期告警记录')
"
}

generate_report() {
    log "生成系统健康报告..."
    
    # 获取告警统计
    ACTIVE_ALERTS=$(kubectl exec -n $NAMESPACE deployment/prometheus -- wget -qO- 'http://localhost:9090/api/v1/query?query=ALERTS' | jq '.data.result | length')
    
    # 获取通知统计
    NOTIFICATIONS_SENT=$(kubectl exec -n $NAMESPACE deployment/alertmanager -- wget -qO- 'http://localhost:9093/api/v1/status' | jq '.data.versionInfo')
    
    log "当前活跃告警数: $ACTIVE_ALERTS"
    log "系统运行正常"
}

main() {
    log "开始告警系统健康检查..."
    
    check_prometheus || exit 1
    check_alertmanager || exit 1
    check_alert_correlation || exit 1
    check_redis || exit 1
    
    cleanup_old_alerts
    generate_report
    
    log "告警系统健康检查完成"
}

# 执行主函数
main "$@"
```

### 5.3 故障排查

#### 常见问题排查手册

```bash
#!/bin/bash
# troubleshoot-alerts.sh
# 告警系统故障排查脚本

troubleshoot_high_alert_volume() {
    echo "=== 告警风暴排查 ==="
    
    # 检查告警数量
    echo "最近1小时告警数量:"
    kubectl exec -n monitoring deployment/prometheus -- \
        wget -qO- 'http://localhost:9090/api/v1/query?query=increase(alertmanager_alerts_received_total[1h])'
    
    # 检查告警分组效果
    echo "告警分组压缩比:"
    kubectl exec -n monitoring deployment/alertmanager -- \
        wget -qO- 'http://localhost:9093/api/v1/alerts' | \
        jq '.data | group_by(.labels.alertname) | length'
    
    # 检查抑制规则效果
    echo "被抑制的告警数量:"
    kubectl exec -n monitoring deployment/alertmanager -- \
        wget -qO- 'http://localhost:9093/api/v1/silences'
}

troubleshoot_correlation_service() {
    echo "=== 关联服务排查 ==="
    
    # 检查服务日志
    echo "关联服务错误日志:"
    kubectl logs -n monitoring deployment/alert-correlation --tail=50 | grep ERROR
    
    # 检查 Redis 连接
    echo "Redis 连接状态:"
    kubectl exec -n monitoring deployment/alert-correlation -- \
        python3 -c "import redis; r=redis.Redis(host='redis-service'); print(r.ping())"
    
    # 检查处理队列
    echo "待处理告警队列长度:"
    kubectl exec -n monitoring deployment/redis -- \
        redis-cli llen alert_processing_queue
}

troubleshoot_notification_delays() {
    echo "=== 通知延迟排查 ==="
    
    # 检查 Alertmanager 队列
    echo "通知队列状态:"
    kubectl exec -n monitoring deployment/alertmanager -- \
        wget -qO- 'http://localhost:9093/api/v1/status' | \
        jq '.data.config.route'
    
    # 检查网络连接
    echo "外部服务连接测试:"
    kubectl exec -n monitoring deployment/alertmanager -- \
        nc -zv smtp.company.com 587
}

case "$1" in
    "volume")
        troubleshoot_high_alert_volume
        ;;
    "correlation")
        troubleshoot_correlation_service
        ;;
    "notification")
        troubleshoot_notification_delays
        ;;
    *)
        echo "用法: $0 {volume|correlation|notification}"
        exit 1
        ;;
esac
```

#### 性能优化建议

1. **Prometheus 优化**
   - 调整采集间隔和保留时间
   - 使用 recording rules 预计算复杂查询
   - 配置适当的存储压缩

2. **Alertmanager 优化**
   - 优化分组策略减少通知数量
   - 调整抑制规则避免级联告警
   - 使用集群模式提高可用性

3. **关联服务优化**
   - 使用 Redis 集群提高性能
   - 实现异步处理避免阻塞
   - 添加缓存层减少计算开销

4. **监控优化**
   - 设置合理的告警阈值
   - 使用动态阈值减少误报
   - 定期清理历史数据

通过以上完整的实现方案，可以有效解决 Prometheus + Grafana 环境中的告警风暴问题，提供智能的告警关联分析和根因定位能力。