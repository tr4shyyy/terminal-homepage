// User configuration for the startpage - update the palette, location, and your preferred tabs, categories, and links

// Define preferred palette for light and dark mode
// Available themes: latte, frappe, mocha, macchiato
const preferredLightTheme = latte;
const preferredDarkTheme = frappe;

let palette = initThemeSystem(preferredLightTheme, preferredDarkTheme);

const default_configuration = {
  overrideStorage: true,
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
      name: "Leave",
      background_url: "src/img/banners/banner_19.gif",
      categories: [
        {
          name: "core",
          links: [
            {
              name: "mail",
              url: "https://mail.proton.me",
            },
            {
              name: "google drive",
              url: "https://drive.google.com/drive/home",
            },
            {
              name: "proton drive",
              url: "https://drive.proton.me/",
            },
            {
              name: "icloud storage",
              url: "https://www.icloud.com/iclouddrive",
            },
          ],
        },
        {
          name: "dev",
          links: [
            {
              name: "github",
              url: "https://github.com",
            },
            {
              name: "epicgames",
              url: "https://store.epicgames.com",
            },
            {
              name: "openAI",
              url: "https://openai.com",
            },
            {
              name: "googleAI",
              url: "https://aistudio.google.com/",
            },
            {
              name: "huggingface",
              url: "https://huggingface.co/",
            },
            {
              name: "pytorch",
              url: "https://pytorch.org",
            },
            {
              name: "pypi",
              url: "https://pypi.org/",
            },
            {
              name: "nvidia",
              url: "https://developer.nvidia.com/",
            },
            {
              name: "blender docs",
              url: "https://docs.blender.org/manual/en/latest/",
            },
          ],
        },
        {
          name: "media",
          links: [
            {
              name: "soundcloud",
              url: "https://soundcloud.com",
            },
            {
              name: "twitch",
              url: "https://twitch.com",
            },
            {
              name: "youtube",
              url: "https://youtube.com",
            },
            {
              name: "instagram",
              url: "https://instagram.com",
            },
          ],
        },
        {
          name: "tools",
          links: [
            {
              name: "MonkeyType",
              url: "https://monkeytype.com",
            },
            {
              name: "sd webui",
              url: "http://127.0.0.1:8888",
            },
            {
              name: "infinite image browser",
              url: "http://127.0.0.1:7666",
            },
            {
              name: "Curseforge",
              url: "https://curseforge.com",
            },
            {
              name: "modrinth",
              url: "https://modrinth.com",
            },
            {
              name: "rutracker",
              url: "https://rutracker.org/forum/index.php",
            },
          ],
        },
        {
          name: "shopping",
          links: [
            {
              name: "amazon",
              url: "https://amazon.com",
            },
          ],
        },
        {
          name: "misc",
          links: [
            {
              name: "stake",
              url: "https://stake.us",
            },
            {
              name: "stake codes",
              url: "https://juicedwins.com/stake-codes/",
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

