const textStyles = {
  xpara: { size: '12px', height: '18px' }, smallpara: { size: '14px', height: '22px' },
  mediumPara: { size: '16px', height: '24px' }, xs: { size: '9px', height: '12px' },
  '2xs': { size: '10px', height: '14px' }, '3xs': { size: '11px', height: '16px' },
  '4xs': { size: '12px', height: '16px' }, '5xs': { size: '13px', height: '18px' },
  small: { size: '14px', height: '20px' }, medium: { size: '16px', height: '22px' },
  large: { size: '18px', height: '26px' }, '2l': { size: '20px', height: '28px' },
  '3l': { size: '24px', height: '34px' }, xl: { size: '30px', height: '42px' },
  '2xl': { size: '36px', height: '50px' }, '3xl': { size: '48px', height: '68px' },
}

const claudeTheme = {
  global: {
    colors: {
      focus: 'none', brand: '#D97757', secondary1: '#C96442', secondary2: '#E8A87C',
      light: '#FFFFFF', dark: '#1A1815', critical: '#D85757', warning: '#E8B339',
      darkgreen: '#5A8A5A', darkblue: '#4A6FA5', limeblue: '#E8A87C4D',
      positive: '#5A8A5A26', lowcritical: '#D857574D', negative: '#D8575726',
      regent_gray: '#8B8275',
      color1: { light: '#FFFFFF', dark: '#1A1815' }, color2: { light: '#FAF9F7', dark: '#13110E' },
      color3: { light: '#F0EDE8', dark: '#252220' }, color4: { light: '#D4CFC7', dark: '#4A453E' },
      color5: { light: '#8B8275', dark: '#A89F92' }, color6: { light: '#D97757', dark: '#FFFFFF' },
      color3Alpha: 'rgba(240, 237, 232, 0.24)',
      gradient1: 'linear-gradient(93deg, #D97757 -2.01%, #C96442 107.46%)',
      gradient2: 'linear-gradient(93deg, #5A8A5A -2.01%, #D97757 44.52%, #C96442 107.46%)',
      'mild-backdrop': 'linear-gradient(135deg, #FAF9F7 6.87%, #F0EBE4 96.9%)',
    },
    breakpoints: { small: { value: 600 }, medium: { value: 768 }, ipad: { value: 1024 } },
    elevation: {
      light: '0px 1px 3px 0px rgba(0,0,0,0.08), 0px 2px 8px 0px rgba(0,0,0,0.06)',
      heavy: '0px 4px 12px 0px rgba(0,0,0,0.12), 0px 8px 24px 0px rgba(0,0,0,0.10)',
    },
    borderSize: { none: '0px', xs: '1px', small: '2px', medium: '4px', large: '6px', xl: '10px' },
    edgeSize: {
      'round-small': '4px', 'round-medium': '6px', 'round-large': '10px', 'round-full': '100px',
      hair: '1px', 'space-0': '0px', 'space-25': '2px', 'space-50': '4px', 'space-75': '6px',
      'space-100': '8px', 'space-120': '10px', 'space-150': '12px', 'space-200': '16px',
      'space-250': '20px', 'space-300': '24px', 'space-400': '32px', 'space-500': '40px',
      'space-600': '48px', 'space-750': '60px', 'space-1000': '80px', 'space-1250': '100px',
    },
    size: {
      xs: '160px', small: '240px', medium: '320px', large: '360px', xl: '420px',
      '2xl': '480px', '3xl': '600px', '4xl': '756px', '5xl': '920px',
      full: '100%', half: '50%', hair: '1px',
    },
  },
  text: { font: { family: 'Inter, -apple-system, sans-serif' }, ...textStyles },
  heading: {
    margin: '0',
    level: {
      1: { font: { family: 'Inter, -apple-system, sans-serif' }, ...textStyles },
      2: { font: { family: 'Inter, -apple-system, sans-serif' }, ...textStyles },
      3: { font: { family: 'Inter, -apple-system, sans-serif' }, ...textStyles },
      4: { font: { family: 'Inter, -apple-system, sans-serif' }, ...textStyles },
      5: { font: { family: 'Inter, -apple-system, sans-serif' }, ...textStyles },
      6: { font: { family: 'Inter, -apple-system, sans-serif' }, ...textStyles },
      7: { font: { family: 'Inter, -apple-system, sans-serif' }, ...textStyles },
      8: { font: { family: 'Inter, -apple-system, sans-serif' }, ...textStyles },
    },
  },
  button: { default: {} },
  textArea: { extend: () => `font-weight: 400;` },
  anchor: { extend: () => `font-weight: 400;` },
}

export default claudeTheme
