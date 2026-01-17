// User configuration for the startpage - update the palette, location, and your preferred tabs, categories, and links

// Define preferred palette for light and dark mode
// Available themes: latte, frappe, mocha, macchiato
const preferredLightTheme = latte;
const preferredDarkTheme = frappe;

let palette = initThemeSystem(preferredLightTheme, preferredDarkTheme);

const default_configuration = {
  overrideStorage: true,
  username: "guest",
  temperature: {
    location: "Manchester",
    scale: "F",
  },
  clock: {
    format: "k:i p",
  },
  additionalClocks: [
    {
      label: "UA",
      timezone: "New York",
      format: "h:i",
    },
  ],
  search: {
    engines: {
      p: ["https://www.perplexity.ai/search/?q=", "PerplexityAI"],
      d: ["https://duckduckgo.com/?q=", "DuckDuckGo"],
      g: ["https://google.com/search?q=", "Google"],
    },
    default: "d",
  },
  keybindings: {
    "s": "search-bar",
  },
  disabled: [],
  localIcons: true,
  localFonts: true,
  fastlink: "https://www.perplexity.ai",
  openLastVisitedTab: true,
  tabs: [
    {
      name: "myself",
      background_url: "src/img/banners/banner_09.gif",
      categories: [
        {
          name: "bookmarks",
          links: [
            {
              name: "raindrop",
              url: "https://app.raindrop.io",
            },
            {
              name: "musicForProgramming();",
              url: "https://musicforprogramming.net",
            },
          ],
        },
        {
          name: "workspace",
          links: [
            {
              name: "gmail",
              url: "https://mail.google.com",
            },
            {
              name: "calendar",
              url: "https://calendar.google.com",
            },
            {
              name: "sheets",
              url: "https://docs.google.com/spreadsheets",
            },
            {
              name: "drive",
              url: "https://drive.google.com/drive/home",
            },
          ],
        },
        {
          name: "media",
          links: [
            {
              name: "уп",
              url: "https://www.pravda.com.ua",
            },
            {
              name: "mil.in.ua",
              url: "https://mil.in.ua",
            },
            {
              name: "куток",
              url: "https://kutok.io",
            },
            {
              name: "ґрунт",
              url: "https://grnt.media",
            },
            {
              name: "village",
              url: "https://www.village.com.ua",
            },
          ],
        },
      ],
    },
    {
      name: "dev",
      background_url: "src/img/banners/banner_07.gif",
      categories: [
        {
          name: "development",
          links: [
            {
              name: "github",
              url: "https://github.com",
            },
            {
              name: "neptune",
              url: "https://ui.neptune.ai",
            },
            {
              name: "stackoverflow",
              url: "https://stackoverflow.com",
            },
          ],
        },
        {
          name: "challenges",
          links: [
            {
              name: "kaggle",
              url: "https://www.kaggle.com",
            },
            {
              name: "leetcode",
              url: "https://leetcode.com",
            },
            {
              name: "exercism",
              url: "https://exercism.org",
            },
            {
              name: "aoc",
              url: "https://adventofcode.com",
            },
          ],
        },
        {
          name: "resources",
          links: [
            {
              name: "dou",
              url: "https://dou.ua",
            },
            {
              name: "hackernews",
              url: "https://news.ycombinator.com",
            },
            {
              name: "uber engineering",
              url: "https://www.uber.com/en-GB/blog/london/engineering",
            },
            {
              name: "netflix tech blog",
              url: "https://netflixtechblog.com",
            },
          ],
        },
      ],
    },
    {
      name: "chi ll",
      background_url: "src/img/banners/banner_08.gif",
      categories: [
        {
          name: "social media",
          links: [
            {
              name: "telegram",
              url: "https://web.telegram.org",
            },
            {
              name: "facebook",
              url: "https://www.facebook.com",
            },
            {
              name: "reddit",
              url: "https://www.reddit.com/r/unixporn",
            },
          ],
        },
        {
          name: "gaming",
          links: [
            {
              name: "IGN",
              url: "https://www.ign.com/account/playlist/library",
            },
            {
              name: "steam",
              url: "https://store.steampowered.com",
            },
            {
              name: "epicgames",
              url: "https://store.epicgames.com",
            },
            {
              name: "nintendo",
              url: "https://store.nintendo.co.uk",
            },
          ],
        },
        {
          name: "video",
          links: [
            {
              name: "anilist",
              url: "https://anilist.co/home",
            },
            {
              name: "youtube",
              url: "https://www.youtube.com",
            },
            {
              name: "patreon",
              url: "https://www.patreon.com",
            },
            {
              name: "kyivstar",
              url: "https://tv.kyivstar.ua",
            },
          ],
        },
      ],
    },
  ],
};

const CONFIG = new Config(default_configuration, palette);

const root = document.querySelector(":root");
root.style.setProperty("--bg", palette.mantle);
root.style.setProperty("--accent", palette.green);
