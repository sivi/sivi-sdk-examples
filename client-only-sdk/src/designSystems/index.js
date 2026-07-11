import appleTheme from './appleTheme'
import amazonTheme from './amazonTheme'
import netflixTheme from './netflixTheme'
import spotifyTheme from './spotifyTheme'
import claudeTheme from './claudeTheme'

export const designSystemOptions = [
  { id: 'resetToDefault', label: 'Sivi (Default)', resetToDefault: true },
  { id: 'apple', label: 'Apple', theme: appleTheme },
  { id: 'amazon', label: 'Amazon', theme: amazonTheme },
  { id: 'netflix', label: 'Netflix', theme: netflixTheme },
  { id: 'spotify', label: 'Spotify', theme: spotifyTheme },
  { id: 'claude', label: 'Claude', theme: claudeTheme },
]

export { appleTheme, amazonTheme, netflixTheme, spotifyTheme, claudeTheme }
