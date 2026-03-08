/**
 * 仿真平台看板配置示例
 *
 * 使用方法：
 * 1. 复制此文件中的配置
 * 2. 粘贴到 simulation-dashboard.html 的 CONFIG 对象中
 * 3. 根据实际情况修改配置项
 */

// ========================================
// 示例1：模拟数据配置（第一期默认）
// ========================================
const CONFIG_MOCK = {
  // 使用模拟数据
  useMockData: true,

  // API配置（模拟数据模式下不使用）
  apiBaseUrl: 'https://your-platform-api.com',
  apiToken: '',

  // 团队配置
  teams: [
    { id: 'perception', name: '感知算法部', color: '#2563eb' },
    { id: 'planning', name: '规划控制部', color: '#10b981' },
    { id: 'simulation', name: '仿真平台部', color: '#8b5cf6' },
    { id: 'data', name: '数据工程部', color: '#f59e0b' },
    { id: 'testing', name: '测试验证部', color: '#ef4444' },
    { id: 'mapping', name: '高精地图部', color: '#06b6d4' },
    { id: 'integration', name: '系统集成部', color: '#ec4899' }
  ]
};

// ========================================
// 示例2：测试环境配置（第二期）
// ========================================
const CONFIG_TEST = {
  // 使用真实API
  useMockData: false,

  // 测试环境API地址
  apiBaseUrl: 'https://pgsim-test.yourcompany.com',

  // 测试环境Token（从浏览器开发者工具获取）
  apiToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',

  // 团队配置（需与后端飞书部门ID对应）
  teams: [
    { id: 'perception', name: '感知算法部', color: '#2563eb' },
    { id: 'planning', name: '规划控制部', color: '#10b981' },
    { id: 'simulation', name: '仿真平台部', color: '#8b5cf6' },
    { id: 'data', name: '数据工程部', color: '#f59e0b' },
    { id: 'testing', name: '测试验证部', color: '#ef4444' },
    { id: 'mapping', name: '高精地图部', color: '#06b6d4' },
    { id: 'integration', name: '系统集成部', color: '#ec4899' }
  ]
};

// ========================================
// 示例3：生产环境配置（第二期）
// ========================================
const CONFIG_PROD = {
  // 使用真实API
  useMockData: false,

  // 生产环境API地址
  apiBaseUrl: 'https://pgsim.yourcompany.com',

  // 生产环境Token（建议通过环境变量或安全方式获取）
  apiToken: 'Bearer prod-token-here',

  // 团队配置
  teams: [
    { id: 'perception', name: '感知算法部', color: '#2563eb' },
    { id: 'planning', name: '规划控制部', color: '#10b981' },
    { id: 'simulation', name: '仿真平台部', color: '#8b5cf6' },
    { id: 'data', name: '数据工程部', color: '#f59e0b' },
    { id: 'testing', name: '测试验证部', color: '#ef4444' },
    { id: 'mapping', name: '高精地图部', color: '#06b6d4' },
    { id: 'integration', name: '系统集成部', color: '#ec4899' }
  ]
};

// ========================================
// 配置项说明
// ========================================

/**
 * useMockData: boolean
 * - true: 使用模拟数据（第一期）
 * - false: 调用真实API（第二期）
 */

/**
 * apiBaseUrl: string
 * API服务器地址
 * - 测试环境示例: 'https://pgsim-test.yourcompany.com'
 * - 生产环境示例: 'https://pgsim.yourcompany.com'
 * - 本地开发示例: 'http://localhost:8080'
 */

/**
 * apiToken: string
 * API认证Token
 * - Bearer Token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 * - Cookie: 可能在请求头中设置
 * - 如何获取: 打开浏览器开发者工具 -> Network -> 查看请求头
 */

/**
 * teams: Array<Object>
 * 团队配置数组
 * - id: string - 团队唯一标识，需与后端飞书部门ID对应
 * - name: string - 团队显示名称
 * - color: string - 图表中使用的颜色（十六进制）
 */

// ========================================
// 颜色参考
// ========================================

const COLORS = {
  // 蓝色系
  blue: '#2563eb',
  sky: '#06b6d4',
  cyan: '#0891b2',

  // 绿色系
  green: '#10b981',
  emerald: '#059669',
  teal: '#14b8a6',

  // 紫色系
  purple: '#8b5cf6',
  violet: '#7c3aed',
  fuchsia: '#a855f7',

  // 红色系
  red: '#ef4444',
  rose: '#f43f5e',
  pink: '#ec4899',

  // 橙色系
  orange: '#f59e0b',
  amber: '#d97706',
  yellow: '#eab308',

  // 灰色系
  slate: '#64748b',
  zinc: '#71717a',
  neutral: '#737373'
};

// ========================================
// 环境切换建议
// ========================================

/**
 * 开发建议：
 * 1. 创建多个配置文件：config.dev.js, config.test.js, config.prod.js
 * 2. 使用构建工具根据环境变量注入对应配置
 * 3. 或者通过URL参数动态切换配置
 *
 * 示例：
 * const env = new URLSearchParams(location.search).get('env') || 'mock';
 * const CONFIGS = { mock: CONFIG_MOCK, test: CONFIG_TEST, prod: CONFIG_PROD };
 * const CONFIG = CONFIGS[env];
 */

// 导出示例配置（供参考）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG_MOCK,
    CONFIG_TEST,
    CONFIG_PROD,
    COLORS
  };
}
