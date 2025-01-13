### Grouper App

Not the another terminal emulator, but the tmux sessions browser.

#### Default config

config file is located in .config/Grouper folder of the user and must be named config.json

```json
{
  "theme": {
    "primaryBg": "#1C1C1E",
    "primaryFg": "#e0def4",
    "accentColor": "system",
    "secondaryColor": "#ea9999",
    "thirdaryColor": "#31748f",
    "fourtharyColor": "#eb6f92",
    "fiftharyColor": "#c4a7e7",
    "overlayBg": "color-mix(in srgb, #908caa 25%, transparent)",
    "border": "1px solid rgba(100, 100, 100, 0.2)"
  },
  "terminal": {
    "fontFamily": "JetBrainsMono Nerd Font",
    "fontSize": 14,
    "cursorBlink": true,
    "screenReaderMode": false,
    "theme": {
      "background": "#1C1C1E",
      "cursor": "#e0def4",
      "cursorAccent": "",
      "selectionBackground": "",
      "selectionForeground": "",
      "selectionInactiveBackground": "",
      "black": "",
      "red": "",
      "green": "",
      "yellow": "",
      "blue": "",
      "magenta": "",
      "cyan": "",
      "white": "",
      "brightBlack": "",
      "brightRed": "",
      "brightGreen": "",
      "brightYellow": "",
      "brightBlue": "",
      "brightMagenta": "",
      "brightCyan": "",
      "brightWhite": "",
      "extendedAnsi": []
    }
  }
}
```

#### Custom styles

the custom css may be provided by the user with this points of extention
this file may located in same folder as config.json and be named custom.css

```css
#titlebar {
}

#tabs {
}

#sidebar {
}

#terminal {
}

main {
}
```
