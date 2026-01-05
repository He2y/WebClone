/**
 * DJI 产品详情页
 * 展示产品详细信息、规格参数等
 */

import { products, getFeaturedProducts } from '../../data/djiData.js';
import { createHeader, updateCartBadge } from '../../components/dji/Header.js';
import { createFooter } from '../../components/dji/Footer.js';
import { createProductCard, showNotification } from '../../components/dji/ProductCard.js';

// 当前产品
let currentProduct = null;

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFooter();
  loadProduct();
  renderRelatedProducts();
  updateCartBadge();
});

// 初始化 Header
function initHeader() {
  const headerContainer = document.getElementById('header');
  if (headerContainer) {
    const header = createHeader();
    headerContainer.appendChild(header);
  }
}

// 初始化 Footer
function initFooter() {
  const footerContainer = document.getElementById('footer');
  if (footerContainer) {
    const footer = createFooter();
    footerContainer.appendChild(footer);
  }
}

// 加载产品
function loadProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) {
    showProductNotFound();
    return;
  }
  
  currentProduct = products.find(p => p.id === productId);
  
  if (!currentProduct) {
    showProductNotFound();
    return;
  }
  
  renderProductDetail();
}

// 显示产品未找到
function showProductNotFound() {
  const container = document.getElementById('productDetail');
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 80px 0;">
        <p style="font-size: 64px; margin-bottom: 16px;">🔍</p>
        <h2 style="font-size: 24px; margin-bottom: 8px;">未找到该产品</h2>
        <p style="color: #757575; margin-bottom: 24px;">产品可能已下架或链接有误</p>
        <a href="search.html" style="padding: 12px 24px; background-color: #000; color: #fff; border-radius: 4px; display: inline-block;">
          浏览全部产品
        </a>
      </div>
    `;
  }
}

// 渲染产品详情
function renderProductDetail() {
  if (!currentProduct) return;
  
  // 更新页面标题
  document.title = `${currentProduct.name} - ${currentProduct.slogan} - DJI 大疆创新`;
  document.getElementById('pageTitle').textContent = `${currentProduct.name} - ${currentProduct.slogan}`;
  document.getElementById('breadcrumbProduct').textContent = currentProduct.name;
  
  const container = document.getElementById('productDetail');
  if (!container) return;
  
  // 计算折扣
  const discount = currentProduct.originalPrice > currentProduct.price 
    ? Math.round((1 - currentProduct.price / currentProduct.originalPrice) * 100) 
    : 0;
  
  // 生成规格 HTML
  let specsHtml = '';
  if (currentProduct.specs) {
    Object.entries(currentProduct.specs).forEach(([key, value]) => {
      const labelMap = {
        camera: '相机',
        video: '视频',
        transmission: '图传',
        obstacleAvoidance: '避障',
        weight: '重量',
        maxFlightTime: '最大飞行时间',
        maxRange: '最大续航',
        waterproof: '防水',
        stabilization: '防抖',
        batteryLife: '续航',
        loadCapacity: '载重',
        features: '特色功能'
      };
      specsHtml += `
        <div class="dji-product-detail__spec-row">
          <span class="dji-product-detail__spec-label">${labelMap[key] || key}:</span>
          <span class="dji-product-detail__spec-value">${value}</span>
        </div>
      `;
    });
  }
  
  // 生成特色功能 HTML
  const featuresHtml = (currentProduct.features || []).map(feature => 
    `<div class="dji-product-detail__feature">${feature}</div>`
  ).join('');
  
  container.innerHTML = `
    <div class="dji-product-detail__hero">
      <div class="dji-product-detail__gallery">
        <div class="dji-product-detail__main-image">
          <img 
            src="${currentProduct.images.hero}" 
            alt="${currentProduct.name}"
            id="mainImage"
            onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22100%25%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23f5f5f5%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%239e9e9e%22%3E${currentProduct.name}%3C/text%3E%3C/svg%3E'"
          >
        </div>
        <div class="dji-product-detail__thumbnails">
          <div class="dji-product-detail__thumbnail dji-product-detail__thumbnail--active" data-src="${currentProduct.images.hero}">
            <img src="${currentProduct.images.hero}" alt="${currentProduct.name}">
          </div>
          ${(currentProduct.images.gallery || []).map((img, index) => `
            <div class="dji-product-detail__thumbnail" data-src="${img}">
              <img src="${img}" alt="${currentProduct.name} ${index + 1}">
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="dji-product-detail__info">
        <div class="dji-product-detail__category">${currentProduct.category}</div>
        <h1 class="dji-product-detail__name">${currentProduct.name}</h1>
        <p class="dji-product-detail__slogan">${currentProduct.slogan}</p>
        <p class="dji-product-detail__description">${currentProduct.shortDesc}</p>
        
        <div class="dji-product-detail__price">
          <span class="dji-product-detail__current-price">¥${currentProduct.price.toLocaleString()}</span>
          ${currentProduct.originalPrice > currentProduct.price 
            ? `<span class="dji-product-detail__original-price">¥${currentProduct.originalPrice.toLocaleString()}</span>`
            : ''
          }
          ${discount > 0 
            ? `<span style="margin-left: 8px; color: #e31937; font-weight: 500;">${discount}% OFF</span>`
            : ''
          }
        </div>
        
        <div class="dji-product-detail__specs">
          ${specsHtml}
        </div>
        
        <div class="dji-product-detail__features">
          ${featuresHtml}
        </div>
        
        <div class="dji-product-detail__actions">
          <button class="dji-product-detail__btn dji-product-detail__btn--primary" id="addToCartBtn">
            加入购物车
          </button>
          <a href="../index.html" class="dji-product-detail__btn dji-product-detail__btn--secondary" style="display: flex; align-items: center; justify-content: center; text-decoration: none;">
            返回首页
          </a>
        </div>
      </div>
    </div>
  `;
  
  // 绑定事件
  bindDetailEvents();
}

// 绑定详情页事件
function bindDetailEvents() {
  // 缩略图切换
  const thumbnails = document.querySelectorAll('.dji-product-detail__thumbnail');
  const mainImage = document.getElementById('mainImage');
  
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      // 移除所有激活状态
      thumbnails.forEach(t => t.classList.remove('dji-product-detail__thumbnail--active'));
      // 激活当前缩略图
      thumb.classList.add('dji-product-detail__thumbnail--active');
      // 更新主图
      mainImage.src = thumb.dataset.src;
    });
  });
  
  // 加入购物车按钮
  const addToCartBtn = document.getElementById('addToCartBtn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      addToCart();
    });
  }
}

// 添加到购物车
function addToCart() {
  if (!currentProduct) return;
  
  // 从 localStorage 获取购物车
  let cart = JSON.parse(localStorage.getItem('dji_cart') || '[]');
  
  const existingItem = cart.find(item => item.productId === currentProduct.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: currentProduct.id,
      quantity: 1,
      product: currentProduct
    });
  }
  
  // 保存到 localStorage
  localStorage.setItem('dji_cart', JSON.stringify(cart));
  
  // 更新购物车徽章
  updateCartBadge();
  
  // 显示通知
  showNotification(`${currentProduct.name} 已加入购物车`);
}

// 渲染相关推荐产品
function renderRelatedProducts() {
  const container = document.getElementById('relatedProducts');
  if (!container) return;
  
  // 获取推荐产品（排除当前产品）
  const featuredProducts = getFeaturedProducts(6);
  const relatedProducts = featuredProducts.filter(p => p.id !== currentProduct?.id).slice(0, 4);
  
  relatedProducts.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}


