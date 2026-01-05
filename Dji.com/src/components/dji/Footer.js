/**
 * DJI Footer 组件
 * 页脚，包含产品分类、增值服务、购买渠道、帮助支持等信息
 */

export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'dji-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="dji-footer__content">
        <div class="dji-footer__section">
          <h3 class="dji-footer__section-title">热门产品分类</h3>
          <ul class="dji-footer__link-list">
            <li class="dji-footer__link-item">
              <a href="search.html?category=camera-drones" class="dji-footer__link">消费级</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">专业级</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">行业级</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="search.html?category=accessories" class="dji-footer__link">系统模块</a>
            </li>
          </ul>
        </div>

        <div class="dji-footer__section">
          <h3 class="dji-footer__section-title">增值服务</h3>
          <ul class="dji-footer__link-list">
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">DJI Care 随心换</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">DJI Care Pro</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">DJI Care 行业无忧</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">行业无人机保养服务</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">农机关怀计划</a>
            </li>
          </ul>
        </div>

        <div class="dji-footer__section">
          <h3 class="dji-footer__section-title">线上商城</h3>
          <ul class="dji-footer__link-list">
            <li class="dji-footer__link-item">
              <a href="https://store.dji.com" target="_blank" class="dji-footer__link">官方商城</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">平台官方渠道</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="https://store.dji.com/cn/pages/app" target="_blank" class="dji-footer__link">大疆商城 App</a>
            </li>
          </ul>
        </div>

        <div class="dji-footer__section">
          <h3 class="dji-footer__section-title">线下门店</h3>
          <ul class="dji-footer__link-list">
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">线下零售店</a>
            </li>
          </ul>
        </div>

        <div class="dji-footer__section">
          <h3 class="dji-footer__section-title">安全飞行</h3>
          <ul class="dji-footer__link-list">
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">安全飞行指引</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">大疆飞行指南</a>
            </li>
          </ul>
        </div>

        <div class="dji-footer__section">
          <h3 class="dji-footer__section-title">帮助与支持</h3>
          <ul class="dji-footer__link-list">
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">产品支持</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">服务申请与信息支持</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">帮助中心</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">售后服务政策</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">下载中心</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">安全与隐私</a>
            </li>
          </ul>
        </div>

        <div class="dji-footer__section">
          <h3 class="dji-footer__section-title">探索精彩大疆</h3>
          <ul class="dji-footer__link-list">
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">媒体中心</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="#" class="dji-footer__link">官方周边</a>
            </li>
          </ul>
        </div>

        <div class="dji-footer__section">
          <h3 class="dji-footer__section-title">社区</h3>
          <ul class="dji-footer__link-list">
            <li class="dji-footer__link-item">
              <a href="https://www.skypixel.com" target="_blank" class="dji-footer__link">天空之城</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="https://bbs.dji.com" target="_blank" class="dji-footer__link">大疆社区</a>
            </li>
            <li class="dji-footer__link-item">
              <a href="https://developer.dji.com/cn" target="_blank" class="dji-footer__link">开发者</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="dji-footer__subscribe">
        <h3 class="dji-footer__subscribe-title">订阅我们</h3>
        <p class="dji-footer__subscribe-desc">第一时间获得大疆的最新动态</p>
        <form class="dji-footer__subscribe-form" id="subscribeForm">
          <input 
            type="email" 
            class="dji-footer__subscribe-input" 
            placeholder="请输入您的邮箱地址"
            required
          >
          <button type="submit" class="dji-footer__subscribe-btn">订阅</button>
        </form>
      </div>

      <div class="dji-footer__bottom">
        <div>
          <p class="dji-footer__copyright">
            Copyright © 2025 DJI 大疆创新 版权所有
          </p>
          <p class="dji-footer__copyright">
            <a href="#" class="dji-footer__link">粤ICP备2022092332号</a>
          </p>
        </div>
        
        <div class="dji-footer__social">
          <a href="https://mp.weixin.qq.com" target="_blank" class="dji-footer__social-link" title="微信">
            微信
          </a>
          <a href="https://weibo.com/DJIChina" target="_blank" class="dji-footer__social-link" title="微博">
            微博
          </a>
          <a href="#" class="dji-footer__social-link" title="抖音">
            抖音
          </a>
          <a href="https://space.bilibili.com/232472043" target="_blank" class="dji-footer__social-link" title="Bilibili">
            Bilibili
          </a>
          <a href="#" class="dji-footer__social-link" title="小红书">
            小红书
          </a>
        </div>
      </div>
    </div>
  `;

  // 绑定订阅表单事件
  const subscribeForm = footer.querySelector('#subscribeForm');
  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = subscribeForm.querySelector('input[type="email"]').value;
    alert(`感谢订阅！确认邮件已发送至：${email}`);
    subscribeForm.reset();
  });

  return footer;
}



