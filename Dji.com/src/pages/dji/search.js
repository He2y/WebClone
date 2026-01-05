/**
 * DJI 产品搜索页
 * 支持搜索、筛选、排序功能
 */

import { products, filterByCategory, searchProducts, sortProducts } from '../../data/djiData.js';
import { createHeader, updateCartBadge } from '../../components/dji/Header.js';
import { createFooter } from '../../components/dji/Footer.js';
import { createProductCard } from '../../components/dji/ProductCard.js';

// 页面状态
let currentCategory = 'all';
let currentKeyword = '';
let currentSort = 'default';
let filteredProducts = [...products];

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFooter();
  initURLParams();
  initFilterButtons();
  initSortSelect();
  initSearchInput();
  initClearSearchBtn();
  renderProducts();
  updateCartBadge();
});

// 初始化 URL 参数
function initURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // 获取分类参数
  const category = urlParams.get('category');
  if (category && category !== 'all') {
    currentCategory = category;
    updateFilterButtons();
  }
  
  // 获取搜索关键词
  const keyword = urlParams.get('q');
  if (keyword) {
    currentKeyword = keyword;
    document.getElementById('searchInput').value = keyword;
  }
}

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

// 初始化筛选按钮
function initFilterButtons() {
  const filterButtons = document.querySelectorAll('.dji-filter-bar__filter');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      currentCategory = category;
      updateFilterButtons();
      applyFilters();
    });
  });
}

// 更新筛选按钮状态
function updateFilterButtons() {
  const filterButtons = document.querySelectorAll('.dji-filter-bar__filter');
  filterButtons.forEach(button => {
    if (button.dataset.category === currentCategory) {
      button.classList.add('dji-filter-bar__filter--active');
    } else {
      button.classList.remove('dji-filter-bar__filter--active');
    }
  });
}

// 初始化排序下拉框
function initSortSelect() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }
}

// 初始化搜索输入框
function initSearchInput() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentKeyword = e.target.value.trim();
        applyFilters();
      }, 300);
    });
  }
}

// 初始化清除搜索按钮
function initClearSearchBtn() {
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      currentCategory = 'all';
      currentKeyword = '';
      currentSort = 'default';
      document.getElementById('searchInput').value = '';
      document.getElementById('sortSelect').value = 'default';
      updateFilterButtons();
      applyFilters();
    });
  }
}

// 应用筛选条件
function applyFilters() {
  // 先按分类筛选
  filteredProducts = currentCategory === 'all' 
    ? [...products] 
    : filterByCategory(currentCategory);
  
  // 再按关键词搜索
  if (currentKeyword) {
    filteredProducts = searchProducts(currentKeyword);
    // 如果有关键词搜索，需要再次过滤分类
    if (currentCategory !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
    }
  }
  
  // 渲染结果
  renderProducts();
}

// 渲染产品列表
function renderProducts() {
  const container = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  const resultTitle = document.getElementById('resultTitle');
  const resultCount = document.getElementById('resultCount');
  
  if (!container) return;
  
  // 清空容器
  container.innerHTML = '';
  
  // 排序
  let displayProducts = sortProducts(filteredProducts, currentSort);
  
  // 更新标题和数量
  if (currentKeyword) {
    resultTitle.textContent = `搜索结果: "${currentKeyword}"`;
  } else if (currentCategory !== 'all') {
    const categoryNames = {
      'camera-drones': '航拍无人机',
      'handheld': '手持摄影设备',
      'accessories': '配件'
    };
    resultTitle.textContent = categoryNames[currentCategory] || '全部产品';
  } else {
    resultTitle.textContent = '全部产品';
  }
  
  resultCount.textContent = `共 ${displayProducts.length} 件商品`;
  
  // 没有结果
  if (displayProducts.length === 0) {
    container.style.display = 'none';
    noResults.style.display = 'block';
    return;
  }
  
  // 显示结果
  container.style.display = 'grid';
  noResults.style.display = 'none';
  
  // 渲染产品卡片
  displayProducts.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}



