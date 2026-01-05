// DJI 官网静态数据（已替换为真实抓取数据）
// 图片来源：DJI Store 官方 CDN
// 价格来源：DJI 官网公开售价（CNY 估算值）

// 产品分类
export const CATEGORIES = {
  CAMERA_DRONES: 'camera-drones', // 航拍无人机
  HANDHELD: 'handheld', // 手持摄影设备
  POWER_STATION: 'portable-power-station', // 户外电源
  ACCESSORIES: 'accessories', // 配件
  ENTERPRISE: 'enterprise', // 行业应用
  AGRICULTURE: 'agriculture', // 农业应用
};

// 产品系列
export const SERIES = {
  MAVIC: 'mavic',
  AIR: 'air',
  MINI: 'mini',
  AVATA: 'avata',
  OSMO_ACTION: 'osmo-action',
  OSMO_MOBILE: 'osmo-mobile',
  OSMO_POCKET: 'osmo-pocket',
  RONIN: 'ronin',
  MIC: 'mic',
  NEO: 'neo',
  NANO: 'nano',
  OSMO_360: 'osmo-360',
};

// 占位图（用于加载失败时）
const PLACEHOLDER = '../../public/images/dji/placeholder.svg';

// 固定的基准日期
export const FIXED_BASE_DATE = new Date('2025-01-15');

// 轮播图数据 (使用真实产品图片)
export const heroSlides = [
  {
    id: 'slide-air-3s',
    title: 'DJI Air 3S',
    subtitle: '双摄旗舰旅拍无人机',
    slogan: '尽显风光',
    image: '../../public/images/dji/hero-air-3s.jpg',
    link: 'https://www.dji.com/cn/air-3s',
    buyLink: 'https://store.dji.com/cn/product/dji-air-3s'
  },
  {
    id: 'slide-mavic-3-pro',
    title: 'DJI Mavic 3 Pro',
    subtitle: '三摄旗舰影像航拍机',
    slogan: '天地为你所动',
    image: '../../public/images/dji/hero-mavic-3-pro.jpg',
    link: 'https://www.dji.com/cn/mavic-3-pro',
    buyLink: 'https://store.dji.com/cn/product/dji-mavic-3-pro'
  },
  {
    id: 'slide-osmo-action-6',
    title: 'Osmo Action 6',
    subtitle: '全能旗舰级运动相机',
    slogan: '方寸流光',
    image: '../../public/images/dji/hero-action-6.jpg',
    link: 'https://www.dji.com/cn/osmo-action-6',
    buyLink: 'https://store.dji.com/cn/product/osmo-action-6'
  },
  {
    id: 'slide-osmo-pocket-3',
    title: 'Osmo Pocket 3',
    subtitle: '一英寸口袋云台相机',
    slogan: '一寸光阴，一手掌握',
    image: '../../public/images/dji/hero-pocket-3.jpg',
    link: 'https://www.dji.com/cn/osmo-pocket-3',
    buyLink: 'https://store.dji.com/cn/product/osmo-pocket-3'
  },
  {
    id: 'slide-rs-4-mini',
    title: 'DJI RS 4 Mini',
    subtitle: '轻量自媒体相机稳定器',
    slogan: '轻松就位',
    image: '../../public/images/dji/hero-rs-4-mini.jpg',
    link: 'https://www.dji.com/cn/rs-4-mini',
    buyLink: 'https://store.dji.com/cn/product/dji-rs-4-mini'
  },
  {
    id: 'slide-flycart-100',
    title: 'DJI FlyCart 100',
    subtitle: '全能智运旗舰',
    slogan: '运载无界',
    image: '../../public/images/dji/hero-flycart-100.jpg',
    link: 'https://www.dji.com/cn/flycart-100',
    buyLink: 'https://www.dji.com/cn/flycart-100'
  },
  {
    id: 'slide-matrice-400',
    title: 'DJI Matrice 400',
    subtitle: '电线级避障长续航飞行平台',
    slogan: '硬实力，大平台',
    image: '../../public/images/dji/hero-matrice-400.jpg',
    link: 'https://enterprise.dji.com/cn/matrice-400',
    buyLink: 'https://enterprise.dji.com/cn/matrice-400'
  }
];

export function getHotProducts(limit = 4) {
  return products.filter(p => p.isHot).slice(0, limit);
}

export function getNewProducts(limit = 4) {
  return products.filter(p => p.isNew).slice(0, limit);
}

export function getFeaturedProducts(limit = 8) {
  return products.slice(0, limit);
}

// 创新故事数据
export const innovationStories = [
  {
    id: 'story-ag-report',
    title: 'DJI Agriculture Annual Report',
    category: 'Industry Insight Report',
    image: '../../public/images/dji/innovation-ag.jpg',
    link: 'https://www.dji.com/newsroom/news/dji-agricultural-annual-report-2025'
  },
  {
    id: 'story-ronin-oscar',
    title: 'DJI Ronin 2 Gimbal System Honored with 2025 Scientific and Technical Award',
    category: 'Engineering, Science & Technology',
    image: '../../public/images/dji/innovation-ronin.jpg',
    link: 'https://www.dji.com/media-center/announcements/dji-ronin2-gimbal-system-honored-2025-scientific-technical'
  }
];

// 领域探索数据
export const exploreFields = [
  {
    id: 'field-pro',
    title: 'Video Production',
    desc: 'Professional Aerial and Ground Filmmaking Tools',
    image: '../../public/images/dji/explore-video.jpg',
    link: 'https://pro.dji.com/'
  },
  {
    id: 'field-enterprise',
    title: 'Enterprise',
    desc: 'Drone Solutions for a New Generation of Work',
    image: '../../public/images/dji/explore-enterprise.jpg',
    link: 'https://enterprise.dji.com'
  },
  {
    id: 'field-ag',
    title: 'Agriculture',
    desc: 'Efficient and Intelligent Agricultural Solution',
    image: '../../public/images/dji/explore-ag.jpg',
    link: 'https://ag.dji.com'
  }
];

// 真实产品数据
export const products = [
  {
    id: 'osmo-360',
    name: 'Osmo 360',
    category: CATEGORIES.HANDHELD,
    series: SERIES.OSMO_360,
    slogan: '全景新视界',
    description: '8K 超旗舰画质全景相机',
    shortDesc: '8K 全景视频，1 英寸传感器',
    price: 3999,
    originalPrice: 3999,
    images: {
      hero: '../../public/images/dji/osmo-360-card.png',
      gallery: []
    },
    isNew: true,
    isHot: true
  },
  {
    id: 'osmo-action-6',
    name: 'Osmo Action 6 Pro',
    category: CATEGORIES.HANDHELD,
    series: SERIES.OSMO_ACTION,
    slogan: '影像本色，一拍即合',
    description: '全能旗舰级运动相机',
    shortDesc: '1/1.3 英寸传感器，4K/120fps',
    price: 2598,
    originalPrice: 2598,
    images: {
      hero: '../../public/images/dji/osmo-action-6-card.png',
      gallery: []
    },
    isNew: true,
    isHot: true
  },
  {
    id: 'osmo-mobile-8',
    name: 'Osmo Mobile 8',
    category: CATEGORIES.HANDHELD,
    series: SERIES.OSMO_MOBILE,
    slogan: '灵感随行',
    description: '全场景精准跟拍手机稳定器',
    shortDesc: '三轴增稳，内置延长杆',
    price: 999,
    originalPrice: 999,
    images: {
      hero: '../../public/images/dji/osmo-mobile-8-card.png',
      gallery: []
    },
    isNew: true,
    isHot: true
  },
  {
    id: 'dji-flip',
    name: 'DJI Flip',
    category: CATEGORIES.HANDHELD,
    series: SERIES.OSMO_POCKET,
    slogan: '掌上新宠',
    description: '定义口袋影像',
    shortDesc: '小巧便携，一键成片',
    price: 2499,
    originalPrice: 2499,
    images: {
      hero: '../../public/images/dji/dji-flip-card.png',
      gallery: []
    },
    isNew: true,
    isHot: true
  },
  {
    id: 'rs-4-mini',
    name: 'DJI RS 4 Mini',
    category: CATEGORIES.ACCESSORIES,
    series: SERIES.RONIN,
    slogan: '轻装上阵',
    description: '专业稳定，轻松上手',
    shortDesc: '原生横竖拍，3kg 负载',
    price: 1999,
    originalPrice: 1999,
    images: {
      hero: '../../public/images/dji/rs-4-mini-card.png',
      gallery: []
    },
    isNew: true,
    isHot: true
  },
  {
    id: 'air-3s',
    name: 'DJI Air 3S',
    category: CATEGORIES.CAMERA_DRONES,
    series: SERIES.AIR,
    slogan: '尽显风光',
    description: '双摄旗舰旅拍无人机',
    shortDesc: '1 英寸主摄，70mm 中长焦',
    price: 6988,
    originalPrice: 6988,
    images: {
      hero: '../../public/images/dji/air-3s.png',
      gallery: []
    },
    isNew: false,
    isHot: true
  },
  {
    id: 'mavic-4-pro',
    name: 'DJI Mavic 4 Pro',
    category: CATEGORIES.CAMERA_DRONES,
    series: SERIES.MAVIC,
    slogan: '天地为你所动',
    description: '三摄旗舰影像航拍机',
    shortDesc: '多焦段三摄系统，全向避障',
    price: 13888,
    originalPrice: 13888,
    images: {
      hero: '../../public/images/dji/hero-mavic-3-pro.jpg', // 暂时复用
      gallery: []
    },
    isNew: true,
    isHot: true
  },
  {
    id: 'mini-5-pro',
    name: 'DJI Mini 5 Pro',
    category: CATEGORIES.CAMERA_DRONES,
    series: SERIES.MINI,
    slogan: '小有底气',
    description: '一英寸大底全能迷你航拍机',
    shortDesc: '249g 轻巧机身，4K/60fps HDR',
    price: 4788,
    originalPrice: 4788,
    images: {
      hero: '../../public/images/dji/mini-4-pro.png', // 暂时复用
      gallery: []
    },
    isNew: true,
    isHot: true
  },
  {
    id: 'neo-2',
    name: 'DJI Neo 2',
    category: CATEGORIES.CAMERA_DRONES,
    series: SERIES.NEO,
    slogan: '尽在掌控',
    description: '会飞的跟拍摄影师',
    shortDesc: '掌上起降，AI 智能跟拍',
    price: 1499,
    originalPrice: 1499,
    images: {
      hero: '../../public/images/dji/neo.png', // 暂时复用
      gallery: []
    },
    isNew: true,
    isHot: true
  },
  {
    id: 'avata-2',
    name: 'DJI Avata 2',
    category: CATEGORIES.CAMERA_DRONES,
    series: SERIES.AVATA,
    slogan: '快意飞驰',
    description: '第一视角飞行体验无人机',
    shortDesc: '沉浸式飞行体验，体感操控',
    price: 5089,
    originalPrice: 5089,
    images: {
      hero: '../../public/images/dji/osmo-360-hero.jpg', // 暂时复用
      gallery: []
    },
    isNew: false,
    isHot: true
  }
];
