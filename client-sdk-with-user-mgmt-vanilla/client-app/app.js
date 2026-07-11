/* global SIVI */

const IFRAME_CONTAINER_ID = 'sivi-container';
const API_BASE = 'http://localhost:4000';

const defaultOptions = {
  type: 'custom',
  subtype: 'custom',
  dimension: { width: 1080, height: 1080 },
  prompt: 'Create a modern social media post for a coffee restaurant',
  language: 'english',
  colors: ['#5662EC', '#EF9AB2'],
  numOfVariants: 3,
  outputFormat: 'png',
  config: {
    enableLoginUI: true,
    enableDesignEditor: true,
  },
};

let layouts = {};
let currentLayoutId = 1;
let isAIStudioOpen = false;
let selectedVisualId = null;
let visualShapes = {};
let imageVariantMap = {};
let currentLayoutDef = null;

// DOM refs
const layoutSelect = document.getElementById('layoutSelect');
const layoutPreview = document.getElementById('layout-preview');
const controlPanel = document.getElementById('control-panel');
const visualPanel = document.getElementById('visual-panel');
const aiStudioButton = document.getElementById('ai-studio-button');
const backButton = document.getElementById('back-button');
const tabDesign = document.getElementById('tab-design');
const tabUsers = document.getElementById('tab-users');
const designView = document.getElementById('design-view');
const usersView = document.getElementById('users-view');

// Load layouts
async function loadLayouts() {
  try {
    const response = await fetch('./layouts.json');
    layouts = await response.json();
    populateLayoutSelector();
    renderLayout(currentLayoutId);
  } catch (error) {
    console.error('Failed to load layouts:', error);
  }
}

function populateLayoutSelector() {
  layoutSelect.innerHTML = '';
  Object.values(layouts).forEach((layout) => {
    const option = document.createElement('option');
    option.value = layout.id;
    option.textContent = layout.name;
    layoutSelect.appendChild(option);
  });
  layoutSelect.value = currentLayoutId;
}

layoutSelect.addEventListener('change', (e) => {
  currentLayoutId = parseInt(e.target.value, 10);
  renderLayout(currentLayoutId);
});

function renderLayout(layoutId) {
  currentLayoutDef = layouts[layoutId];
  if (!currentLayoutDef) return;

  visualShapes = {};
  currentLayoutDef.elements.forEach((el) => {
    if (el.type === 'visual') visualShapes[el.id] = { imageUrl: null };
  });

  layoutPreview.innerHTML = '';
  const container = document.createElement('div');
  container.className = `layout-container ${currentLayoutDef.layout}`;

  currentLayoutDef.elements.forEach((element, index) => {
    container.appendChild(createElementNode(element, index));
  });

  layoutPreview.appendChild(container);
}

function createElementNode(element, index) {
  const el = document.createElement('div');
  el.className = `layout-element ${element.type}-element ${element.styles || ''}`;
  el.style.cssText = `position:absolute;left:${element.position.x}%;top:${element.position.y}%;width:${element.position.width}%;height:${element.position.height}%;`;

  if (element.type === 'text') {
    el.textContent = element.content;
  } else if (element.type === 'logo') {
    const img = document.createElement('img');
    img.src = element.content;
    img.alt = 'Logo';
    img.className = 'logo-image';
    el.appendChild(img);
  } else if (element.type === 'visual') {
    el.classList.add('visual-element');
    el.addEventListener('click', () => handleShapeClick(element));
    const visualData = visualShapes[element.id];
    if (visualData?.imageUrl) {
      el.innerHTML = `
        <div class="visual-image-container">
          <img src="${visualData.imageUrl}" alt="Extracted Image" class="visual-image" />
          <div class="edit-overlay">
            <button class="edit-button" data-url="${visualData.imageUrl}">Edit Design</button>
          </div>
        </div>`;
      el.querySelector('.edit-button').addEventListener('click', (e) => {
        e.stopPropagation();
        handleEditImage(visualData.imageUrl);
      });
    } else {
      el.innerHTML = `<div class="visual-placeholder"><p>${element.placeholder}</p></div>`;
    }
  }
  return el;
}

function handleShapeClick(element) {
  selectedVisualId = element.id;
  const params = {
    prompt: element.prompt,
    dimension: { width: element.position.width * 10, height: element.position.height * 10 },
  };
  if (!isAIStudioOpen) showAIStudio();
  window.SIVI?.setOptions(Object.assign({}, defaultOptions, params));
}

function showAIStudio() {
  isAIStudioOpen = true;
  controlPanel.style.display = 'none';
  visualPanel.style.display = 'flex';
  const options = Object.assign({}, defaultOptions);
  if (selectedVisualId && currentLayoutDef) {
    const element = currentLayoutDef.elements.find((el) => el.id === selectedVisualId);
    if (element) {
      options.prompt = element.prompt;
      options.dimension = { width: element.position.width * 10, height: element.position.height * 10 };
    }
  }
  window.SIVI?.show(options, IFRAME_CONTAINER_ID);
}

function hideAIStudio() {
  window.SIVI?.hide();
  isAIStudioOpen = false;
  controlPanel.style.display = 'flex';
  visualPanel.style.display = 'none';
}

function openDesignVariantEditor(params) {
  window.SIVI?.openDesignVariantEditor(params);
}

function handleEditImage(imageUrl) {
  const mapping = imageVariantMap[imageUrl];
  if (mapping?.variantId) openDesignVariantEditor(mapping);
}

function updateVisualShape(visualId, imageUrl, variantId, variantType) {
  visualShapes[visualId] = { imageUrl, variantId, variantType };
  imageVariantMap[imageUrl] = { variantId, variantType };
  renderLayout(currentLayoutId);
}

aiStudioButton.addEventListener('click', showAIStudio);
backButton.addEventListener('click', hideAIStudio);

function initSiviEvents() {
  if (!window.SIVI) { setTimeout(initSiviEvents, 500); return; }
  window.SIVI.events((event, responseCallback) => {
    if (event.type === 'SIVI_WIDGET_EVENT_DESIGN_VARIANT_SELECTED') {
      if (selectedVisualId) {
        const URL = event.data.variantImageUrl + '?timestamp=' + Date.now();
        updateVisualShape(selectedVisualId, URL, event.data.variantId, event.data.variantType);
        celebrate();
      }
      responseCallback('done');
    }
  });
}

function celebrate() {
  const colors = ['#5662EC', '#EF9AB2', '#FFD700', '#FF6B6B', '#4ECDC4'];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.style.cssText = `position:fixed;left:${Math.random() * 100}vw;top:-10px;width:8px;height:8px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:50%;z-index:9999;transition:top ${1 + Math.random()}s ease-out,opacity ${1 + Math.random()}s ease-out;`;
    document.body.appendChild(p);
    setTimeout(() => { p.style.top = '110vh'; p.style.opacity = '0'; }, 50);
    setTimeout(() => p.remove(), 2000);
  }
}

// Tabs
tabDesign.addEventListener('click', () => {
  tabDesign.classList.add('active');
  tabUsers.classList.remove('active');
  designView.style.display = 'flex';
  usersView.style.display = 'none';
});

tabUsers.addEventListener('click', () => {
  tabUsers.classList.add('active');
  tabDesign.classList.remove('active');
  usersView.style.display = 'flex';
  designView.style.display = 'none';
});

// API helpers
async function apiPost(path, body) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || `HTTP ${res.status}` };
    }
    return data;
  } catch (err) {
    return { error: err.message || 'Network error' };
  }
}

function setButtonLoading(buttonId, isLoading) {
  const btn = document.getElementById(buttonId);
  const text = btn.querySelector('.btn-text');
  const spinner = btn.querySelector('.btn-spinner');
  btn.disabled = isLoading;
  text.style.display = isLoading ? 'none' : 'inline';
  spinner.style.display = isLoading ? 'inline-flex' : 'none';
}

function showResponse(id, data) {
  const el = document.getElementById(id);
  el.textContent = JSON.stringify(data, null, 2);
  el.style.display = 'block';
  el.classList.remove('success', 'error');
  if (data && data.error) {
    el.classList.add('error');
  } else {
    el.classList.add('success');
  }
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const abstractUserId = document.getElementById('login-user-id').value.trim();
  const planId = document.getElementById('login-plan-id').value.trim();
  const brandName = document.getElementById('login-brand-name').value.trim();
  if (!abstractUserId) return;
  setButtonLoading('login-submit', true);
  const payload = { abstractUserId };
  if (planId) payload.planId = planId;
  if (brandName) payload.brand = { brandName };
  const data = await apiPost('/login-sivi', payload);
  showResponse('login-response', data);
  setButtonLoading('login-submit', false);
});

document.getElementById('delete-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const abstractUserId = document.getElementById('delete-user-id').value.trim();
  if (!abstractUserId) return;
  setButtonLoading('delete-submit', true);
  const data = await apiPost('/delete-sivi-user', { abstractUserId });
  showResponse('delete-response', data);
  setButtonLoading('delete-submit', false);
});

document.getElementById('credit-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const abstractUserId = document.getElementById('credit-user-id').value.trim();
  const creditLimit = document.getElementById('credit-limit').value;
  if (!abstractUserId || creditLimit === '') return;
  setButtonLoading('credit-submit', true);
  const data = await apiPost('/set-credit-limit', { abstractUserId, creditLimit: Number(creditLimit) });
  showResponse('credit-response', data);
  setButtonLoading('credit-submit', false);
});

// Start
loadLayouts();
initSiviEvents();
