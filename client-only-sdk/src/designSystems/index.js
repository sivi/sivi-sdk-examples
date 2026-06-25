import siviTheme from './siviTheme'
import appleTheme from './appleTheme'
import amazonTheme from './amazonTheme'
import netflixTheme from './netflixTheme'
import spotifyTheme from './spotifyTheme'
import claudeTheme from './claudeTheme'

export const designSystemOptions = [
  { id: 'sivi', label: 'Sivi (Default)', theme: siviTheme },
  { id: 'apple', label: 'Apple', theme: appleTheme },
  { id: 'amazon', label: 'Amazon', theme: amazonTheme },
  { id: 'netflix', label: 'Netflix', theme: netflixTheme },
  { id: 'spotify', label: 'Spotify', theme: spotifyTheme },
  { id: 'claude', label: 'Claude', theme: claudeTheme },
]

export { siviTheme, appleTheme, amazonTheme, netflixTheme, spotifyTheme, claudeTheme }
