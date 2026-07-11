/* global SIVI */

const IFRAME_CONTAINER_ID = 'sivi-container';

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
let paramsRef = null;

// DOM Elements
const layoutSelect = document.getElementById('layoutSelect');
const layoutPreview = document.getElementById('layout-preview');
const controlPanel = document.getElementById('control-panel');
const visualPanel = document.getElementById('visual-panel');
const aiStudioButton = document.getElementById('ai-studio-button');
const backButton = document.getElementById('back-button');
const designSystemSelect = document.getElementById('designSystemSelect');
const dsJsonEditor = document.getElementById('ds-json-editor');
const dsFormatBtn = document.getElementById('ds-format-btn');
const dsErrorMsg = document.getElementById('ds-error-msg');

let currentDesignSystem = null;

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

function populateDesignSystemSelector() {
  if (!window.designSystemOptions || !Array.isArray(window.designSystemOptions)) return;
  designSystemSelect.innerHTML = '';
  window.designSystemOptions.forEach((option) => {
    const el = document.createElement('option');
    el.value = option.id;
    el.textContent = option.label;
    designSystemSelect.appendChild(el);
  });
  designSystemSelect.value = 'resetToDefault';
  updateDesignSystem('resetToDefault');
}

function updateDesignSystem(id) {
  const option = window.designSystemOptions?.find((opt) => opt.id === id);
  if (!option) return;
  if (option.resetToDefault) {
    currentDesignSystem = { resetToDefault: true };
    dsJsonEditor.value = '';
  } else {
    currentDesignSystem = option.theme;
    dsJsonEditor.value = JSON.stringify(currentDesignSystem, null, 2);
  }
  dsJsonEditor.classList.remove('ds-json-error');
  dsErrorMsg.textContent = '';
  applyDesignSystemToSDK();
}

function applyDesignSystemToSDK() {
  if (!isAIStudioOpen || !currentDesignSystem) return;
  const options = Object.assign({}, defaultOptions, paramsRef || {});
  if (!currentDesignSystem.resetToDefault) {
    options.designSystem = currentDesignSystem;
  }
  window.SIVI?.setOptions(options);
}

function handleDesignSystemChange(e) {
  updateDesignSystem(e.target.value);
}

function parseDesignSystemJSON() {
  try {
    const parsed = JSON.parse(dsJsonEditor.value);
    currentDesignSystem = parsed;
    dsJsonEditor.classList.remove('ds-json-error');
    dsErrorMsg.textContent = '';
    applyDesignSystemToSDK();
  } catch (error) {
    dsJsonEditor.classList.add('ds-json-error');
    dsErrorMsg.textContent = 'Invalid JSON: ' + error.message;
  }
}

function formatDesignSystemJSON() {
  try {
    const parsed = JSON.parse(dsJsonEditor.value);
    dsJsonEditor.value = JSON.stringify(parsed, null, 2);
    dsJsonEditor.classList.remove('ds-json-error');
    dsErrorMsg.textContent = '';
  } catch (error) {
    dsJsonEditor.classList.add('ds-json-error');
    dsErrorMsg.textContent = 'Cannot format invalid JSON: ' + error.message;
  }
}

let designSystemDebounceTimer = null;
function onDesignSystemEditorInput() {
  if (designSystemDebounceTimer) clearTimeout(designSystemDebounceTimer);
  designSystemDebounceTimer = setTimeout(parseDesignSystemJSON, 600);
}

designSystemSelect.addEventListener('change', handleDesignSystemChange);
dsJsonEditor.addEventListener('input', onDesignSystemEditorInput);
dsJsonEditor.addEventListener('blur', formatDesignSystemJSON);
dsFormatBtn.addEventListener('click', formatDesignSystemJSON);

layoutSelect.addEventListener('change', (e) => {
  currentLayoutId = parseInt(e.target.value, 10);
  renderLayout(currentLayoutId);
});

function renderLayout(layoutId) {
  currentLayoutDef = layouts[layoutId];
  if (!currentLayoutDef) return;

  // Reset visual shapes
  visualShapes = {};
  currentLayoutDef.elements.forEach((el) => {
    if (el.type === 'visual') {
      visualShapes[el.id] = { imageUrl: null };
    }
  });

  layoutPreview.innerHTML = '';
  const container = document.createElement('div');
  container.className = `layout-container ${currentLayoutDef.layout}`;

  currentLayoutDef.elements.forEach((element, index) => {
    const elNode = createElementNode(element, index);
    container.appendChild(elNode);
  });

  layoutPreview.appendChild(container);
}

function createElementNode(element, index) {
  const el = document.createElement('div');
  el.className = `layout-element ${element.type}-element ${element.styles || ''}`;
  el.style.position = 'absolute';
  el.style.left = `${element.position.x}%`;
  el.style.top = `${element.position.y}%`;
  el.style.width = `${element.position.width}%`;
  el.style.height = `${element.position.height}%`;

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
    if (visualData && visualData.imageUrl) {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'visual-image-container';

      const img = document.createElement('img');
      img.src = visualData.imageUrl;
      img.alt = 'Extracted Image';
      img.className = 'visual-image';
      imgContainer.appendChild(img);

      const overlay = document.createElement('div');
      overlay.className = 'edit-overlay';

      const editBtn = document.createElement('button');
      editBtn.className = 'edit-button';
      editBtn.textContent = 'Edit Design';
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleEditImage(visualData.imageUrl);
      });
      overlay.appendChild(editBtn);
      imgContainer.appendChild(overlay);

      el.appendChild(imgContainer);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'visual-placeholder';
      const p = document.createElement('p');
      p.textContent = element.placeholder;
      placeholder.appendChild(p);
      el.appendChild(placeholder);
    }
  }

  return el;
}

function handleShapeClick(element) {
  console.log('handleShapeClick:: current element', element);
  selectedVisualId = element.id;

  paramsRef = {
    prompt: element.prompt,
    dimension: {
      width: element.position.width * 10,
      height: element.position.height * 10,
    },
  };

  if (!isAIStudioOpen) {
    showAIStudio();
  } else {
    const options = Object.assign({}, defaultOptions, paramsRef);
    if (currentDesignSystem && !currentDesignSystem.resetToDefault) {
      options.designSystem = currentDesignSystem;
    }
    window.SIVI?.setOptions(options);
  }
}

function showAIStudio() {
  isAIStudioOpen = true;
  controlPanel.style.display = 'none';
  visualPanel.style.display = 'flex';

  const options = Object.assign({}, defaultOptions, paramsRef);
  if (currentDesignSystem && !currentDesignSystem.resetToDefault) {
    options.designSystem = currentDesignSystem;
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
  if (mapping && mapping.variantId) {
    openDesignVariantEditor({ variantId: mapping.variantId, variantType: mapping.variantType });
  }
}

function updateVisualShape(visualId, imageUrl, variantId, variantType) {
  visualShapes[visualId] = { imageUrl, variantId, variantType };
  imageVariantMap[imageUrl] = { variantId, variantType };
  renderLayout(currentLayoutId);
}

// Event handlers
aiStudioButton.addEventListener('click', showAIStudio);
backButton.addEventListener('click', hideAIStudio);

// Initialize SIVI events
function initSiviEvents() {
  if (!window.SIVI) {
    setTimeout(initSiviEvents, 500);
    return;
  }

  window.SIVI.events((event, responseCallback) => {
    if (event.type === 'SIVI_WIDGET_EVENT_DESIGN_VARIANT_SELECTED') {
      if (selectedVisualId) {
        const URL = event.data.variantImageUrl + '?timestamp=' + Date.now();
        const variantId = event.data.variantId;
        const variantType = event.data.variantType;

        updateVisualShape(selectedVisualId, URL, variantId, variantType);

        // Simple confetti effect using canvas
        celebrate();
      } else {
        console.error('No selected visual, please select a visual!');
      }
      responseCallback('done');
    }
  });
}

function celebrate() {
  if (typeof window.confetti === 'function') {
    window.confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#5662EC', '#8b5cf6', '#22c55e', '#ef4444', '#f59e0b', '#06b6d4'],
      disableForReducedMotion: true,
    });
    return;
  }
  // Simple CSS-based confetti fallback
  const colors = ['#5662EC', '#EF9AB2', '#FFD700', '#FF6B6B', '#4ECDC4'];
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '-10px';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.zIndex = '9999';
    particle.style.transition = `top ${1 + Math.random()}s ease-out, opacity ${1 + Math.random()}s ease-out`;
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.style.top = '110vh';
      particle.style.opacity = '0';
    }, 50);

    setTimeout(() => {
      particle.remove();
    }, 2000);
  }
}

// Start
loadLayouts();
initSiviEvents();
populateDesignSystemSelector();

