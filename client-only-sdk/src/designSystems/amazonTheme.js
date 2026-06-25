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

const amazonTheme = {
  global: {
    colors: {
      focus: 'none', brand: '#FF9900', secondary1: '#146EB4', secondary2: '#00A8E1',
      light: '#FFFFFF', dark: '#131A22', critical: '#B12704', warning: '#F0C808',
      darkgreen: '#067D62', darkblue: '#146EB4', limeblue: '#00A8E14D',
      positive: '#067D6226', lowcritical: '#B127044D', negative: '#B1270426',
      regent_gray: '#565959',
      color1: { light: '#FFFFFF', dark: '#131A22' }, color2: { light: '#F7F7F7', dark: '#0F1419' },
      color3: { light: '#EAEDED', dark: '#232F3E' }, color4: { light: '#CCCEDB', dark: '#3B4A5B' },
      color5: { light: '#565959', dark: '#8D959F' }, color6: { light: '#FF9900', dark: '#FFFFFF' },
      gradient1: 'linear-gradient(93deg, #FF9900 -2.01%, #146EB4 107.46%)',
      gradient2: 'linear-gradient(93deg, #067D62 -2.01%, #FF9900 44.52%, #146EB4 107.46%)',
      'mild-backdrop': 'linear-gradient(135deg, #FFFFFF 6.87%, #FFF3E5 96.9%)',
    },
    breakpoints: { small: { value: 600 }, medium: { value: 900 }, ipad: { value: 1200 } },
    elevation: { light: '0px 2px 5px 0px rgba(0,0,0,0.12)', heavy: '0px 5px 15px 0px rgba(0,0,0,0.25)' },
    borderSize: { none: '0px', xs: '1px', small: '2px', medium: '4px', large: '6px', xl: '10px' },
    edgeSize: {
      'round-small': '2px', 'round-medium': '4px', 'round-large': '8px', 'round-full': '100px',
      hair: '1px', 'space-0': '0px', 'space-25': '2px', 'space-50': '4px', 'space-75': '6px',
      'space-100': '8px', 'space-120': '10px', 'space-150': '12px', 'space-200': '16px',
      'space-250': '20px', 'space-300': '24px', 'space-400': '30px', 'space-500': '40px',
      'space-600': '50px', 'space-750': '60px', 'space-1000': '80px', 'space-1250': '100px',
    },
    size: {
      xs: '160px', small: '240px', medium: '320px', large: '360px', xl: '420px',
      '2xl': '480px', '3xl': '600px', '4xl': '756px', '5xl': '920px',
      full: '100%', half: '50%', hair: '1px',
    },
  },
  text: { font: { family: 'Amazon Ember, Helvetica Neue, sans-serif' }, ...textStyles },
  heading: {
    margin: '0',
    level: {
      1: { font: { family: 'Amazon Ember Display, Helvetica Neue, sans-serif' }, ...textStyles },
      2: { font: { family: 'Amazon Ember Display, Helvetica Neue, sans-serif' }, ...textStyles },
      3: { font: { family: 'Amazon Ember Display, Helvetica Neue, sans-serif' }, ...textStyles },
      4: { font: { family: 'Amazon Ember Display, Helvetica Neue, sans-serif' }, ...textStyles },
      5: { font: { family: 'Amazon Ember Display, Helvetica Neue, sans-serif' }, ...textStyles },
      6: { font: { family: 'Amazon Ember Display, Helvetica Neue, sans-serif' }, ...textStyles },
      7: { font: { family: 'Amazon Ember Display, Helvetica Neue, sans-serif' }, ...textStyles },
      8: { font: { family: 'Amazon Ember Display, Helvetica Neue, sans-serif' }, ...textStyles },
    },
  },
  button: { default: {} },
  textArea: { extend: () => `font-weight: 400;` },
  anchor: { extend: () => `font-weight: 400;` },
}

export default amazonTheme
