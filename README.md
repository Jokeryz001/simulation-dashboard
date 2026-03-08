# 仿真平台数据看板

自动驾驶仿真平台的轻量级监控看板，用于监控各团队的任务发起数和使用人数变化趋势。

## 功能特性

- ✅ 自定义时间段数据查看
- ✅ 按飞书部门组织结构展示数据
- ✅ 任务数趋势折线图
- ✅ 使用人数趋势折线图
- ✅ 汇总统计卡片（总任务数、总用户数、活跃团队数、日均任务数）
- ✅ 交互式数据点悬停提示
- ✅ 响应式设计，支持多种屏幕尺寸
- ✅ 模拟数据生成器（第一期）
- ✅ 预留 API 集成接口（第二期）

## 快速开始

### 第一期：使用模拟数据

1. 直接在浏览器中打开 `simulation-dashboard.html`
2. 选择日期范围（默认最近30天）
3. 点击"应用筛选"查看数据

### 第二期：对接真实API

1. 打开 `simulation-dashboard.html`
2. 找到 `CONFIG` 配置对象
3. 修改以下配置：

```javascript
const CONFIG = {
  useMockData: false,  // 改为 false
  apiBaseUrl: 'https://your-platform-api.com',  // 填入API地址
  apiToken: 'your-token-here',  // 填入认证Token
  teams: [...]  // 保持不变或从API获取
};
```

4. 保存文件并在浏览器中重新打开

## 技术架构

### 前端技术栈

- 纯 HTML5 + CSS3 + JavaScript（ES6+）
- SVG 图表绘制（无第三方图表库）
- 响应式设计（Flexbox + Grid）

### 后端技术栈（平台现有）

- 前端：React 18.2 + TypeScript + Vite 5.2 + Ant Design 5.21 + MobX 6.13
- 后端：Spring Boot 3.3.6 + Spring Cloud 2023.0.6 + MyBatis 3.5.14
- 架构：API Gateway (pgsim_gateway) + 主业务服务 (pgsim_all) + ADS服务 (pgsim_ads) + OV服务 (pgsim_ov)
- 数据库：MySQL 8.0 + Redis

## 项目结构

```
仿真看板/
├── simulation-dashboard.html    # 主看板文件（单文件包含所有代码）
├── README.md                     # 项目说明文档
├── API集成指南.md                # 第二期API对接详细指南
└── config.example.js             # 配置示例文件
```

## 配置说明

### 团队配置

看板默认配置了7个飞书部门团队：

| 团队ID | 团队名称 | 颜色 |
|--------|----------|------|
| perception | 感知算法部 | 蓝色 |
| planning | 规划控制部 | 绿色 |
| simulation | 仿真平台部 | 紫色 |
| data | 数据工程部 | 橙色 |
| testing | 测试验证部 | 红色 |
| mapping | 高精地图部 | 青色 |
| integration | 系统集成部 | 粉色 |

如需修改团队配置，编辑 `simulation-dashboard.html` 中的 `CONFIG.teams` 数组。

## 数据格式

### 模拟数据格式（第一期）

```javascript
{
  "2026-03-01": {
    "perception": { "tasks": 145, "users": 23 },
    "planning": { "tasks": 89, "users": 15 },
    "simulation": { "tasks": 67, "users": 12 },
    ...
  },
  "2026-03-02": { ... }
}
```

### 真实API响应格式（第二期）

建议后端返回格式与模拟数据格式保持一致：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "2026-03-01": {
      "perception": { "tasks": 145, "users": 23 },
      "planning": { "tasks": 89, "users": 15 },
      ...
    }
  }
}
```

## 开发说明

### 本地开发

由于是纯静态文件，可以直接双击 HTML 文件在浏览器中打开，或使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve

# 访问
open http://localhost:8000/simulation-dashboard.html
```

### 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 后续计划

- [ ] 第二期：对接真实API
- [ ] 添加数据导出功能
- [ ] 添加团队对比分析
- [ ] 添加数据预警功能
- [ ] 支持更多图表类型

## 联系方式

如有问题或建议，请联系仿真平台团队。
