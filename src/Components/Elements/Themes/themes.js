import { Colors, Shades } from '../Colors/colors'

export const Themes = {
  light: {
    body: { background: '#ffffff', color: '#313131', link: Colors['teal'] },
    nav: {
      color: '#b1b2b2',
      background: '#fdfdfd',
      border: '#e7e7e7',
      hover: {
        color: Colors['teal']
      }
    },
    card: {
      color: '#313131',
      background: '#ffffff',
      border: '#cccccc',
      shadow: '0 0 5px rgba(0, 0, 0, 0.25)'
    },
    menu: {
      color: '#313131',
      background: '#ffffff',
      hover: {
        color: '#ffffff',
        background: Colors['teal']
      }
    },
    chip: {
      color: Shades.pitch,
      delete: Shades.overcast,
      background: Shades.powder,
      border: Shades.silver,
      hover: {
        color: '#444',
        background: Shades.snow,
        border: Shades.silver,
        delete: '#000'
      },
      active: {
        delete: '#ffffff',
        color: '#ffffff',
        background: Colors.teal,
        border: Colors.emerald,
        hover: {
          background: Colors.emerald,
          delete: '#000'
        }
      }
    },
    article: { header: '#b1b2b2' },
    settings: {
      background: '#ffffff',
      color: '#444',
      inactive: '#ccc',
      border: '#ccc',
      hover: { background: '#ccc', color: '#000' }
    },
    modeButton: { color: '#313131', background: '#ffffff', border: '#cccccc' }
  }
}
