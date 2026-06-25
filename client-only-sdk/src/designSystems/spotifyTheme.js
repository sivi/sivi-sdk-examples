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

const spotifyTheme = {
  global: {
    colors: {
      focus: 'none', brand: '#1DB954', secondary1: '#191414', secondary2: '#535353',
      light: '#FFFFFF', dark: '#121212', critical: '#E22134', warning: '#FFC233',
      darkgreen: '#1DB954', darkblue: '#0D72EA', limeblue: '#1DB9544D',
      positive: '#1DB95426', lowcritical: '#E221344D', negative: '#E2213426',
      regent_gray: '#A7A7A7',
      color1: { light: '#FFFFFF', dark: '#121212' }, color2: { light: '#F6F6F6', dark: '#0A0A0A' },
      color3: { light: '#E8E8E8', dark: '#1E1E1E' }, color4: { light: '#B3B3B3', dark: '#404040' },
      color5: { light: '#A7A7A7', dark: '#8D8D8D' }, color6: { light: '#1DB954', dark: '#FFFFFF' },
      gradient1: 'linear-gradient(93deg, #1DB954 -2.01%, #191414 107.46%)',
      gradient2: 'linear-gradient(93deg, #0D72EA -2.01%, #1DB954 44.52%, #191414 107.46%)',
      'mild-backdrop': 'linear-gradient(135deg, #FFFFFF 6.87%, #E8F8E8 96.9%)',
    },
    breakpoints: { small: { value: 600 }, medium: { value: 768 }, ipad: { value: 1024 } },
    elevation: { light: '0px 2px 8px 0px rgba(0,0,0,0.15)', heavy: '0px 8px 24px 0px rgba(0,0,0,0.35)' },
    borderSize: { none: '0px', xs: '1px', small: '2px', medium: '4px', large: '8px', xl: '12px' },
    edgeSize: {
      'round-small': '4px', 'round-medium': '6px', 'round-large': '10px', 'round-full': '100px',
      hair: '1px', 'space-0': '0px', 'space-25': '2px', 'space-50': '4px', 'space-75': '8px',
      'space-100': '12px', 'space-120': '14px', 'space-150': '16px', 'space-200': '20px',
      'space-250': '24px', 'space-300': '28px', 'space-400': '32px', 'space-500': '40px',
      'space-600': '48px', 'space-750': '56px', 'space-1000': '72px', 'space-1250': '88px',
    },
    size: {
      xs: '160px', small: '240px', medium: '320px', large: '360px', xl: '420px',
      '2xl': '480px', '3xl': '600px', '4xl': '756px', '5xl': '920px',
      full: '100%', half: '50%', hair: '1px',
    },
  },
  text: { font: { family: 'Spotify Circular, Helvetica Neue, sans-serif' }, ...textStyles },
  heading: {
    margin: '0',
    level: {
      1: { font: { family: 'Spotify Circular, Helvetica Neue, sans-serif' }, ...textStyles },
      2: { font: { family: 'Spotify Circular, Helvetica Neue, sans-serif' }, ...textStyles },
      3: { font: { family: 'Spotify Circular, Helvetica Neue, sans-serif' }, ...textStyles },
      4: { font: { family: 'Spotify Circular, Helvetica Neue, sans-serif' }, ...textStyles },
      5: { font: { family: 'Spotify Circular, Helvetica Neue, sans-serif' }, ...textStyles },
      6: { font: { family: 'Spotify Circular, Helvetica Neue, sans-serif' }, ...textStyles },
      7: { font: { family: 'Spotify Circular, Helvetica Neue, sans-serif' }, ...textStyles },
      8: { font: { family: 'Spotify Circular, Helvetica Neue, sans-serif' }, ...textStyles },
    },
  },
  button: { default: {} },
  textArea: { extend: () => `font-weight: 400;` },
  anchor: { extend: () => `font-weight: 700;` },
}

export default spotifyTheme
