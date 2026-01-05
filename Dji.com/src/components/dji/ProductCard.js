/**
 * DJI ProductCard 组件
 * 产品卡片，展示产品信息
 * 样式更新：大图背景，文字居中上置，操作链接
 */

import { updateCartBadge } from './Header.js';

export function createProductCard(product) {
  const card = document.createElement('a');
  card.href = product.link || '#'; // 确保卡片整体是链接
  card.className = 'dji-product-card';
  card.dataset.productId = product.id;
  
  // 徽章 HTML (如果需要)
  let badgesHtml = '';
  if (product.isNew) {
    // badgesHtml += '<span class="dji-product-card__badge dji-product-card__badge--new">新品</span>';
  }
  
  card.innerHTML = `
    <div class="dji-product-card__content">
         <h3 class="dji-product-card__title">${product.name}</h3>
         <p class="dji-product-card__slogan">${product.slogan}</p>
         <p class="dji-product-card__price">¥${product.price.toLocaleString()} 起</p>
         
         <div class="dji-product-card__links">
            <span class="dji-product-card__link" data-action="view-detail">
              了解更多 
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </span>
            <span class="dji-product-card__link" data-action="add-to-cart">
              立即购买 
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </span>
         </div>
    </div>
    
    <div class="dji-product-card__image-wrapper">
      <img class="dji-product-card__image" src="${product.images.hero}" alt="${product.name}" onerror="this.src='../../public/images/dji/placeholder.svg'">
    </div>
  `;

  // 绑定事件
  const addToCartBtn = card.querySelector('[data-action="add-to-cart"]');
  const viewDetailBtn = card.querySelector('[data-action="view-detail"]');

  // 阻止冒泡，以便单独处理
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', (e) => {
      e.preventDefault(); 
      e.stopPropagation();
      // 这里应该是跳转到购买链接，或者加入购物车
      // DJI 官网的"立即购买"通常是跳转到商城详情页
      if (product.buyLink) {
        window.open(product.buyLink, '_blank');
      } else {
        addToCart(product.id);
        alert('已加入购物车');
      }
    });
  }

  if (viewDetailBtn) {
    viewDetailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // 跳转到官网详情页
      if (product.link) {
          window.location.href = product.link;
      }
    });
  }

  // 点击卡片本身跳转到详情页 (本地或远程)
  card.addEventListener('click', (e) => {
    // 如果没有被阻止
    if (product.link) {
        // 让 a 标签自然跳转，或者这里处理
    } else {
        e.preventDefault();
    }
  });

  return card;
}

// 添加到购物车 (本地模拟)
function addToCart(productId) {
  console.log(`Product ${productId} added to cart`);
  let count = parseInt(localStorage.getItem('cartCount') || '0');
  count++;
  localStorage.setItem('cartCount', count);
  
  // 更新徽章
  updateCartBadge();
}
