import { Colors } from '../Colors/colors'

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
      color: '#313131',
      background: '#e6e6e6',
      border: '#cccccc',
      hover: { color: '#444', background: '#d5d5d5', border: '#aaa' },
      active: {
        color: '#ffffff',
        background: Colors['teal'],
        border: Colors['emerald']
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
  },
  dark: {
    body: { background: '#1f1f1f', color: '#ccc', link: Colors['teal'] },
    nav: {
      color: '#313131',
      background: '#fdfdfd',
      border: '#e7e7e7',
      shadow: '0 0 5px rgba(0, 0, 0, 0.25)',
      hover: {
        color: Colors['teal']
      }
    },
    card: {
      color: '#ccc',
      background: '#292929',
      border: '#333333',
      shadow: '0 0 3px 1px rgba(0, 0, 0, 0.6)'
    },
    menu: {
      color: '#313131',
      background: '#292929',
      hover: {
        color: '#ffffff',
        background: Colors['teal']
      }
    },
    chip: {
      color: '#cccccc',
      background: '#909090',
      border: '#333333',
      hover: { color: '#cccccc', background: '#909090', border: '#333333' }
    },
    article: { header: '#909090' },
    settings: {
      background: '#ffffff',
      color: '#444',
      border: '#ccc',
      hover: { background: '#ccc', color: '#000' }
    },
    modeButton: {
      color: '#ccc',
      background: '#1f1f1f',
      border: '#333333'
    }
  },
  sepia: {
    body: { background: '#FBF0D9', color: '#5B4636', link: Colors['teal'] },
    nav: {
      color: '#313131',
      background: '#fdfdfd',
      border: '#e7e7e7',
      shadow: '0 0 5px rgba(0, 0, 0, 0.25)',
      hover: {
        color: Colors['teal']
      }
    },
    card: {
      color: '#5B4636',
      background: '#FEFDFB',
      border: '#E6DECF',
      shadow: '0 0 5px rgba(0, 0, 0, 0.25)'
    },
    menu: {
      color: '#5B4636',
      background: '#FEFDFB',
      hover: {
        color: '#ffffff',
        background: Colors['teal']
      }
    },
    chip: {
      color: '#FBF0D9',
      background: '#ad998b',
      border: '#E6DECF',
      hover: { color: '#FBF0D9', background: '#ad998b', border: '#E6DECF' }
    },
    article: { header: '#ad998b' },
    settings: {
      background: '#ffffff',
      color: '#444',
      border: '#ccc',
      hover: { background: '#ccc', color: '#000' }
    },
    modeButton: { color: '#5B4636', background: '#FBF0D9', border: '#E6DECF' }
  }
}
