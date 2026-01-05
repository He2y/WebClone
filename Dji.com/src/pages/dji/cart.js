/**
 * DJI 购物车页面
 * 展示购物车内容，支持修改数量、删除商品
 */

import { products } from '../../data/djiData.js';
import { createHeader, updateCartBadge } from '../../components/dji/Header.js';
import { createFooter } from '../../components/dji/Footer.js';

// 购物车数据
let cart = [];

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFooter();
  loadCart();
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

// 加载购物车
function loadCart() {
  // 从 localStorage 获取购物车
  const savedCart = localStorage.getItem('dji_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    // 补充产品信息（如果产品信息不完整）
    cart = cart.map(item => {
      if (!item.product) {
        const product = products.find(p => p.id === item.productId);
        return { ...item, product };
      }
      return item;
    }).filter(item => item.product); // 移除无效商品
  }
  
  renderCart();
}

// 渲染购物车
function renderCart() {
  const container = document.getElementById('cartContent');
  if (!container) return;
  
  // 购物车为空
  if (cart.length === 0) {
    renderEmptyCart(container);
    return;
  }
  
  // 渲染购物车商品列表
  renderCartItems(container);
  
  // 渲染购物车汇总
  renderCartSummary(container);
}

// 渲染空购物车
function renderEmptyCart(container) {
  container.innerHTML = `
    <div class="dji-cart__empty">
      <p class="dji-cart__empty-icon">🛒</p>
      <h2 class="dji-cart__empty-text">购物车是空的</h2>
      <p style="color: #757575; margin-bottom: 24px;">快去选购心仪的产品吧</p>
      <a href="../index.html" class="dji-cart__empty-btn">去选购</a>
    </div>
  `;
}

// 渲染购物车商品列表
function renderCartItems(container) {
  let itemsHtml = '<div class="dji-cart__items">';
  
  cart.forEach(item => {
    if (!item.product) return;
    
    itemsHtml += `
      <div class="dji-cart-item" data-product-id="${item.productId}">
        <div class="dji-cart-item__image">
          <img 
            src="${item.product.images.hero}" 
            alt="${item.product.name}"
            onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22100%25%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23f5f5f5%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%239e9e9e%22%3E${item.product.name}%3C/text%3E%3C/svg%3E'"
          >
        </div>
        <div class="dji-cart-item__info">
          <div>
            <h3 class="dji-cart-item__name">${item.product.name}</h3>
            <p class="dji-cart-item__specs">${item.product.description}</p>
          </div>
          <p class="dji-cart-item__price">¥${item.product.price.toLocaleString()}</p>
        </div>
        <div class="dji-cart-item__actions">
          <div class="dji-cart-item__quantity">
            <button class="dji-cart-item__quantity-btn" data-action="decrease">-</button>
            <span class="dji-cart-item__quantity-value">${item.quantity}</span>
            <button class="dji-cart-item__quantity-btn" data-action="increase">+</button>
          </div>
          <button class="dji-cart-item__remove" data-action="remove">删除</button>
        </div>
      </div>
    `;
  });
  
  itemsHtml += '</div>';
  container.innerHTML += itemsHtml;
  
  // 绑定商品列表事件
  bindCartItemEvents();
}

// 渲染购物车汇总
function renderCartSummary(container) {
  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? 0 : 0; // 免运费
  const total = subtotal + shipping;
  
  const summaryHtml = `
    <div class="dji-cart__summary">
      <div class="dji-cart__summary-row">
        <span>商品小计</span>
        <span>¥${subtotal.toLocaleString()}</span>
      </div>
      <div class="dji-cart__summary-row">
        <span>运费</span>
        <span>${shipping > 0 ? '¥' + shipping.toLocaleString() : '免运费'}</span>
      </div>
      <div class="dji-cart__summary-row dji-cart__summary-row--total">
        <span>总计</span>
        <span>¥${total.toLocaleString()}</span>
      </div>
      <button class="dji-cart__checkout-btn" id="checkoutBtn">去结算</button>
    </div>
  `;
  
  container.innerHTML += summaryHtml;
  
  // 绑定结算按钮事件
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
  }
}

// 绑定购物车商品事件
function bindCartItemEvents() {
  const cartItems = document.querySelectorAll('.dji-cart-item');
  
  cartItems.forEach(item => {
    const productId = item.dataset.productId;
    const decreaseBtn = item.querySelector('[data-action="decrease"]');
    const increaseBtn = item.querySelector('[data-action="increase"]');
    const removeBtn = item.querySelector('[data-action="remove"]');
    
    // 减少数量
    decreaseBtn.addEventListener('click', () => {
      updateQuantity(productId, -1);
    });
    
    // 增加数量
    increaseBtn.addEventListener('click', () => {
      updateQuantity(productId, 1);
    });
    
    // 删除商品
    removeBtn.addEventListener('click', () => {
      removeItem(productId);
    });
  });
}

// 更新商品数量
function updateQuantity(productId, delta) {
  const item = cart.find(i => i.productId === productId);
  if (!item) return;
  
  const newQuantity = item.quantity + delta;
  
  if (newQuantity <= 0) {
    // 数量为0时删除商品
    removeItem(productId);
  } else {
    // 更新数量
    item.quantity = newQuantity;
    saveCart();
    renderCart();
  }
}

// 删除商品
function removeItem(productId) {
  if (!confirm('确定要删除这个商品吗？')) return;
  
  cart = cart.filter(i => i.productId !== productId);
  saveCart();
  renderCart();
}

// 计算小计
function calculateSubtotal() {
  return cart.reduce((total, item) => {
    if (!item.product) return total;
    return total + (item.product.price * item.quantity);
  }, 0);
}

// 保存购物车到 localStorage
function saveCart() {
  localStorage.setItem('dji_cart', JSON.stringify(cart));
  updateCartBadge();
}


