/**
 * DJI 结算页面
 * 填写订单信息，提交订单
 */

import { createHeader, updateCartBadge } from '../../components/dji/Header.js';
import { createFooter } from '../../components/dji/Footer.js';

// 购物车数据
let cart = [];

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFooter();
  loadCart();
  renderOrderSummary();
  bindFormEvents();
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
  const savedCart = localStorage.getItem('dji_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  
  // 如果购物车为空，跳转到购物车页面
  if (cart.length === 0) {
    alert('购物车为空，请先添加商品');
    window.location.href = 'cart.html';
    return;
  }
}

// 渲染订单汇总
function renderOrderSummary() {
  const container = document.getElementById('orderSummary');
  if (!container) return;
  
  let itemsHtml = '';
  let subtotal = 0;
  
  cart.forEach(item => {
    if (!item.product) return;
    
    const itemTotal = item.product.price * item.quantity;
    subtotal += itemTotal;
    
    itemsHtml += `
      <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
        <div style="flex: 1;">
          <p style="font-weight: 500;">${item.product.name}</p>
          <p style="font-size: 14px; color: #757575;">数量: ${item.quantity}</p>
        </div>
        <p style="font-weight: 600;">¥${itemTotal.toLocaleString()}</p>
      </div>
    `;
  });
  
  const shipping = 0; // 免运费
  const total = subtotal + shipping;
  
  container.innerHTML = `
    <div style="margin-bottom: 16px;">
      ${itemsHtml}
    </div>
    <div style="padding-top: 16px; border-top: 2px solid #000;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>商品小计</span>
        <span>¥${subtotal.toLocaleString()}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>运费</span>
        <span>免运费</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 24px; font-weight: 700; margin-top: 16px;">
        <span>总计</span>
        <span>¥${total.toLocaleString()}</span>
      </div>
    </div>
  `;
}

// 绑定表单事件
function bindFormEvents() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitOrder(form);
  });
}

// 提交订单
function submitOrder(form) {
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';
  }
  
  // 收集表单数据
  const formData = new FormData(form);
  const orderData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    zipcode: formData.get('zipcode'),
    payment: formData.get('payment'),
    remark: formData.get('remark'),
    items: cart.map(item => ({
      productId: item.productId,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
    })),
    total: calculateTotal()
  };
  
  // 模拟提交订单（实际项目中这里会调用后端 API）
  console.log('订单数据:', orderData);
  
  // 延迟模拟网络请求
  setTimeout(() => {
    // 保存订单信息到 localStorage
    localStorage.setItem('dji_last_order', JSON.stringify({
      ...orderData,
      orderId: 'DJ' + Date.now(),
      orderTime: new Date().toISOString()
    }));
    
    // 清空购物车
    localStorage.removeItem('dji_cart');
    
    // 跳转到成功页
    window.location.href = 'success.html';
  }, 1500);
}

// 计算总价
function calculateTotal() {
  return cart.reduce((total, item) => {
    if (!item.product) return total;
    return total + (item.product.price * item.quantity);
  }, 0);
}


