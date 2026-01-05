/**
 * DJI 订单成功页面
 * 显示订单提交成功信息
 */

import { createHeader, updateCartBadge } from '../../components/dji/Header.js';
import { createFooter } from '../../components/dji/Footer.js';

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFooter();
  loadOrderInfo();
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

// 加载订单信息
function loadOrderInfo() {
  const container = document.getElementById('orderInfo');
  if (!container) return;
  
  // 从 localStorage 获取订单信息
  const savedOrder = localStorage.getItem('dji_last_order');
  if (!savedOrder) {
    container.innerHTML = '<p style="text-align: center; color: #757575;">订单信息未找到</p>';
    return;
  }
  
  const order = JSON.parse(savedOrder);
  
  // 格式化订单时间
  const orderTime = order.orderTime 
    ? new Date(order.orderTime).toLocaleString('zh-CN')
    : '未知';
  
  // 支付方式映射
  const paymentMap = {
    'alipay': '支付宝',
    'wechat': '微信支付',
    'card': '银行卡支付'
  };
  
  container.innerHTML = `
    <div style="margin-bottom: 16px;">
      <p style="font-weight: 500; color: #757575;">订单编号</p>
      <p style="font-size: 18px; font-weight: 600; margin-top: 4px;">${order.orderId || '未知'}</p>
    </div>
    
    <div style="margin-bottom: 16px;">
      <p style="font-weight: 500; color: #757575;">下单时间</p>
      <p style="margin-top: 4px;">${orderTime}</p>
    </div>
    
    <div style="margin-bottom: 16px;">
      <p style="font-weight: 500; color: #757575;">收货人</p>
      <p style="margin-top: 4px;">${order.name || '未知'}</p>
    </div>
    
    <div style="margin-bottom: 16px;">
      <p style="font-weight: 500; color: #757575;">联系电话</p>
      <p style="margin-top: 4px;">${order.phone || '未知'}</p>
    </div>
    
    <div style="margin-bottom: 16px;">
      <p style="font-weight: 500; color: #757575;">收货地址</p>
      <p style="margin-top: 4px;">${order.address || '未知'}</p>
    </div>
    
    <div style="margin-bottom: 16px;">
      <p style="font-weight: 500; color: #757575;">支付方式</p>
      <p style="margin-top: 4px;">${paymentMap[order.payment] || '未知'}</p>
    </div>
    
    <div style="margin-bottom: 16px;">
      <p style="font-weight: 500; color: #757575;">订单商品</p>
      <div style="margin-top: 8px;">
        ${(order.items || []).map(item => `
          <div style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
            <p style="font-weight: 500;">${item.name}</p>
            <p style="font-size: 14px; color: #757575;">数量: ${item.quantity} | 单价: ¥${item.price?.toLocaleString() || 0}</p>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div style="padding-top: 16px; border-top: 2px solid #000;">
      <p style="font-weight: 500; color: #757575;">订单总额</p>
      <p style="font-size: 24px; font-weight: 700; margin-top: 4px;">¥${order.total?.toLocaleString() || 0}</p>
    </div>
  `;
}


