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

const netflixTheme = {
  global: {
    colors: {
      focus: 'none', brand: '#E50914', secondary1: '#221F1F', secondary2: '#F5F5F1',
      light: '#FFFFFF', dark: '#141414', critical: '#E50914', warning: '#FFB400',
      darkgreen: '#46D369', darkblue: '#0071EB', limeblue: '#46D3694D',
      positive: '#46D36926', lowcritical: '#E509144D', negative: '#E5091426',
      regent_gray: '#808080',
      color1: { light: '#FFFFFF', dark: '#141414' }, color2: { light: '#F5F5F1', dark: '#0A0A0A' },
      color3: { light: '#E6E6E0', dark: '#1F1F1F' }, color4: { light: '#BFBFB8', dark: '#404040' },
      color5: { light: '#808080', dark: '#A0A0A0' }, color6: { light: '#E50914', dark: '#FFFFFF' },
      color3Alpha: 'rgba(230, 230, 224, 0.24)',
      gradient1: 'linear-gradient(93deg, #E50914 -2.01%, #221F1F 107.46%)',
      gradient2: 'linear-gradient(93deg, #46D369 -2.01%, #E50914 44.52%, #221F1F 107.46%)',
      'mild-backdrop': 'linear-gradient(135deg, #221F1F 6.87%, #221F1F 96.9%)',
    },
    breakpoints: { small: { value: 600 }, medium: { value: 768 }, ipad: { value: 1024 } },
    elevation: { light: '0px 2px 8px 0px rgba(0,0,0,0.20)', heavy: '0px 8px 24px 0px rgba(0,0,0,0.40)' },
    borderSize: { none: '0px', xs: '1px', small: '2px', medium: '4px', large: '8px', xl: '12px' },
    edgeSize: {
      'round-small': '2px', 'round-medium': '4px', 'round-large': '6px', 'round-full': '100px',
      hair: '1px', 'space-0': '0px', 'space-25': '2px', 'space-50': '4px', 'space-75': '6px',
      'space-100': '8px', 'space-120': '10px', 'space-150': '12px', 'space-200': '16px',
      'space-250': '20px', 'space-300': '24px', 'space-400': '32px', 'space-500': '40px',
      'space-600': '48px', 'space-750': '56px', 'space-1000': '72px', 'space-1250': '88px',
    },
    size: {
      xs: '160px', small: '240px', medium: '320px', large: '360px', xl: '420px',
      '2xl': '480px', '3xl': '600px', '4xl': '756px', '5xl': '920px',
      full: '100%', half: '50%', hair: '1px',
    },
  },
  text: { font: { family: 'Netflix Sans, Helvetica Neue, sans-serif' }, ...textStyles },
  heading: {
    margin: '0',
    level: {
      1: { font: { family: 'Netflix Sans, Helvetica Neue, sans-serif' }, ...textStyles },
      2: { font: { family: 'Netflix Sans, Helvetica Neue, sans-serif' }, ...textStyles },
      3: { font: { family: 'Netflix Sans, Helvetica Neue, sans-serif' }, ...textStyles },
      4: { font: { family: 'Netflix Sans, Helvetica Neue, sans-serif' }, ...textStyles },
      5: { font: { family: 'Netflix Sans, Helvetica Neue, sans-serif' }, ...textStyles },
      6: { font: { family: 'Netflix Sans, Helvetica Neue, sans-serif' }, ...textStyles },
      7: { font: { family: 'Netflix Sans, Helvetica Neue, sans-serif' }, ...textStyles },
      8: { font: { family: 'Netflix Sans, Helvetica Neue, sans-serif' }, ...textStyles },
    },
  },
  button: { default: {} },
  textArea: { extend: () => `font-weight: 400;` },
  anchor: { extend: () => `font-weight: 500;` },
}

export default netflixTheme
