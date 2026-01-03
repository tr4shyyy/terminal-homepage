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
    icon_color: palette.maroon,
  },
  additionalClocks: [
    {
      label: "UA",
      timezone: "New York",
      format: "h:i",
      icon_color: palette.peach,
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
          name: "leave",
          links: [
            {
              name: "Curseforge",
              url: "https://curseforge.com",
              icon: "hammer",
              icon_color: palette.green,
            },
            {
              name: "modrinth",
              url: "https://modrinth.com",
              icon_color: palette.peach,
              icon: "binary-tree",
            },
			{
              name: "soundcloud",
              url: "https://soundcloud.com",
              icon: "brand-soundcloud",
              icon_color: palette.red,
            },
          ],
        },
        {
          name: "",
          links: [
		    {
			  name: "MonkeyType",
			  url: "https://monkeytype.com",
			  icon: "keyboard",
			  icon_color: palette.green,
			},
			{
              name: "mail",
              url: "https://mail.proton.me",
              icon: "brand-gmail",
              icon_color: palette.peach,
            },
            {
              name: "drive",
              url: "https://drive.google.com/drive/home",
              icon: "brand-google-drive",
              icon_color: palette.red,
            },
          ],
        },
        {
          name: "",
          links: [
		    { name: "twitch",
			  url: "https://twitch.com",
			  icon: "brand-twitch",
			  icon_color: palette.green,
			},
			{
              name: "youtube",
              url: "https://youtube.com",
              icon: "brand-youtube",
              icon_color: palette.peach,
            },
            {
              name: "instagram",
              url: "https://instagram.com",
              icon: "brand-instagram",
              icon_color: palette.red,
            },
          ],
        },
		{
          name: "",
          links: [
		    { name: "sd webui",
			  url: "http://127.0.0.1:8888",
			  icon: "brand-tabler",
			  icon_color: palette.green,
			},
			{
              name: "infinite image browser",
              url: "http://127.0.0.1:7666",
              icon: "photo",
              icon_color: palette.peach,
            },
          ],
        },
      ],
    },
    {
      name: "Me",
      background_url: "src/img/banners/banner_19.gif",
      categories: [
        {
          name: "me",
          links: [
            {
              name: "github",
              url: "https://github.com",
              icon: "brand-github",
              icon_color: palette.green,
            },
            {
              name: "openAI",
              url: "https://openai.com",
              icon: "brand-openai",
              icon_color: palette.peach,
            },
            {
              name: "googleAI",
              url: "https://aistudio.google.com/",
              icon: "brand-google",
              icon_color: palette.red,
            },
			{
              name: "huggingface",
              url: "https://huggingface.co/",
              icon: "mood-xd",
              icon_color: palette.red,
            },
          ],
        },
        {
          name: "",
          links: [
            {
              name: "pytorch",
              url: "https://pytorch.org",
              icon: "brand-torchain",
              icon_color: palette.green,
            },
            {
              name: "pypi",
              url: "https://pypi.org/",
              icon: "packages",
              icon_color: palette.peach,
            },
            {
              name: "nvidia",
              url: "https://developer.nvidia.com/",
              icon: "nut",
              icon_color: palette.red,
            },
            {
              name: "blender docs",
              url: "https://docs.blender.org/manual/en/latest/",
              icon: "brand-blender",
              icon_color: palette.blue,
            },
          ],
        },
        {
          name: "",
          links: [
            {
              name: "amazon",
              url: "https://amazon.com",
              icon: "brand-amazon",
              icon_color: palette.green,
            },
            {
              name: "rutracker",
              url: "https://rutracker.org/forum/index.php",
              icon: "diamond",
              icon_color: palette.peach,
            },
            {
              name: "uber engineering",
              url: "https://www.uber.com/en-GB/blog/london/engineering",
              icon: "brand-uber",
              icon_color: palette.red,
            },
          ],
        },
      ],
    },
    {
      name: "Alone",
      background_url: "src/img/banners/banner_19.gif",
      categories: [
        {
          name: "alone",
          links: [
            {
              name: "lucky bird",
              url: "https://luckybird.io",
              icon: "brand-twitter",
              icon_color: palette.green,
            },
            {
              name: "stake",
              url: "https://stake.us",
              icon: "spade",
              icon_color: palette.peach,
            },
          ],
        },
        {
          name: "",
          links: [
            {
              name: "IGN",
              url: "https://www.ign.com/account/playlist/library",
              icon: "device-gamepad",
              icon_color: palette.green,
            },
            {
              name: "steam",
              url: "https://store.steampowered.com",
              icon: "brand-steam",
              icon_color: palette.peach,
            },
            {
              name: "epicgames",
              url: "https://store.epicgames.com",
              icon: "brand-fortnite",
              icon_color: palette.red,
            },
            {
              name: "nintendo",
              url: "https://store.nintendo.co.uk",
              icon: "device-nintendo",
              icon_color: palette.blue,
            },
          ],
        },
        {
          name: "",
          links: [
            {
              name: "anilist",
              url: "https://anilist.co/home",
              icon: "brand-funimation",
              icon_color: palette.green,
            },
            {
              name: "youtube",
              url: "https://www.youtube.com",
              icon: "brand-youtube",
              icon_color: palette.peach,
            },
            {
              name: "patreon",
              url: "https://www.patreon.com",
              icon: "brand-patreon",
              icon_color: palette.red,
            },
            {
              name: "kyivstar",
              url: "https://tv.kyivstar.ua",
              icon: "star-filled",
              icon_color: palette.blue,
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

