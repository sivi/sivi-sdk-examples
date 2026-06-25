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

const appleTheme = {
  global: {
    colors: {
      focus: 'none', brand: '#0071e3', secondary1: '#1d1d1f', secondary2: '#6e6e73',
      light: '#FFFFFF', dark: '#1d1d1f', critical: '#ff3b30', warning: '#ff9500',
      darkgreen: '#34c759', darkblue: '#0071e3', limeblue: '#0071e34D',
      positive: '#34c75926', lowcritical: '#ff3b304D', negative: '#ff3b3026',
      regent_gray: '#6e6e73',
      color1: { light: '#FFFFFF', dark: '#1d1d1f' }, color2: { light: '#F5F5F7', dark: '#2C2C2E' },
      color3: { light: '#E8E8ED', dark: '#3A3A3C' }, color4: { light: '#D2D2D7', dark: '#6E6E73' },
      color5: { light: '#86868B', dark: '#AEAEB2' }, color6: { light: '#1d1d1f', dark: '#F5F5F7' },
      gradient1: 'linear-gradient(135deg, #1d1d1f 0%, #3A3A3C 100%)',
      gradient2: 'linear-gradient(135deg, #6e6e73 0%, #1d1d1f 100%)',
      'mild-backdrop': 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
    },
    breakpoints: { small: { value: 600 }, medium: { value: 834 }, ipad: { value: 1024 } },
    elevation: { light: '0 0 0 1px #d2d2d7', heavy: '0 12px 32px rgba(0, 0, 0, 0.08)' },
    borderSize: { none: '0px', xs: '1px', small: '2px', medium: '4px', large: '8px', xl: '12px' },
    edgeSize: {
      'round-small': '8px', 'round-medium': '12px', 'round-large': '18px', 'round-full': '980px',
      hair: '1px', 'space-0': '0px', 'space-25': '2px', 'space-50': '4px', 'space-75': '6px',
      'space-100': '8px', 'space-120': '10px', 'space-150': '12px', 'space-200': '16px',
      'space-250': '20px', 'space-300': '24px', 'space-400': '32px', 'space-500': '40px',
      'space-600': '48px', 'space-750': '64px', 'space-1000': '80px', 'space-1250': '100px',
    },
    size: {
      xs: '160px', small: '240px', medium: '320px', large: '360px', xl: '420px',
      '2xl': '480px', '3xl': '600px', '4xl': '756px', '5xl': '920px',
      full: '100%', half: '50%', hair: '1px',
    },
  },
  text: { font: { family: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif' }, ...textStyles },
  heading: {
    margin: '0',
    level: {
      1: { font: { family: 'SF Pro Display, -apple-system, sans-serif' }, ...textStyles },
      2: { font: { family: 'SF Pro Display, -apple-system, sans-serif' }, ...textStyles },
      3: { font: { family: 'SF Pro Display, -apple-system, sans-serif' }, ...textStyles },
      4: { font: { family: 'SF Pro Display, -apple-system, sans-serif' }, ...textStyles },
      5: { font: { family: 'SF Pro Display, -apple-system, sans-serif' }, ...textStyles },
      6: { font: { family: 'SF Pro Display, -apple-system, sans-serif' }, ...textStyles },
      7: { font: { family: 'SF Pro Display, -apple-system, sans-serif' }, ...textStyles },
      8: { font: { family: 'SF Pro Display, -apple-system, sans-serif' }, ...textStyles },
    },
  },
  button: { default: {} },
  textArea: { extend: () => `font-weight: 400;` },
  anchor: { extend: () => `font-weight: 400;` },
}

export default appleTheme
