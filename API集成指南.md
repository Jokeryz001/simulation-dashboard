# API 集成指南

本文档详细说明如何将看板从模拟数据切换到真实API数据。

## 前置准备

### 步骤1：获取认证信息

1. 登录仿真平台测试环境
2. 打开浏览器开发者工具 (F12)
3. 切换到 Network 面板
4. 执行一些操作，触发API请求
5. 查看任意请求的 Headers，找到以下信息：
   - `Authorization` 或 `Cookie` 字段
   - API 基础 URL（baseUrl）

### 步骤2：确定 API 端点

根据平台技术文档，可能需要：

**选项A：使用现有接口**
- `/api/task/list` - 任务列表（SimTaskController）
- `/api/scenario/list` - 场景列表（ScenarioController）
- 在前端进行数据聚合

**选项B：新增统计接口（推荐）**
- 创建新接口：`/api/dashboard/metrics`
- 在后端完成数据聚合
- 返回格式与模拟数据一致

后端服务：`pgsim_all` (主业务服务)
认证方式：通过 API Gateway (pgsim_gateway)

## 接口规范

### 请求示例

```http
POST /api/dashboard/metrics HTTP/1.1
Host: your-platform-api.com
Content-Type: application/json
Authorization: Bearer your-token-here

{
  "start_date": "2026-03-01",
  "end_date": "2026-03-07",
  "group_by": "department"
}
```

### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "2026-03-01": {
      "perception": { "tasks": 145, "users": 23 },
      "planning": { "tasks": 89, "users": 15 },
      "simulation": { "tasks": 67, "users": 12 },
      "data": { "tasks": 78, "users": 18 },
      "testing": { "tasks": 56, "users": 10 },
      "mapping": { "tasks": 45, "users": 8 },
      "integration": { "tasks": 38, "users": 6 }
    },
    "2026-03-02": {
      ...
    }
  }
}
```

### 错误响应

```json
{
  "code": 401,
  "message": "未授权访问"
}
```

## 后端实现参考

### SQL 查询示例

```sql
-- 按日期和部门统计任务数和使用人数
SELECT
    DATE(created_time) as date,
    department_id,
    COUNT(*) as task_count,
    COUNT(DISTINCT user_id) as user_count
FROM sim_task
WHERE created_time BETWEEN #{startDate} AND #{endDate}
    AND department_id IN (
        SELECT id FROM feishu_department WHERE is_active = 1
    )
GROUP BY DATE(created_time), department_id
ORDER BY date, department_id;
```

### 飞书部门关联

```sql
-- 关联飞书部门表获取部门名称
SELECT
    d.date,
    fd.name as department_name,
    fd.id as department_id,
    d.task_count,
    d.user_count
FROM (
    -- 上面统计查询的子查询
) d
LEFT JOIN feishu_department fd ON d.department_id = fd.id;
```

## 配置步骤

### 1. 修改配置文件

编辑 `simulation-dashboard.html`，找到 `CONFIG` 对象：

```javascript
const CONFIG = {
  // 从 true 改为 false
  useMockData: false,

  // 填入真实的API地址
  apiBaseUrl: 'https://pgsim-test.yourcompany.com',

  // 填入认证Token
  apiToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',

  // 团队配置保持不变，或从API动态获取
  teams: [
    { id: 'perception', name: '感知算法部', color: '#2563eb' },
    // ... 其他团队
  ]
};
```

### 2. 测试连接

保存文件后在浏览器中打开，打开浏览器控制台观察：

1. 成功情况：
   - 看到数据加载正常
   - "数据来源"标识变为绿色"生产环境"
   - 图表显示真实数据

2. 失败情况：
   - 控制台有错误信息
   - 降级到模拟数据
   - 检查API地址和Token是否正确

### 3. 常见问题排查

**问题1：401 未授权**
- 检查 Token 是否正确
- 检查 Token 是否过期
- 确认认证方式（Bearer Token / Cookie）

**问题2：404 接口不存在**
- 检查 API 地址是否正确
- 确认接口路径是否需要调整
- 检查是否需要通过网关

**问题3：CORS 跨域问题**
- 后端需要配置 CORS 允许看板域名
- 或考虑通过同域部署解决

**问题4：数据格式不匹配**
- 使用后端中间件转换数据格式
- 或修改前端 `fetchDashboardData` 函数适配

## 部署建议

### 开发环境

```javascript
const CONFIG = {
  useMockData: false,
  apiBaseUrl: 'https://pgsim-test.yourcompany.com',
  apiToken: 'test-token'
};
```

### 生产环境

```javascript
const CONFIG = {
  useMockData: false,
  apiBaseUrl: 'https://pgsim-prod.yourcompany.com',
  apiToken: 'prod-token'
};
```

### 安全建议

1. **不要将 Token 硬编码在前端代码中**
2. 使用环境变量或配置文件管理敏感信息
3. 实施 Token 定期刷新机制
4. 考虑使用后端代理避免暴露 API

## 数据缓存优化

为减少API请求压力，可添加客户端缓存：

```javascript
// 在 CONFIG 中添加
const CONFIG = {
  // ... 其他配置
  cacheEnabled: true,
  cacheDuration: 5 * 60 * 1000, // 5分钟
};

// 修改 fetchDashboardData 函数添加缓存逻辑
```

## 监控和日志

建议添加：

1. **请求日志**：记录API调用次数和响应时间
2. **错误上报**：将错误信息发送到监控系统
3. **性能监控**：跟踪页面加载和渲染性能

## 联系后端团队

如需后端支持，请提供以下信息：

1. API 接口文档
2. 认证方式说明
3. 预期的数据格式
4. 测试环境访问方式
