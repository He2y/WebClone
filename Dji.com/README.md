# DJI 官网高精度复刻项目 (High-Precision Clone of DJI Official Website)

## 📖 项目简介
本项目是一个旨在高精度复刻 DJI 大疆创新官网（dji.com/cn）前端交互与视觉效果的 Web 项目。
核心特色在于**使用 AI 辅助工具进行逆向工程与数据采集**，实现了从页面结构到真实数据的完整克隆。

## 🚀 技术路线 (Technical Methodology)

本项目采用独特的技术方案，结合 AI 智能体能力与现代 Web 技术：

### 1. 结构复刻：BrowserMCP
*   **工具**：利用 `BrowserMCP` 工具操控无头浏览器。
*   **应用**：
    *   **DOM 结构分析**：导航至目标网页（如 `dji.com/cn`），抓取页面快照（Snapshot），分析其 HTML 嵌套层级、CSS 类名命名规范及布局模式（Grid/Flex）。
    *   **交互逻辑推断**：观察滚动交互（如导航栏变色）、鼠标悬停效果（下拉菜单）及响应式断点。
    *   **视觉对齐**：通过视觉检查确保复刻页面与原版在像素级别上的高度一致。
 *   **参考提示词**：Navigate to <... > using browser mcp. Map core architecture: nav, components, routing, state, styling, interactions. Focus on technical patterns and hierarchy for cloning.

### 2. 数据与资源采集：Fetch MCP & Node.js
*   **工具**：`Fetch MCP` 工具与自定义 Node.js 脚本。
*   **应用**：
    *   **真实数据爬取**：直接请求官网 HTML 源码，提取真实的产品名称、Slogan、价格、规格参数等元数据，构建 `djiData.js` 本地数据库。
    *   **高清素材获取**：绕过部分防盗链限制，批量下载官网的高清产品图、Banner 图及背景资源，本地化存储于 `public/images`，确保加载速度与稳定性。

### 3. 前端实现
*   **原生技术栈**：坚持使用原生 HTML5、CSS3 和 ES6+ JavaScript 模块化开发，不依赖庞大的前端框架，保持代码轻量、可读性强。
*   **组件化开发**：将 Header、Footer、ProductCard 等通用模块封装为独立组件，降低耦合度。

## ✨ 现有功能 (Features)

### 1. 沉浸式首页
*   **动态导航栏**：复刻了官网的透明/黑底切换效果，以及支持多层级的下拉菜单（"航拍无人机"板块）。
*   **全屏轮播图**：Hero 区域支持大图轮播，配备平滑过渡动画。
*   **内容板块**：包含"热门产品"、"创新故事"、"领域探索"等板块，采用 CSS Grid 实现响应式布局。

### 2. 深度定制子页面：航拍无人机
*   **二级导航系统**：实现了吸顶式二级导航，支持锚点快速跳转（Mavic, Air, Mini 等系列）。
*   **系列展示**：针对不同产品系列定制了视觉展示卡片。
*   **参数对比**：实现了响应式的产品参数对比表格。

### 3. 完整的产品与购物流程
*   **产品详情页**：展示产品主图、画廊、详细规格参数及价格。
*   **搜索与筛选**：支持按关键词搜索，或按类别（航拍、手持等）筛选产品。
*   **购物车系统**：基于 LocalStorage 实现的购物车，支持添加商品、修改数量及结算流程演示。

## 📂 目录结构

```
e:\webClone\Dji.com\
├── scripts/                 # Node.js 脚本 (数据抓取/图片下载)
├── src/
│   ├── components/          # 可复用组件 (Header, Footer, ProductCard)
│   ├── data/                # 静态数据源 (djiData.js)
│   ├── pages/               # 页面逻辑
│   │   └── dji/
│   │       ├── index.html       # 首页
│   │       ├── camera-drones.html # 航拍无人机子页
│   │       ├── product.html     # 产品详情页
│   │       ├── search.html      # 搜索页
│   │       └── cart.html        # 购物车
│   └── public/
│       ├── css/             # 全局样式
│       └── images/          # 本地图片资源
├── start.bat                # Windows 启动脚本
└── README.md                # 项目文档
```

## 🛠️ 如何运行

1.  **方法一**：直接双击运行根目录下的 `start.bat` 文件。
2.  **方法二**：在根目录下打开终端，运行命令：
    ```bash
    python -m http.server 8000
    ```
3.  打开浏览器访问：[http://localhost:8000](http://localhost:8000)

---
**Note**: 本项目仅供学习研究使用，所有素材版权归 DJI 大疆创新所有。
