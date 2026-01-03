

<p align="center">
  <img src="terminal_preview.gif"/>
</p>

# Overview

A terminal-first startpage for fast navigation. The landing terminal provides autocomplete, link discovery, and command shortcuts, while the links are rendered as a readable terminal list grouped by tabs and categories.

## Main Principles

- Minimalism in all aspects
- Consistency throughout the user interface and codebase
- Simplicity in design and configuration
- Unified style and reduced visual noise

## Supported Palettes

- Latte
- Frappé
- Macchiato
- Mocha

## Features

- Automatic theme switching based on system settings (light/dark mode)
- Terminal-first navigation with autocomplete and commands
- Link list rendered inside the terminal, grouped by tabs and categories
- Search bar with multiple engines
- Weather widget and `/weather` command (12-hour + 5-day forecast)
- Clock widget with 12/24-hour format and multiple time zones support
- Terminal commands: `/list`, `/home`, `/help`

# Usage

1. Fork this repository and clone it
2. Optionally remove the `.github` directory, as it contains only PR templates, issue labels, etc., that are linked to this repository
3. Create [`userconfig.js`](userconfig.example.js) based on the example file:
   - Set the desired palette: `latte`, `frappe`, `macchiato`, or `mocha`
   - Set your location for the weather widget
   - Update the number of tabs and their banners
   - Update bookmarks and quick links for those you use most
4. Add your OpenWeather API key:
   - Copy `src/config/weather.key.example.js` to `src/config/weather.key.js`
   - Set `window.WEATHER_API_KEY` to your key (this file is gitignored)



### As Homepage

- Click the menu button and select `Options/Preferences`
- Click the home panel
- Click the menu next to 'Homepage and new windows', choose to show custom URLs, and add your GitHub Pages link

### As New Tab

You can use different add-ons or extensions for this.

- If you use Firefox-based browsers: [Custom New Tab Page](https://addons.mozilla.org/en-US/firefox/addon/custom-new-tab-page/?src=search) and make sure to enable "Force links to open in the top frame (experimental)" in the extension's preferences page
- If you use Chromium-based browsers (Brave / Chrome): [Custom New Tab URL](https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia)

### Clock

The startpage now features an enhanced clock component with:

- Support for 12-hour and 24-hour time formats
- Multiple clocks for different time zones
- Customisable formatting options
- Locale support for regional time display

You can configure the clock format and add additional time zones in your `userconfig.js`:

```javascript
clock: {
  format: "k:i p", // 12-hour format with AM/PM (09:30 PM)
  icon_color: palette.maroon,
},
// Optional: Add multiple clocks for different time zones
additionalClocks: [
  {
    label: "NYC", // Label for the clock
    timezone: "America/New_York", // IANA timezone name (handles DST automatically)
    format: "h:i", // 24-hour format (21:30)
    locale: "en-US", // Locale for date/time formatting
    icon_color: palette.blue // Optional different icon color
  }
],
```

For full documentation of clock format options, [see](docs/CLOCK.md).

<h3 align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png" width="50" alt="Logo"/><br/>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
</h3>
