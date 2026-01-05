/**
 * DJI 首页
 * 展示热门产品、新品推荐和精选产品
 */

import { getHotProducts, getNewProducts, getFeaturedProducts, heroSlides, innovationStories, exploreFields } from '../../data/djiData.js';
import { createHeader, updateCartBadge } from '../../components/dji/Header.js';
import { createFooter } from '../../components/dji/Footer.js';
import { createProductCard } from '../../components/dji/ProductCard.js';

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFooter();
  initHeroSlider();
  renderHotProducts();
  renderInnovationStories();
  renderExploreFields();
  updateCartBadge();
  
  // 监听滚动事件，改变 Header 样式
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.dji-header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
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

// 初始化 Hero 轮播图
function initHeroSlider() {
  const heroContainer = document.querySelector('.dji-hero');
  if (!heroContainer) return;

  // 清空现有内容（如果有）
  heroContainer.innerHTML = '';

  // 创建 Slides
  heroSlides.forEach((slide, index) => {
    const slideEl = document.createElement('div');
    slideEl.className = `dji-hero__slide ${index === 0 ? 'active' : ''}`;
    slideEl.innerHTML = `
      <img src="${slide.image}" alt="${slide.title}" class="dji-hero__bg">
      <div class="dji-hero__content container">
        <h1 class="dji-hero__title">${slide.title}</h1>
        <p class="dji-hero__subtitle">${slide.subtitle}</p>
        ${slide.slogan ? `<p class="dji-hero__slogan" style="font-size: 18px; margin-bottom: 32px; opacity: 0.8;">${slide.slogan}</p>` : ''}
        <div class="dji-hero__actions">
          <a href="${slide.buyLink}" class="dji-hero__btn dji-hero__btn--primary" target="_blank">立即购买</a>
          <a href="${slide.link}" class="dji-hero__btn dji-hero__btn--secondary" target="_blank">了解更多</a>
        </div>
      </div>
    `;
    heroContainer.appendChild(slideEl);
  });

  // 创建控制按钮 (SVG 图标)
  const prevBtn = document.createElement('button');
  prevBtn.className = 'dji-hero__control dji-hero__control--prev';
  prevBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'dji-hero__control dji-hero__control--next';
  nextBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>';

  heroContainer.appendChild(prevBtn);
  heroContainer.appendChild(nextBtn);

  // 轮播逻辑
  let currentSlide = 0;
  const slides = heroContainer.querySelectorAll('.dji-hero__slide');
  const totalSlides = slides.length;
  let interval;

  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    // 处理循环索引
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;

    slides[currentSlide].classList.add('active');
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  // 事件监听
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  // 自动轮播
  const startInterval = () => {
    interval = setInterval(nextSlide, 5000);
  };

  const resetInterval = () => {
    clearInterval(interval);
    startInterval();
  };

  startInterval();
}

// 渲染热门产品 (其实就是现在的产品列表，官网结构是 轮播 -> 热门产品 -> 创新故事 -> 领域探索)
function renderHotProducts() {
  const container = document.getElementById('hotProducts');
  if (!container) return;
  // 清空
  container.innerHTML = '';

  // 官网这里展示的是一个混合的网格，这里我们展示所有抓取到的真实产品
  // 按照官网顺序：Mavic 4 Pro, Air 3S, Action 6, Pocket 3, RS 4 Mini, Flip
  // djiData.js 中的 products 数组已经包含了这些
  // 我们直接渲染前 6-8 个产品
  const products = getFeaturedProducts(8); 
  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

// 渲染创新故事
function renderInnovationStories() {
  const container = document.getElementById('innovationStories');
  if (!container) return;
  container.innerHTML = '';

  innovationStories.forEach(story => {
    const item = document.createElement('a');
    item.href = story.link;
    item.target = '_blank';
    item.className = 'dji-story-card';
    item.style.backgroundImage = `url(${story.image})`;
    
    item.innerHTML = `
      <div class="dji-story-card__content">
        <div class="dji-story-card__category">${story.category}</div>
        <h3 class="dji-story-card__title">${story.title}</h3>
        <div class="dji-story-card__link">
          了解更多 <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

// 渲染领域探索
function renderExploreFields() {
  const container = document.getElementById('exploreFields');
  if (!container) return;
  container.innerHTML = '';

  exploreFields.forEach(field => {
    const item = document.createElement('a');
    item.href = field.link;
    item.target = '_blank';
    item.className = 'dji-field-card';
    item.style.backgroundImage = `url(${field.image})`;
    
    item.innerHTML = `
      <div class="dji-field-card__content">
        <h3 class="dji-field-card__title">${field.title}</h3>
        <p class="dji-field-card__desc">${field.desc}</p>
        <div class="dji-field-card__link">
          了解更多 <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}
