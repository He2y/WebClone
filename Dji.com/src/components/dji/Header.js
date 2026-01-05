/**
 * DJI Header 组件
 * 顶部导航栏，包含 Logo、导航菜单、搜索框、用户中心和购物车
 */

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'dji-header';
  header.innerHTML = `
    <div class="container dji-header__nav">
      <a href="../dji/index.html" class="dji-header__logo">DJI</a>
      <ul class="dji-header__nav-list">
        <li class="dji-header__nav-item">
          <a href="camera-drones.html" class="dji-header__nav-link">航拍无人机</a>
          <div class="dji-header__dropdown">
            <div class="dji-header__dropdown-col">
              <div class="dji-header__dropdown-title">消费级系列</div>
              <div class="dji-header__dropdown-list">
                <a href="camera-drones.html#mavic" class="dji-header__dropdown-link">DJI Mavic</a>
                <a href="camera-drones.html#air" class="dji-header__dropdown-link">DJI Air</a>
                <a href="camera-drones.html#mini" class="dji-header__dropdown-link">DJI Mini</a>
                <a href="camera-drones.html#flip" class="dji-header__dropdown-link">DJI Flip</a>
              </div>
            </div>
            <div class="dji-header__dropdown-col">
              <div class="dji-header__dropdown-title">体验飞行</div>
              <div class="dji-header__dropdown-list">
                <a href="camera-drones.html#avata" class="dji-header__dropdown-link">DJI Avata</a>
                <a href="camera-drones.html#neo" class="dji-header__dropdown-link">DJI Neo</a>
                <a href="camera-drones.html#fpv" class="dji-header__dropdown-link">DJI FPV</a>
              </div>
            </div>
            <div class="dji-header__dropdown-col">
              <div class="dji-header__dropdown-title">专业级</div>
              <div class="dji-header__dropdown-list">
                <a href="camera-drones.html#inspire" class="dji-header__dropdown-link">DJI Inspire</a>
              </div>
            </div>
            <div class="dji-header__dropdown-col">
              <div class="dji-header__dropdown-title">更多</div>
              <div class="dji-header__dropdown-list">
                <a href="search.html?category=accessories" class="dji-header__dropdown-link">配件</a>
                <a href="camera-drones.html" class="dji-header__dropdown-link">对比无人机</a>
                <a href="camera-drones.html" class="dji-header__dropdown-link">选购指南</a>
              </div>
            </div>
          </div>
        </li>
        <li class="dji-header__nav-item">
          <a href="search.html?category=handheld" class="dji-header__nav-link">手持摄影设备</a>
        </li>
        <li class="dji-header__nav-item">
          <a href="search.html?category=portable-power-station" class="dji-header__nav-link">储能及家居科技</a>
        </li>
        <li class="dji-header__nav-item">
          <a href="#" class="dji-header__nav-link">商用产品及方案</a>
        </li>
        <li class="dji-header__nav-item">
          <a href="#" class="dji-header__nav-link">探索精彩</a>
        </li>
        <li class="dji-header__nav-item">
          <a href="#" class="dji-header__nav-link">服务与支持</a>
        </li>
        <li class="dji-header__nav-item">
          <a href="#" class="dji-header__nav-link">购买渠道</a>
        </li>
      </ul>
      <div class="dji-header__actions">
        <button class="dji-header__icon-btn" id="searchBtn" aria-label="搜索">
          <svg viewBox="0 0 24 24"><path d="M21.71 20.29l-5.01-5.01C17.54 13.68 18 11.91 18 10c0-4.41-3.59-8-8-8S2 5.59 2 10s3.59 8 8 8c1.91 0 3.68-.46 5.28-1.3l5.01 5.01c.39.39 1.02.39 1.41 0 .39-.39.39-1.02.01-1.41zM4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z"/></svg>
        </button>
        <div class="dji-header__cart-btn" id="cartBtn" aria-label="购物车">
          <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
          <span class="dji-header__cart-badge" id="cartBadge" style="display:none">0</span>
        </div>
        <button class="dji-header__icon-btn" id="userBtn" aria-label="用户中心">
          <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </button>
        <span class="dji-header__region" style="font-size:12px; cursor:pointer; opacity:0.8;">中国大陆</span>
        <a href="https://store.dji.com/cn" target="_blank" class="dji-header__mall-link">商城</a>
      </div>
    </div>
  `;

  // 绑定事件
  bindHeaderEvents(header);

  return header;
}

export function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) {
    // 这里简单模拟，实际应从 localStorage 或全局状态获取
    const count = parseInt(localStorage.getItem('cartCount') || '0');
    badge.textContent = count;
    badge.style.display = count > 0 ? 'block' : 'none';
  }
}

function bindHeaderEvents(header) {
  const searchBtn = header.querySelector('#searchBtn');
  const cartBtn = header.querySelector('#cartBtn');
  const userBtn = header.querySelector('#userBtn');

  // 搜索功能 (点击弹出简单的 prompt 或跳转)
  searchBtn.addEventListener('click', () => {
    const keyword = prompt('请输入搜索关键词:');
    if (keyword) {
      window.location.href = `search.html?q=${encodeURIComponent(keyword)}`;
    }
  });

  // 购物车按钮
  cartBtn.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });
  
  // 用户按钮
  userBtn.addEventListener('click', () => {
      alert('用户中心功能开发中...');
  });
}
