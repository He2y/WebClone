/**
 * 航拍无人机页面逻辑
 */

import { createHeader, updateCartBadge } from '../../components/dji/Header.js';
import { createFooter } from '../../components/dji/Footer.js';
import { products } from '../../data/djiData.js';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  createHeader();
  createFooter();
  renderSeriesList();
  renderComparisonTable();
  updateCartBadge();
  initScrollSpy();
});

// 渲染系列列表
function renderSeriesList() {
  const container = document.getElementById('seriesList');
  if (!container) return;

  // 定义页面展示的重点产品 (模拟官网顺序)
  const featuredSeries = [
    {
      id: 'neo-2',
      name: 'DJI Neo 2',
      tag: '会飞的跟拍摄影师',
      slogan: '尽在掌控',
      desc: '掌上起降，AI 智能跟拍，4K 超清视频',
      image: '../../public/images/dji/hero-mavic-3-pro.jpg', // 暂时复用
      link: 'product.html?id=neo-2',
      buyLink: '#'
    },
    {
      id: 'mavic-4-pro',
      name: 'DJI Mavic 4 Pro',
      tag: '三摄旗舰影像航拍机',
      slogan: '天地为你所动',
      desc: '多焦段三摄系统，全向避障，46 分钟续航',
      image: '../../public/images/dji/hero-mavic-3-pro.jpg', // 暂时复用
      link: 'product.html?id=mavic-4-pro',
      buyLink: '#'
    },
    {
      id: 'mini-5-pro',
      name: 'DJI Mini 5 Pro',
      tag: '一英寸大底全能迷你航拍机',
      slogan: '小有底气',
      desc: '249g 轻巧机身，4K/60fps HDR，全向主动避障',
      image: '../../public/images/dji/mini-4-pro.png', // 暂时复用
      link: 'product.html?id=mini-5-pro',
      buyLink: '#'
    },
    {
      id: 'flip',
      name: 'DJI Flip',
      tag: '全能 Vlog 航拍机',
      slogan: '远近皆入画，人景皆出彩',
      desc: '折叠便携，一键短片，智能跟随',
      image: '../../public/images/dji/dji-flip-card.png',
      link: 'product.html?id=dji-flip',
      buyLink: '#'
    },
    {
      id: 'avata-2',
      name: 'DJI Avata 2',
      tag: '第一视角飞行体验无人机',
      slogan: '快意飞驰',
      desc: '沉浸式飞行体验，体感操控，自带桨叶保护罩',
      image: '../../public/images/dji/osmo-360-hero.jpg', // 暂时复用
      link: 'product.html?id=avata-2',
      buyLink: '#'
    }
  ];

  let html = '';
  featuredSeries.forEach(item => {
    html += `
      <div class="dji-series-card" id="${item.id.split('-')[0]}"> <!-- 简单的锚点定位 -->
        <div class="dji-series-card__image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="dji-series-card__content">
          <span class="dji-series-card__tag">${item.tag}</span>
          <h2 class="dji-series-card__title">${item.name}</h2>
          <p class="dji-series-card__slogan">${item.slogan}</p>
          <p style="margin-bottom: 24px; color: #666; line-height: 1.6;">${item.desc}</p>
          <div class="dji-series-card__actions">
            <a href="${item.buyLink}" class="dji-btn dji-btn--black">立即购买</a>
            <a href="${item.link}" class="dji-btn dji-btn--outline">了解更多</a>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// 渲染对比表格
function renderComparisonTable() {
  const container = document.getElementById('comparisonTableWrapper');
  if (!container) return;

  const compareProducts = [
    {
      name: 'DJI Mavic 4 Pro',
      image: '../../public/images/dji/hero-mavic-3-pro.jpg',
      price: '¥13,888 起',
      weight: '900 g',
      sensor: '4/3 CMOS 哈苏主摄',
      flightTime: '46 分钟',
      transmission: '15 公里 (O4+)'
    },
    {
      name: 'DJI Air 3S',
      image: '../../public/images/dji/air-3s.png',
      price: '¥6,988 起',
      weight: '724 g',
      sensor: '1 英寸 CMOS 广角',
      flightTime: '46 分钟',
      transmission: '20 公里 (O4)'
    },
    {
      name: 'DJI Mini 5 Pro',
      image: '../../public/images/dji/mini-4-pro.png',
      price: '¥4,788 起',
      weight: '< 249 g',
      sensor: '1/1.3 英寸 CMOS',
      flightTime: '34/45 分钟',
      transmission: '20 公里 (O4)'
    },
    {
      name: 'DJI Flip',
      image: '../../public/images/dji/dji-flip-card.png',
      price: '¥2,788 起',
      weight: '300 g',
      sensor: '1/1.3 英寸 CMOS',
      flightTime: '31 分钟',
      transmission: '10 公里'
    }
  ];

  let html = `
    <table class="dji-comparison-table">
      <thead>
        <tr>
          ${compareProducts.map(p => `
            <th>
              <img src="${p.image}" alt="${p.name}">
              <div class="product-name">${p.name}</div>
              <div class="product-price">${p.price}</div>
              <a href="#" style="color: #000; text-decoration: underline; font-size: 14px;">立即购买</a>
            </th>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${compareProducts.map(p => `<td><div style="font-weight: bold;">${p.weight}</div><div style="font-size: 12px; color: #999;">起飞重量</div></td>`).join('')}
        </tr>
        <tr>
          ${compareProducts.map(p => `<td><div style="font-weight: bold;">${p.sensor}</div><div style="font-size: 12px; color: #999;">影像系统</div></td>`).join('')}
        </tr>
        <tr>
          ${compareProducts.map(p => `<td><div style="font-weight: bold;">${p.flightTime}</div><div style="font-size: 12px; color: #999;">最长飞行时间</div></td>`).join('')}
        </tr>
        <tr>
          ${compareProducts.map(p => `<td><div style="font-weight: bold;">${p.transmission}</div><div style="font-size: 12px; color: #999;">图传系统</div></td>`).join('')}
        </tr>
      </tbody>
    </table>
    <div style="text-align: center; margin-top: 32px;">
      <a href="#" style="color: #000; text-decoration: none; border-bottom: 1px solid #000; padding-bottom: 2px;">对比所有航拍无人机 ></a>
    </div>
  `;

  container.innerHTML = html;
}

// 滚动监听 (简单的 active 状态切换)
function initScrollSpy() {
  const links = document.querySelectorAll('.dji-subnav__link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.dji-series-card');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('dji-subnav__link--active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('dji-subnav__link--active');
      }
    });
  });
}
