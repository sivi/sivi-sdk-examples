const textStyles = {
  xpara: { size: '12px', height: '18px' }, smallpara: { size: '14px', height: '22px' },
  mediumPara: { size: '16px', height: '24px' }, xs: { size: '9px', height: '12px' },
  '2xs': { size: '10px', height: '14px' }, '3xs': { size: '11px', height: '16px' },
  '4xs': { size: '12px', height: '16px' }, '5xs': { size: '13px', height: '18px' },
  small: { size: '14px', height: '20px' }, medium: { size: '16px', height: '22px' },
  large: { size: '18px', height: '26px' }, '2l': { size: '20px', height: '28px' },
  '3l': { size: '24px', height: '34px' }, xl: { size: '30px', height: '42px' },
  '2xl': { size: '36px', height: '50px' }, '3xl': { size: '48px', height: '68px' },
};

const makeTheme = (colors, fonts, breakpoints, radii, spacing) => ({
  global: {
    colors,
    breakpoints,
    elevation: { light: '0px 2px 8px rgba(0,0,0,0.12)', heavy: '0px 8px 24px rgba(0,0,0,0.25)' },
    borderSize: { none: '0px', xs: '1px', small: '2px', medium: '4px', large: '8px', xl: '12px' },
    edgeSize: {
      'round-small': radii.small, 'round-medium': radii.medium, 'round-large': radii.large, 'round-full': '100px',
      hair: '1px', 'space-0': '0px', 'space-25': '2px', 'space-50': '4px', 'space-75': '6px',
      'space-100': '8px', 'space-120': '10px', 'space-150': '12px', 'space-200': '16px',
      'space-250': '20px', 'space-300': spacing, 'space-400': '32px', 'space-500': '40px',
      'space-600': '50px', 'space-750': '60px', 'space-1000': '80px', 'space-1250': '100px',
    },
    size: {
      xs: '160px', small: '240px', medium: '320px', large: '360px', xl: '420px',
      '2xl': '480px', '3xl': '600px', '4xl': '756px', '5xl': '920px',
      full: '100%', half: '50%', hair: '1px',
    },
  },
  text: { font: { family: fonts.text }, ...textStyles },
  heading: {
    margin: '0',
    level: {
      1: { font: { family: fonts.heading }, ...textStyles },
      2: { font: { family: fonts.heading }, ...textStyles },
      3: { font: { family: fonts.heading }, ...textStyles },
      4: { font: { family: fonts.heading }, ...textStyles },
      5: { font: { family: fonts.heading }, ...textStyles },
      6: { font: { family: fonts.heading }, ...textStyles },
      7: { font: { family: fonts.heading }, ...textStyles },
      8: { font: { family: fonts.heading }, ...textStyles },
    },
  },
  button: { default: {} },
  textArea: { extend: () => 'font-weight: 400;' },
  anchor: { extend: () => 'font-weight: 400;' },
});

const siviTheme = makeTheme(
  {
    focus: 'none', brand: '#229EF9', secondary1: '#9C4DFE', secondary2: '#0DEAF5',
    light: '#FFFFFF', dark: '#000000', critical: '#FE4D4D', warning: '#F9CA22',
    darkgreen: '#0EC2CB', darkblue: '#1882D0', limeblue: '#0DEAF54D',
    positive: '#0EC2CB26', lowcritical: '#FE4D4D4D', negative: '#FE4D4D26',
    regent_gray: '#8A78A0',
    color1: { light: '#FFFFFF', dark: '#200C39' }, color2: { light: '#FBF8FF', dark: '#0C021A' },
    color3: { light: '#F1E6FF', dark: '#320C64' }, color4: { light: '#C7ACEB', dark: '#9E68E2' },
    color5: { light: '#705393', dark: '#AB84DE' }, color6: { light: '#270750', dark: '#FFFFFF' },
    gradient1: 'linear-gradient(93deg, #229EF9 -2.01%, #9C4DFE 107.46%)',
    gradient2: 'linear-gradient(93deg, #0EC2CB -2.01%, #229EF9 44.52%, #9C4DFE 107.46%)',
    'mild-backdrop': 'linear-gradient(135deg, #FFF 6.87%, #F1E6FF 96.9%)',
  },
  { text: 'Inter', heading: 'Inter' },
  { small: { value: 600 }, medium: { value: 800 }, ipad: { value: 900 } },
  { small: '3px', medium: '5px', large: '8px' },
  '24px'
);

const appleTheme = makeTheme(
  {
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
  { text: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif', heading: 'SF Pro Display, -apple-system, sans-serif' },
  { small: { value: 600 }, medium: { value: 834 }, ipad: { value: 1024 } },
  { small: '8px', medium: '12px', large: '18px' },
  '24px'
);

const amazonTheme = makeTheme(
  {
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
  { text: 'Amazon Ember, Helvetica Neue, sans-serif', heading: 'Amazon Ember Display, Helvetica Neue, sans-serif' },
  { small: { value: 600 }, medium: { value: 900 }, ipad: { value: 1200 } },
  { small: '2px', medium: '4px', large: '8px' },
  '24px'
);

const netflixTheme = makeTheme(
  {
    focus: 'none', brand: '#E50914', secondary1: '#221F1F', secondary2: '#F5F5F1',
    light: '#FFFFFF', dark: '#141414', critical: '#E50914', warning: '#FFB400',
    darkgreen: '#46D369', darkblue: '#0071EB', limeblue: '#46D3694D',
    positive: '#46D36926', lowcritical: '#E509144D', negative: '#E5091426',
    regent_gray: '#808080',
    color1: { light: '#FFFFFF', dark: '#141414' }, color2: { light: '#F5F5F1', dark: '#0A0A0A' },
    color3: { light: '#E6E6E0', dark: '#1F1F1F' }, color4: { light: '#BFBFB8', dark: '#404040' },
    color5: { light: '#808080', dark: '#A0A0A0' }, color6: { light: '#E50914', dark: '#FFFFFF' },
    gradient1: 'linear-gradient(93deg, #E50914 -2.01%, #221F1F 107.46%)',
    gradient2: 'linear-gradient(93deg, #46D369 -2.01%, #E50914 44.52%, #221F1F 107.46%)',
    'mild-backdrop': 'linear-gradient(135deg, #221F1F 6.87%, #221F1F 96.9%)',
  },
  { text: 'Netflix Sans, Helvetica Neue, sans-serif', heading: 'Netflix Sans, Helvetica Neue, sans-serif' },
  { small: { value: 600 }, medium: { value: 768 }, ipad: { value: 1024 } },
  { small: '2px', medium: '4px', large: '6px' },
  '24px'
);

const spotifyTheme = makeTheme(
  'spotify',
  {
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
  { text: 'Spotify Circular, Helvetica Neue, sans-serif', heading: 'Spotify Circular, Helvetica Neue, sans-serif' },
  { small: { value: 600 }, medium: { value: 768 }, ipad: { value: 1024 } },
  { small: '4px', medium: '6px', large: '10px' },
  '28px'
);

const claudeTheme = makeTheme(
  {
    focus: 'none', brand: '#D97757', secondary1: '#C96442', secondary2: '#E8A87C',
    light: '#FFFFFF', dark: '#1A1815', critical: '#D85757', warning: '#E8B339',
    darkgreen: '#5A8A5A', darkblue: '#4A6FA5', limeblue: '#E8A87C4D',
    positive: '#5A8A5A26', lowcritical: '#D857574D', negative: '#D8575726',
    regent_gray: '#8B8275',
    color1: { light: '#FFFFFF', dark: '#1A1815' }, color2: { light: '#FAF9F7', dark: '#13110E' },
    color3: { light: '#F0EDE8', dark: '#252220' }, color4: { light: '#D4CFC7', dark: '#4A453E' },
    color5: { light: '#8B8275', dark: '#A89F92' }, color6: { light: '#D97757', dark: '#FFFFFF' },
    gradient1: 'linear-gradient(93deg, #D97757 -2.01%, #C96442 107.46%)',
    gradient2: 'linear-gradient(93deg, #5A8A5A -2.01%, #D97757 44.52%, #C96442 107.46%)',
    'mild-backdrop': 'linear-gradient(135deg, #FAF9F7 6.87%, #F0EBE4 96.9%)',
  },
  { text: 'Inter, -apple-system, sans-serif', heading: 'Inter, -apple-system, sans-serif' },
  { small: { value: 600 }, medium: { value: 768 }, ipad: { value: 1024 } },
  { small: '4px', medium: '6px', large: '10px' },
  '24px'
);

window.designSystemOptions = [
  { id: 'sivi', label: 'Sivi (Default)', theme: siviTheme },
  { id: 'apple', label: 'Apple', theme: appleTheme },
  { id: 'amazon', label: 'Amazon', theme: amazonTheme },
  { id: 'netflix', label: 'Netflix', theme: netflixTheme },
  { id: 'spotify', label: 'Spotify', theme: spotifyTheme },
  { id: 'claude', label: 'Claude', theme: claudeTheme },
];

window.getDefaultDesignSystem = () => siviTheme;
