
// Component for rendering navigation links within tabs
class Links extends Component {
  /**
   * Initialise the Links component
   */
  constructor() {
    super();
  }

  /**
   * Generates icon HTML for a link
   * @param {Object} link - Link object containing icon properties
   * @returns {string} HTML string for the icon or empty string
   */
  static getIcon(link) {
    const defaultColor = CONFIG.palette.base;

    return link.icon
      ? `<i class="ti ti-${link.icon} link-icon"
            style="color: ${link.icon_color ?? defaultColor}"></i>`
      : "";
  }

  /**
   * Generates HTML for all links in a specific tab
   * @param {string} tabName - Name of the tab to render links for
   * @param {Array} tabs - Array of tab objects
   * @returns {string} HTML string containing all links
   */
  static getAll(tabName, tabs) {
    const { categories } = tabs.find((f) => f.name === tabName);

    return `
      ${categories
        .map(({ name, links }) => {
          return `
          <li>
            <h1>${name}</h1>
              <div class="links-wrapper">
              ${links
              .map(
                (link) => `
                  <div class="link-info">
                    <a href="${link.url}" target="_blank">
                      ${Links.getIcon(link)}
                      ${link.name ? `<p class="link-name">${link.name}</p>` : ""}
                    </a>
                </div>`,
              )
              .join("")}
            </div>
          </li>`;
        })
        .join("")}
    `;
  }
}

/**
 * Component for rendering tab categories with background styling
 */
class Category extends Component {
  /**
   * Initialise the Category component
   */
  constructor() {
    super();
  }

  /**
   * Generates background style attribute for category
   * @param {string} url - Background image URL
   * @returns {string} CSS style attribute string
   */
  static getBackgroundStyle(url) {
    return url
      ? `style="background-image: url(${url});"`
      : "";
  }

  /**
   * Generates HTML for all tab categories
   * @param {Array} tabs - Array of tab objects
   * @returns {string} HTML string containing all categories
   */
  static getAll(tabs) {
    return `
      ${tabs
        .map(({ name, background_url }, index) => {
          return `<ul class="${name}" ${index == 0 ? "active" : ""}>
            <div class="banner" ${Category.getBackgroundStyle(background_url)}></div>
            <div class="links">${Links.getAll(name, tabs)}</div>
          </ul>`;
        })
        .join("")}
    `;
  }
}

/**
 * Main tabs component for displaying categorised links and navigation
 */
class Tabs extends Component {
  // CSS selector references for DOM elements
  refs = {
    landing: "#landing",
    landingEnter: "[data-landing-enter]",
    landingInput: "[data-landing-input]",
    landingError: "[data-landing-error]",
    landingWeather: "[data-landing-weather]",
    landingGhost: "[data-landing-ghost]",
    landingOutput: "[data-landing-output]",
    landingCaret: "[data-landing-caret]",
    landingMeasure: "[data-landing-measure]",
  };

  /**
   * Initialise the tabs component with configuration
   */
  constructor() {
    super();
    this.tabs = CONFIG.tabs;
  }

  /**
   * Returns CSS import dependencies for this component
   * @returns {string[]} Array of CSS file paths
   */
  imports() {
    return [
      this.getIconResource('material'),
      this.resources.icons.tabler,
      '<link rel="stylesheet" href="src/fonts/jetbrains-mono-local.css">',
      this.getFontResource('roboto'),
      this.getFontResource('raleway'),
      this.getLibraryResource('awoo'),
    ];
  }

  /**
   * Generates component CSS styles
   * @returns {string} CSS styles for the tabs component
   */
  style() {
    return `
      #links {
          position: relative;
          width: 100%;
          height: 100%;
      }

      #landing {
          --landing-accent: #2BE491;
          --landing-accent-soft: #63C5EA;
          --landing-glow: #CF8EF4;
          --landing-ink: #F9F9F9;
          --landing-sky: url("src/img/cold_twinkle.gif");
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 6vh 6vw;
          background: radial-gradient(circle at top, #3a4253 0%, #2a3140 55%, #1b202a 100%);
          color: var(--landing-ink);
          z-index: 10;
          transition: opacity 0.35s ease, transform 0.35s ease;
      }

      #landing::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(140deg, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.15)),
            repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.03) 0px,
              rgba(255, 255, 255, 0.03) 1px,
              rgba(0, 0, 0, 0.02) 2px,
              rgba(0, 0, 0, 0.02) 3px
            );
          mix-blend-mode: screen;
          opacity: 0;
          pointer-events: none;
      }

      #landing::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--landing-sky);
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          opacity: 1;
          -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 82%);
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 82%);
          pointer-events: none;
      }

      #landing.hidden {
          opacity: 0;
          transform: translateY(-12px);
          pointer-events: none;
      }

      #landing.hidden::before {
          opacity: 0;
      }

      #landing:not(.hidden) ~ #panels {
          filter: blur(12px) saturate(0.8);
          transform: scale(0.985);
          opacity: 0.5;
          pointer-events: none;
      }

      .terminal {
          position: relative;
          z-index: 1;
          width: min(780px, 92vw);
          background: rgba(34, 40, 52, 0.96);
          border-radius: 0;
          border: 1px solid rgba(249, 249, 249, 0.18);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55), 0 0 35px rgba(0, 0, 0, 0.35);
          padding: 26px 28px 30px;
          font-family: 'JetBrains Mono', 'Nunito', 'Raleway', monospace;
      }

      .terminal-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
      }

      .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: #FA5AA4;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
      }

      .terminal-dot:nth-child(2) {
          background: #FA946E;
      }

      .terminal-dot:nth-child(3) {
          background: #2BE491;
      }

      .terminal-title {
          margin-left: auto;
          color: #89CCF7;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
      }

      .terminal-body {
          display: grid;
          gap: 8px;
          font-size: 15px;
          letter-spacing: 0.04em;
      }

      .terminal-output {
          display: grid;
          gap: 8px;
      }

      .terminal-output.links-view {
          max-height: min(60vh, 460px);
          overflow: auto;
          padding-right: 6px;
      }

      .line {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          color: ${CONFIG.palette.text};
      }

      .prompt {
          color: var(--landing-accent);
          font-weight: 700;
      }

      .path {
          color: var(--landing-accent-soft);
      }

      .command {
          color: #FA946E;
          font-weight: 600;
      }

      .output {
          color: #89CCF7;
      }

      .output.section {
          color: #F9F9F9;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-top: 14px;
      }

      .output.subsection {
          color: #63C5EA;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-top: 6px;
      }

      .output.link {
          color: #D4E7F6;
      }

      .output.link a {
          color: inherit;
          text-decoration: none;
          display: inline-flex;
          flex-wrap: wrap;
          gap: 6px;
      }

      .output.link a:hover .link-name {
          text-decoration: underline;
      }

      .output.link .link-name {
          color: var(--landing-accent);
          font-weight: 600;
      }

      .output.link .link-url {
          color: rgba(249, 249, 249, 0.55);
      }

      .output.error {
          color: #FA5AA4;
      }

      .terminal-cta {
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #89CCF7;
          font-size: 13px;
      }

      .terminal-input {
          position: relative;
          z-index: 2;
          flex: 1;
          min-width: 120px;
          width: 100%;
          background: transparent;
          border: 0;
          outline: 0;
          margin: 0;
          padding: 0;
          color: #F9F9F9;
          caret-color: transparent;
          font-family: 'JetBrains Mono', 'Nunito', 'Raleway', monospace;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.04em;
          line-height: 1.4;
          font-variant-ligatures: none;
          font-feature-settings: "liga" 0;
      }

      .terminal-input-wrap {
          position: relative;
          display: flex;
          align-items: stretch;
          flex: 1;
          min-width: 120px;
      }

      .terminal-input-ghost {
          position: absolute;
          inset: 0;
          z-index: 1;
          color: rgba(249, 249, 249, 0.45);
          background: transparent;
          border: 0;
          outline: 0;
          pointer-events: none;
          user-select: none;
          caret-color: transparent;
      }

      .terminal-caret {
          position: absolute;
          top: 0;
          left: 0;
          width: 9px;
          height: 1.4em;
          background: #2BE491;
          z-index: 3;
          animation: blink 1s steps(2, start) infinite;
          pointer-events: none;
      }

      .terminal-measure {
          position: absolute;
          top: 0;
          left: 0;
          visibility: hidden;
          white-space: pre;
          pointer-events: none;
          font-family: 'JetBrains Mono', 'Nunito', 'Raleway', monospace;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.04em;
          line-height: 1.4;
          font-variant-ligatures: none;
          font-feature-settings: "liga" 0;
      }

      @keyframes blink {
          to {
              opacity: 0;
          }
      }

      .terminal-input::placeholder {
          color: #89CCF7;
          opacity: 0.7;
      }

      .enter-button {
          background: transparent;
          border: 1px solid rgba(249, 249, 249, 0.2);
          color: #2BE491;
          padding: 6px 14px;
          border-radius: 999px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
      }

      .enter-button:hover {
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 18px rgba(255, 255, 255, 0.12);
      }

      @media (max-width: 700px) {
          .terminal {
              padding: 22px 20px 24px;
          }

          .terminal-body {
              font-size: 13px;
          }
      }

      status-bar {
          bottom: -70px;
          height: 32px;
          background: ${CONFIG.palette.base};
          border-radius: 4px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, .25);
      }

      #panels, #panels ul {
          position: absolute;
      }

      .nav {
          color: #fff;
      }

      #panels {
          border-radius: 5px 0 0 5px;
          width: 90%;
          max-width: 1200px;
          height: 450px;
          right: 0;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
          background: ${CONFIG.palette.base};
          transition: transform 0.35s ease, filter 0.35s ease, opacity 0.35s ease;
      }

      .categories {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          border-radius: 10px 0 0 10px;
      }

      .categories ul {
          --panelbg: transparent;
          --flavour: var(--accent);
          width: 100%;
          height: 100%;
          right: 100%;
          background: ${CONFIG.palette.base} url("../img/bg-1.gif") repeat left;
          transition: all .6s;
          # animation: scroll 25s ease-in-out infinite;
          display: grid;
          grid-template-columns: max-content 1fr;
      }

      .categories .banner {
          position: relative;
          height: 100%;
          aspect-ratio: 1 / 1;
          width: auto;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          align-self: stretch;
          justify-self: start;
      }

      @keyframes scroll {
          50% {
              background-position-x: -240px;
          }
      }

      .categories ul:nth-child(1) {
          --flavour: ${CONFIG.palette.green};
      }

      .categories ul:nth-child(2) {
          --flavour: ${CONFIG.palette.peach};
      }

      .categories ul:nth-child(3) {
          --flavour: ${CONFIG.palette.red};
      }

      .categories ul:nth-child(4) {
          --flavour: ${CONFIG.palette.blue};
      }
      .categories ul:nth-child(5) {
          --flavour: ${CONFIG.palette.mauve};
      }

      .categories ul .links {
          box-shadow: inset -1px 0 var(--flavour);
      }

      .categories ul[active] {
          right: 0;
          z-index: 1;
      }

      .categories .links {
          position: relative;
          height: 100%;
          background: ${CONFIG.palette.base};
          padding: 5%;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
      }

      .categories .links li {
          list-style: none;
      }

      .categories ul .links a {
          color: ${CONFIG.palette.text};
          text-decoration: none;
          font: 700 18px 'Roboto', sans-serif;
          transition: all .2s;
          display: inline-flex;
          align-items: center;
          padding: .4em .7em;
          background: ${CONFIG.palette.mantle};
          box-shadow: 0 4px ${CONFIG.palette.mantle}, 0 5px 10px rgb(0 0 0 / 20%);
          border-radius: 2px;
          margin-bottom: .7em;
      }

      .categories .link-info {
          display: inline-flex;
      }

      .categories .link-info:not(:last-child) { margin-right: .5em; }

      .categories ul .links a:hover {
          transform: translate(0, 4px);
          box-shadow: 0 0 rgba(0, 0, 0, 0.25), 0 0 0 rgba(0, 0, 0, .5), 0 -0px 5px rgba(0, 0, 0, .1);
          color: var(--flavour);
      }

      .categories .links li:not(:last-child) {
          box-shadow: 0 1px 0 ${CONFIG.palette.text};
          padding: 0 0 .5em 0;
          margin-bottom: 1.5em;
      }

      .categories .links li h1 {
          color: ${CONFIG.palette.text};
        opacity: 0.5;
          font-size: 13px;
          margin-bottom: 1em;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Raleway', sans-serif;
      }

      .categories .link-icon {
          font-size: 27px;
          color: ${CONFIG.palette.text};
      }

      .categories .link-icon + .link-name {
          margin-left: 10px;
      }

      .categories .links-wrapper {
          display: flex;
          flex-wrap: wrap;
      }

      .ti {
          animation: fadeInAnimation ease .5s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          height: 27px;
          width: 27px;
      }

      @keyframes fadeInAnimation {
          0% {
              opacity: 0;
          }
          100% {
              opacity: 1;
          }
      }
    `;
  }

  /**
   * Generates HTML template for the tabs component
   * @returns {string} HTML template with panels and categories
   */
  template() {
    return `
      <div id="links" class="-">
        <div id="landing">
          <div class="terminal">
            <div class="terminal-header">
              <span class="terminal-dot"></span>
              <span class="terminal-dot"></span>
              <span class="terminal-dot"></span>
              <span class="terminal-title">/home/start</span>
            </div>
            <div class="terminal-body">
              <div class="terminal-output" data-landing-output>
                <div class="line">
                  <span class="prompt" data-landing-prompt></span>
                  <span class="path">:~</span>$
                  <span class="command">boot --profile links</span>
                </div>
                <div class="line output">Mounting quicklinks... ok</div>
                <div class="line output" data-landing-weather>Fetching weather...</div>
                <div class="line output">Session ready. Awaiting input.</div>
                <div class="line terminal-cta">
                  <button class="enter-button" type="button" data-landing-enter>enter</button>
                  <span>Press Enter or click to continue</span>
                </div>
              </div>
              <div class="line output error" data-landing-error hidden></div>
              <div class="line">
                <span class="prompt" data-landing-prompt></span>
                <span class="path">:~</span>$
                <span class="terminal-input-wrap">
                  <input class="terminal-input terminal-input-ghost" type="text" tabindex="-1" aria-hidden="true" data-landing-ghost />
                  <input class="terminal-input" type="text" autocomplete="off" spellcheck="false" placeholder="type a command..." data-landing-input />
                  <span class="terminal-caret" aria-hidden="true" data-landing-caret></span>
                  <span class="terminal-measure" aria-hidden="true" data-landing-measure></span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div id="panels">
          <div class="categories">
            ${Category.getAll(this.tabs)}
            <search-bar></search-bar>
          </div>
          <status-bar class="!-"></status-bar>
        </div>
      </div>
    `;
  }

  /**
   * Component lifecycle callback when element is connected to DOM
   */
  connectedCallback() {
    this.render().then(() => this.setupLanding());
  }

  /**
   * Configure landing page interactions and dismissal
   */
  setupLanding() {
    const landing = this.refs.landing;
    let enterButton = this.refs.landingEnter;
    const input = this.refs.landingInput;
    const errorLine = this.refs.landingError;
    let weatherLine = this.refs.landingWeather;
    const ghostInput = this.refs.landingGhost;
    const terminalOutput = this.refs.landingOutput;
    const caret = this.refs.landingCaret;
    const measure = this.refs.landingMeasure;

    if (!landing || !enterButton || !input || !errorLine) return;

    const getPromptLabel = () => {
      const username = (CONFIG.username || "").toString().trim() || "guest";
      return `${username}@launchpad`;
    };

    const updatePromptLabel = () => {
      const label = getPromptLabel();
      const nodes = landing?.querySelectorAll("[data-landing-prompt]") || [];
      nodes.forEach((node) => {
        node.textContent = label;
      });
    };

    const buildLandingLinks = (tabs) => (tabs || [])
      .flatMap((tab) => tab.categories || [])
      .flatMap((category) => category.links || [])
      .filter((link) => link && link.url)
      .map((link) => ({
        name: link.name || "",
        url: link.url,
      }));

    const buildShortcutCandidates = (links) => links
      .flatMap((link) => {
        const candidates = [];
        if (link.name) {
          const trimmedName = link.name.trim();
          if (trimmedName) {
            candidates.push({ label: trimmedName, url: link.url });
          }
        }
        if (link.url) {
          candidates.push({ label: link.url, url: link.url });
        }
        return candidates;
      })
      .map((candidate) => ({
        ...candidate,
        normalized: candidate.label.toLowerCase(),
      }));

    let landingLinks = buildLandingLinks(CONFIG.tabs);
    let shortcutCandidates = buildShortcutCandidates(landingLinks);

    const refreshLandingCaches = () => {
      landingLinks = buildLandingLinks(CONFIG.tabs);
      shortcutCandidates = buildShortcutCandidates(landingLinks);
    };

    const normalizeUrl = (value) => {
      const trimmed = value.trim();
      if (!trimmed || /\s/.test(trimmed)) return null;

      const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed);
      if (hasScheme) return trimmed;

      if (/^about:[^\s]+/i.test(trimmed)) return trimmed;
      if (/^(mailto|tel):[^\s]+/i.test(trimmed)) return trimmed;

      const isLocalhost = /^localhost(?::\d+)?(\/|$)/i.test(trimmed);
      const isIp = /^(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?(\/|$)/.test(trimmed);
      const hasDot = trimmed.includes(".");

      if (isLocalhost || isIp || hasDot) return `https://${trimmed}`;

      return null;
    };

    const isAboutPage = (value) => /^about:[^\s]+/i.test(value.trim());

    const getSearchUrl = (query) => {
      const engines = CONFIG.search?.engines || {};
      const defaultKey = CONFIG.search?.default || Object.keys(engines)[0];
      const engine = engines[defaultKey];
      if (!engine || !engine[0]) return null;
      return `${engine[0]}${encodeURIComponent(query)}`;
    };

    const escapeHtml = (value) =>
      value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const buildLinksMarkup = () => {
      const tabs = CONFIG.tabs || [];
      if (!tabs.length) {
        return `<div class="line output">No links configured.</div>`;
      }

      const sections = tabs.flatMap((tab) => {
        const tabName = escapeHtml(tab.name || "links");
        const categories = tab.categories || [];
        const lines = [];
        lines.push(`<div class="line output section">${tabName}</div>`);

        categories.forEach((category) => {
          const categoryName = escapeHtml(category.name || "section");
          lines.push(`<div class="line output subsection">${categoryName}</div>`);
          const links = category.links || [];
          links.forEach((link) => {
            if (!link || !link.url) return;
            const name = escapeHtml(link.name || link.url);
            const url = escapeHtml(link.url);
            lines.push(
              `<div class="line output link"><a href="${url}"><span class="link-name">${name}</span><span class="link-url">-> ${url}</span></a></div>`
            );
          });
        });

        return lines;
      });

      return sections.join("");
    };

    const bindEnterButton = (button) => {
      if (!button || button.dataset?.landingBound) return;
      button.dataset.landingBound = "true";
      button.addEventListener("click", () => {
        showLinksView();
      });
    };

    const showLinksView = () => {
      if (!terminalOutput) return;
      terminalOutput.classList.add("links-view");
      terminalOutput.innerHTML = buildLinksMarkup();
      input.focus();
      updateSuggestion();
      updateCaret();
    };

    const defaultOutputHTML = terminalOutput ? terminalOutput.innerHTML : "";

    const showHomeView = () => {
      if (!terminalOutput) return;
      terminalOutput.classList.remove("links-view");
      terminalOutput.innerHTML = defaultOutputHTML;
      enterButton = this.refs.landingEnter;
      bindEnterButton(enterButton);
      weatherLine = this.refs.landingWeather;
      updatePromptLabel();
      setLandingWeather();
      setLandingSky();
      input.focus();
      updateSuggestion();
      updateCaret();
    };

    const formatHourLabel = (timestamp, offsetSeconds) => {
      const date = new Date((timestamp + offsetSeconds) * 1000);
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    const formatDayLabel = (timestamp, offsetSeconds) => {
      const date = new Date((timestamp + offsetSeconds) * 1000);
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return weekdays[date.getUTCDay()];
    };

    const buildWeatherMarkup = (forecast, scale) => {
      if (!forecast || !forecast.hourly?.length || !forecast.daily?.length) {
        return `<div class="line output">Weather unavailable.</div>`;
      }

      const offsetSeconds = forecast.timezoneOffset || 0;
      const now = Math.floor(Date.now() / 1000);
      const hourly = forecast.hourly
        .filter((item) => item.dt >= now)
        .slice(0, 12);

      const daily = forecast.daily.slice(1, 6);

      const toDisplayTemp = (temp) => (
        scale === "F" ? Math.round((temp * 9) / 5 + 32) : Math.round(temp)
      );

      const lines = [];
      lines.push(`<div class="line output section">Weather</div>`);
      lines.push(`<div class="line output">Next 12 hours</div>`);

      hourly.forEach((item) => {
        const label = formatHourLabel(item.dt, offsetSeconds);
        const condition = item.weather?.[0]?.main || "Unknown";
        const temp = toDisplayTemp(item.temp);
        lines.push(
          `<div class="line output link"><span class="link-name">${label}</span><span class="link-url">-> ${temp}°${scale} ${escapeHtml(condition)}</span></div>`
        );
      });

      lines.push(`<div class="line output subsection">Next 5 days</div>`);
      daily.forEach((item) => {
        const label = formatDayLabel(item.dt, offsetSeconds);
        const condition = item.weather?.[0]?.main || "Unknown";
        const high = toDisplayTemp(item.temp?.max ?? item.temp?.day ?? 0);
        const low = toDisplayTemp(item.temp?.min ?? item.temp?.night ?? 0);
        lines.push(
          `<div class="line output link"><span class="link-name">${label}</span><span class="link-url">-> ${high}/${low}°${scale} ${escapeHtml(condition)}</span></div>`
        );
      });

      return lines.join("");
    };

    const buildHelpMarkup = () => {
      const lines = [];
      lines.push(`<div class="line output section">Commands</div>`);
      lines.push(`<div class="line output link"><span class="link-name">/list</span><span class="link-url">-> Show all links in the terminal</span></div>`);
      lines.push(`<div class="line output link"><span class="link-name">/home</span><span class="link-url">-> Return to the landing terminal</span></div>`);
      lines.push(`<div class="line output link"><span class="link-name">/weather</span><span class="link-url">-> Show next 12 hours and 5-day forecast</span></div>`);
      lines.push(`<div class="line output link"><span class="link-name">/background</span><span class="link-url">-> Cycle landing backgrounds</span></div>`);
      lines.push(`<div class="line output link"><span class="link-name">/username</span><span class="link-url">-> Set prompt username: /username name</span></div>`);
      lines.push(`<div class="line output link"><span class="link-name">/add</span><span class="link-url">-> Add a link: /add "url.com" -group</span></div>`);
      lines.push(`<div class="line output link"><span class="link-name">/remove</span><span class="link-url">-> Remove a link: /remove "url.com" -group</span></div>`);
      lines.push(`<div class="line output link"><span class="link-name">/edit</span><span class="link-url">-> Edit a link: /edit "url.com" -u "new.com", /edit "url.com" -g group, or /edit "url.com" -t "Title"</span></div>`);
      lines.push(`<div class="line output link"><span class="link-name">/help</span><span class="link-url">-> Show this command list</span></div>`);
      return lines.join("");
    };

    const getShortcutUrl = (value) => {
      const normalized = value.trim().toLowerCase();
      if (!normalized) return null;
      const match = shortcutCandidates.find((candidate) => candidate.normalized === normalized);
      return match ? match.url : null;
    };

    const updateSuggestion = () => {
      if (!ghostInput) return;

      const rawValue = input.value;
      const trimmed = rawValue.trim();
      if (!trimmed || /\s/.test(rawValue)) {
        ghostInput.hidden = true;
        ghostInput.dataset.suggestion = "";
        ghostInput.value = "";
        return;
      }

      const normalized = trimmed.toLowerCase();
      const match = shortcutCandidates.find((candidate) =>
        candidate.normalized.startsWith(normalized)
      );
      if (!match || match.label.length <= trimmed.length) {
        ghostInput.hidden = true;
        ghostInput.dataset.suggestion = "";
        ghostInput.value = "";
        return;
      }

      ghostInput.hidden = false;
      ghostInput.value = match.label;
      ghostInput.dataset.suggestion = match.label;
    };

    const updateCaret = () => {
      if (!caret || !measure) return;
      const value = input.value;
      const selectionEnd = input.selectionEnd ?? value.length;
      const textBeforeCaret = value.slice(0, selectionEnd);
      measure.textContent = textBeforeCaret;
      const width = measure.getBoundingClientRect().width;
      const inputStyle = window.getComputedStyle(input);
      const paddingLeft = parseFloat(inputStyle.paddingLeft) || 0;
      const offset = Math.max(0, width - input.scrollLeft + paddingLeft);
      caret.style.transform = `translateX(${offset}px)`;
      caret.style.height = inputStyle.lineHeight;
      caret.style.opacity = "1";
    };

    const parseAddCommand = (value) => {
      const match = value.match(/^\/add\s+"([^"]+)"\s+-\s*(.+)$/i);
      if (!match) return null;
      const rawUrl = match[1].trim();
      const group = match[2].trim();
      if (!rawUrl || !group) return null;
      return { rawUrl, group };
    };

    const parseRemoveCommand = (value) => {
      const match = value.match(/^\/remove\s+"([^"]+)"\s+-\s*(.+)$/i);
      if (!match) return null;
      const rawUrl = match[1].trim();
      const group = match[2].trim();
      if (!rawUrl || !group) return null;
      return { rawUrl, group };
    };

    const parseEditCommand = (value) => {
      const match = value.match(/^\/edit\s+"([^"]+)"\s+-(u|g|t)\s+(.+)$/i);
      if (!match) return null;
      const rawTarget = match[1].trim();
      const mode = match[2].toLowerCase();
      let payload = match[3].trim();
      if (payload.startsWith('"') && payload.endsWith('"')) {
        payload = payload.slice(1, -1);
      }
      if (!rawTarget || !payload) return null;
      return { rawTarget, mode, payload };
    };

    const parseUsernameCommand = (value) => {
      const match = value.match(/^\/username\s+(.+)$/i);
      if (!match) return null;
      let name = match[1].trim();
      if (!name) return null;
      if ((name.startsWith('"') && name.endsWith('"')) || (name.startsWith("'") && name.endsWith("'"))) {
        name = name.slice(1, -1).trim();
      }
      if (!name) return null;
      return { name };
    };

    const inferLinkName = (url) => {
      try {
        const parsed = new URL(url);
        return parsed.hostname.replace(/^www\./i, "") || url;
      } catch (error) {
        return url;
      }
    };

    const addLinkToConfig = (url, group) => {
      const tabs = Array.isArray(CONFIG.tabs) ? CONFIG.tabs : [];
      if (!tabs.length) {
        return { error: "No tabs configured yet. Add a tab in your config first." };
      }

      const normalizedGroup = group.toLowerCase();
      const nextTabs = tabs.map((tab) => ({
        ...tab,
        categories: (tab.categories || []).map((category) => ({
          ...category,
          links: (category.links || []).slice(),
        })),
      }));

      let targetTab = null;
      let targetCategory = null;

      for (const tab of nextTabs) {
        const categories = tab.categories || [];
        const match = categories.find((category) =>
          (category.name || "").toLowerCase() === normalizedGroup
        );
        if (match) {
          targetTab = tab;
          targetCategory = match;
          break;
        }
      }

      if (!targetTab) {
        targetTab = nextTabs[0];
        targetCategory = { name: group, links: [] };
        targetTab.categories = targetTab.categories || [];
        targetTab.categories.push(targetCategory);
      }

      const exists = (targetCategory.links || []).some((link) => link?.url === url);
      if (exists) {
        return { error: "That URL already exists in the selected group." };
      }

      const name = inferLinkName(url);
      targetCategory.links = targetCategory.links || [];
      targetCategory.links.push({ name, url });
      CONFIG.tabs = nextTabs;
      refreshLandingCaches();

      return {
        tabName: targetTab.name || "links",
        categoryName: targetCategory.name || group,
        name,
      };
    };

    const removeLinkFromConfig = (url, group) => {
      const tabs = Array.isArray(CONFIG.tabs) ? CONFIG.tabs : [];
      const normalizedGroup = group.toLowerCase();
      const nextTabs = tabs.map((tab) => ({
        ...tab,
        categories: (tab.categories || []).map((category) => ({
          ...category,
          links: (category.links || []).slice(),
        })),
      }));

      for (const tab of nextTabs) {
        const categories = tab.categories || [];
        const category = categories.find((item) =>
          (item.name || "").toLowerCase() === normalizedGroup
        );
        if (!category) continue;
        const links = category.links || [];
        const index = links.findIndex((link) => link?.url === url);
        if (index === -1) return { error: "URL not found in that group." };
        const [removed] = links.splice(index, 1);
        category.links = links;
        CONFIG.tabs = nextTabs;
        refreshLandingCaches();
        return {
          name: removed?.name || url,
          categoryName: category.name || group,
        };
      }

      return { error: "Group not found." };
    };

    const editLinkInConfig = (targetUrl, mode, payload) => {
      const tabs = Array.isArray(CONFIG.tabs) ? CONFIG.tabs : [];
      const nextTabs = tabs.map((tab) => ({
        ...tab,
        categories: (tab.categories || []).map((category) => ({
          ...category,
          links: (category.links || []).slice(),
        })),
      }));

      for (const tab of nextTabs) {
        const categories = tab.categories || [];
        for (const category of categories) {
          const links = category.links || [];
          const index = links.findIndex((link) => link?.url === targetUrl);
          if (index === -1) continue;

          if (mode === "u") {
            const nextUrl = normalizeUrl(payload);
            if (!nextUrl) return { error: "Invalid URL. Usage: /edit \"url.com\" -u \"new.com\"" };
            const link = links[index];
            link.url = nextUrl;
            link.name = inferLinkName(nextUrl);
            category.links = links;
            CONFIG.tabs = nextTabs;
            refreshLandingCaches();
            return {
              categoryName: category.name || "links",
              name: link.name || nextUrl,
            };
          }

          if (mode === "t") {
            const nextTitle = payload.trim();
            if (!nextTitle) return { error: "Invalid title. Usage: /edit \"url.com\" -t \"New Title\"" };
            const link = links[index];
            link.name = nextTitle;
            category.links = links;
            CONFIG.tabs = nextTabs;
            refreshLandingCaches();
            return {
              categoryName: category.name || "links",
              name: link.name || targetUrl,
            };
          }

          if (mode === "g") {
            const targetGroup = payload.trim();
            if (!targetGroup) return { error: "Invalid group. Usage: /edit \"url.com\" -g group" };
            const normalizedGroup = targetGroup.toLowerCase();
            let destination = categories.find((item) =>
              (item.name || "").toLowerCase() === normalizedGroup
            );
            if (!destination) {
              destination = { name: targetGroup, links: [] };
              tab.categories = tab.categories || [];
              tab.categories.push(destination);
            }
            const [moved] = links.splice(index, 1);
            destination.links = destination.links || [];
            destination.links.push(moved);
            category.links = links;
            CONFIG.tabs = nextTabs;
            refreshLandingCaches();
            return {
              from: category.name || "links",
              to: destination.name || targetGroup,
              name: moved?.name || targetUrl,
            };
          }
        }
      }

      return { error: "URL not found." };
    };

    const setLandingWeather = async () => {
      const currentWeatherLine = this.refs.landingWeather;
      if (!currentWeatherLine || typeof currentWeatherLine === "string") return;
      const location = CONFIG.temperature?.location;
      const scale = CONFIG.temperature?.scale || "C";
      if (!location) return;

      const convertToF = (celsius) => Math.round((celsius * 9) / 5 + 32);

      try {
        const weatherClient = new WeatherForecastClient(location);
        const weather = await weatherClient.getWeather();
        if (!weather || typeof weather.temperature !== "number") {
          currentWeatherLine.textContent = "Weather unavailable.";
          return;
        }

        const temp = scale === "F" ? convertToF(weather.temperature) : weather.temperature;
        const condition = weather.condition
          ? `${weather.condition[0].toUpperCase()}${weather.condition.slice(1)}`
          : "Unknown";

        currentWeatherLine.textContent = `Weather: ${temp}°${scale} ${condition} in ${location}.`;
      } catch (error) {
        currentWeatherLine.textContent = "Weather unavailable.";
      }
    };

    const setLandingSky = async () => {
      if (!landing) return;
      const location = CONFIG.temperature?.location;
      if (!location) return;

      try {
        const weatherClient = new WeatherForecastClient(location);
        const [forecast, weather] = await Promise.all([
          weatherClient.getForecast(),
          weatherClient.getWeather(),
        ]);
        const today = forecast?.daily?.[0];
        if (!today || !today.sunrise || !today.sunset) return;
        const now = Math.floor(Date.now() / 1000);
        const isSunUp = now >= today.sunrise && now < today.sunset;
        const condition = weather?.condition || "";
        const description = weather?.description || "";
        const clouds = weather?.clouds;
        const isPartlyCloudy = (
          condition === "clouds" && (
            description.includes("few clouds") ||
            description.includes("scattered clouds") ||
            description.includes("partly cloudy")
          )
        ) || (typeof clouds === "number" && clouds > 10 && clouds < 60);
        const isClear = condition === "clear" || description.includes("clear");
        const isThunderstorm = condition === "thunderstorm" || description.includes("thunder");
        const isCloudy = condition === "clouds" || description.includes("cloud");
        const isPrecip = (
          condition === "rain" ||
          condition === "drizzle" ||
          condition === "snow" ||
          description.includes("rain") ||
          description.includes("drizzle") ||
          description.includes("snow") ||
          description.includes("sleet")
        );
        const skyUrl = isThunderstorm
          ? 'url("src/img/lightning_1.webp")'
          : isPrecip
            ? 'url("src/img/landing_rain.gif")'
            : isSunUp
              ? 'url("src/img/light_clouds.webp")'
              : (
                isCloudy || isPartlyCloudy
                  ? 'url("src/img/coldnightclouds.webp")'
                  : 'url("src/img/cold_twinkle.gif")'
              );
        landing.style.setProperty("--landing-sky", skyUrl);
      } catch (error) {
        return;
      }
    };

    const landingBackgrounds = [
      { name: "storm", url: 'url("src/img/lightning_1.webp")' },
      { name: "clouds", url: 'url("src/img/light_clouds.webp")' },
      { name: "night-clear", url: 'url("src/img/cold_twinkle.gif")' },
      { name: "night-clouds", url: 'url("src/img/coldnightclouds.webp")' },
      { name: "rain", url: 'url("src/img/landing_rain.gif")' },
    ];
    let manualBackgroundIndex = -1;

    const getCurrentBackgroundIndex = () => {
      if (!landing) return -1;
      const current =
        landing.style.getPropertyValue("--landing-sky") ||
        window.getComputedStyle(landing).getPropertyValue("--landing-sky");
      const normalized = current.replace(/\s+/g, "");
      return landingBackgrounds.findIndex(
        (background) => background.url.replace(/\s+/g, "") === normalized
      );
    };

    const cycleLandingBackground = () => {
      if (!landingBackgrounds.length || !landing) return null;
      if (manualBackgroundIndex < 0) {
        const currentIndex = getCurrentBackgroundIndex();
        manualBackgroundIndex = currentIndex >= 0 ? currentIndex : 0;
      }
      manualBackgroundIndex = (manualBackgroundIndex + 1) % landingBackgrounds.length;
      const background = landingBackgrounds[manualBackgroundIndex];
      landing.style.setProperty("--landing-sky", background.url);
      return background;
    };

    const dismiss = () => {
      if (landing.classList.contains("hidden")) return;
      landing.classList.add("hidden");
      landing.setAttribute("aria-hidden", "true");
      input.blur();
    };

    const showLanding = () => {
      if (!landing.classList.contains("hidden")) {
        input.focus();
        updateSuggestion();
        updateCaret();
        return;
      }
      landing.classList.remove("hidden");
      landing.removeAttribute("aria-hidden");
      input.focus();
      updateSuggestion();
      updateCaret();
    };

    const isEditableTarget = (target) => {
      if (!target) return false;
      const tag = target.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
    };

    bindEnterButton(enterButton);
    document.addEventListener("keydown", (event) => {
      if (event.key !== "`") return;
      if (event.target && isEditableTarget(event.target)) {
        if (!landing.classList.contains("hidden")) return;
        if (event.target !== input && event.target !== ghostInput) return;
      }
      if (event.target?.shadow && event.target.shadow.activeElement) return;
      event.preventDefault();
      showLanding();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "PageUp" || event.key === "PageDown") {
        const scrollTarget = terminalOutput;
        if (scrollTarget && scrollTarget.scrollHeight > scrollTarget.clientHeight) {
          event.preventDefault();
          const direction = event.key === "PageUp" ? -1 : 1;
          const delta = Math.max(scrollTarget.clientHeight - 24, 100);
          scrollTarget.scrollBy({ top: direction * delta, behavior: "smooth" });
        }
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        if (!event.shiftKey && ghostInput && !ghostInput.hidden) {
          const completed = ghostInput.dataset.suggestion || "";
          if (completed) {
            input.value = completed;
            input.setSelectionRange(input.value.length, input.value.length);
            updateSuggestion();
            updateCaret();
            return;
          }
        }

        if (!landingLinks.length) return;

        const currentValue = input.value.trim();
        const currentIndex = landingLinks.findIndex((link) => link.url === currentValue);
        const nextIndex = currentIndex === -1
          ? (event.shiftKey ? landingLinks.length - 1 : 0)
          : (currentIndex + (event.shiftKey ? -1 : 1) + landingLinks.length) % landingLinks.length;

        input.value = landingLinks[nextIndex].url;
        input.setSelectionRange(input.value.length, input.value.length);
        updateSuggestion();
        updateCaret();
        return;
      }

      if (event.key !== "Enter") return;

      const value = input.value.trim();
      errorLine.hidden = true;
      errorLine.textContent = "";
      if (!value) {
        return;
      }

      if (value.toLowerCase() === "/list") {
        showLinksView();
        input.value = "";
        updateSuggestion();
        updateCaret();
        return;
      }

      if (value.toLowerCase() === "/home") {
        showHomeView();
        input.value = "";
        updateSuggestion();
        updateCaret();
        return;
      }

      if (value.toLowerCase() === "/help") {
        if (terminalOutput) {
          terminalOutput.classList.add("links-view");
          terminalOutput.innerHTML = buildHelpMarkup();
        }
        input.value = "";
        updateSuggestion();
        updateCaret();
        return;
      }

      if (value.toLowerCase() === "/background") {
        const background = cycleLandingBackground();
        if (terminalOutput && background) {
          terminalOutput.classList.add("links-view");
          terminalOutput.innerHTML = `<div class="line output">Background set to ${escapeHtml(background.name)}.</div>`;
        }
        input.value = "";
        updateSuggestion();
        updateCaret();
        return;
      }

      const usernamePayload = parseUsernameCommand(value);
      if (usernamePayload) {
        CONFIG.username = usernamePayload.name;
        updatePromptLabel();
        if (terminalOutput) {
          terminalOutput.classList.add("links-view");
          terminalOutput.innerHTML = `<div class="line output">Username set to ${escapeHtml(usernamePayload.name)}.</div>`;
        }
        input.value = "";
        updateSuggestion();
        updateCaret();
        return;
      }

      const addPayload = parseAddCommand(value);
      if (addPayload) {
        const url = normalizeUrl(addPayload.rawUrl);
        if (!url) {
          errorLine.textContent = 'Invalid URL. Usage: /add "url.com" -group';
          errorLine.hidden = false;
          input.focus();
          return;
        }

        const result = addLinkToConfig(url, addPayload.group);
        if (result.error) {
          errorLine.textContent = result.error;
          errorLine.hidden = false;
          input.focus();
          return;
        }

        if (terminalOutput) {
          terminalOutput.classList.add("links-view");
          terminalOutput.innerHTML = `<div class="line output">Added ${escapeHtml(result.name)} to ${escapeHtml(result.tabName)} / ${escapeHtml(result.categoryName)}.</div>`;
        }
        input.value = "";
        updateSuggestion();
        updateCaret();
        return;
      }

      if (value.toLowerCase().startsWith("/add")) {
        errorLine.textContent = 'Invalid /add syntax. Usage: /add "url.com" -group';
        errorLine.hidden = false;
        input.focus();
        return;
      }

      const removePayload = parseRemoveCommand(value);
      if (removePayload) {
        const url = normalizeUrl(removePayload.rawUrl);
        if (!url) {
          errorLine.textContent = 'Invalid URL. Usage: /remove "url.com" -group';
          errorLine.hidden = false;
          input.focus();
          return;
        }

        const result = removeLinkFromConfig(url, removePayload.group);
        if (result.error) {
          errorLine.textContent = result.error;
          errorLine.hidden = false;
          input.focus();
          return;
        }

        if (terminalOutput) {
          terminalOutput.classList.add("links-view");
          terminalOutput.innerHTML = `<div class="line output">Removed ${escapeHtml(result.name)} from ${escapeHtml(result.categoryName)}.</div>`;
        }
        input.value = "";
        updateSuggestion();
        updateCaret();
        return;
      }

      if (value.toLowerCase().startsWith("/remove")) {
        errorLine.textContent = 'Invalid /remove syntax. Usage: /remove "url.com" -group';
        errorLine.hidden = false;
        input.focus();
        return;
      }

      const editPayload = parseEditCommand(value);
      if (editPayload) {
        const targetUrl = normalizeUrl(editPayload.rawTarget);
        if (!targetUrl) {
          errorLine.textContent = 'Invalid URL. Usage: /edit "url.com" -u "new.com", /edit "url.com" -g group, or /edit "url.com" -t "Title"';
          errorLine.hidden = false;
          input.focus();
          return;
        }

        const result = editLinkInConfig(targetUrl, editPayload.mode, editPayload.payload);
        if (result.error) {
          errorLine.textContent = result.error;
          errorLine.hidden = false;
          input.focus();
          return;
        }

        if (terminalOutput) {
          terminalOutput.classList.add("links-view");
          if (editPayload.mode === "g") {
            terminalOutput.innerHTML = `<div class="line output">Moved ${escapeHtml(result.name)} from ${escapeHtml(result.from)} to ${escapeHtml(result.to)}.</div>`;
          } else if (editPayload.mode === "t") {
            terminalOutput.innerHTML = `<div class="line output">Renamed link in ${escapeHtml(result.categoryName)} to ${escapeHtml(result.name)}.</div>`;
          } else {
            terminalOutput.innerHTML = `<div class="line output">Updated ${escapeHtml(result.name)} in ${escapeHtml(result.categoryName)}.</div>`;
          }
        }
        input.value = "";
        updateSuggestion();
        updateCaret();
        return;
      }

      if (value.toLowerCase().startsWith("/edit")) {
        errorLine.textContent = 'Invalid /edit syntax. Usage: /edit "url.com" -u "new.com", /edit "url.com" -g group, or /edit "url.com" -t "Title"';
        errorLine.hidden = false;
        input.focus();
        return;
      }

      if (value.toLowerCase().startsWith("/username")) {
        errorLine.textContent = "Invalid /username syntax. Usage: /username name";
        errorLine.hidden = false;
        input.focus();
        return;
      }

      if (value.toLowerCase() === "/weather") {
        const scale = CONFIG.temperature?.scale || "C";
        const weatherClient = new WeatherForecastClient(CONFIG.temperature?.location || "");
        weatherClient.getForecast().then((forecast) => {
          if (!terminalOutput) return;
          terminalOutput.classList.add("links-view");
          terminalOutput.innerHTML = buildWeatherMarkup(forecast, scale);
        });
        input.value = "";
        updateSuggestion();
        updateCaret();
        return;
      }

      if (value.startsWith("/")) {
        errorLine.textContent = "Command not found. Use /help for the list of available commands.";
        errorLine.hidden = false;
        input.focus();
        return;
      }

      if (isAboutPage(value)) {
        errorLine.textContent = `error: ${value} is a browser-only page. Press Ctrl+L, then paste to open it.`;
        errorLine.hidden = false;
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(value).catch(() => {});
        }
        input.focus();
        return;
      }

      const shortcutUrl = getShortcutUrl(value);
      if (shortcutUrl) {
        window.location.href = shortcutUrl;
        return;
      }

      const url = normalizeUrl(value);
      if (url) {
        window.location.href = url;
        return;
      }

      const searchUrl = getSearchUrl(value);
      if (searchUrl) {
        window.location.href = searchUrl;
      }
    });

    input.addEventListener("input", updateSuggestion);
    input.addEventListener("focus", updateSuggestion);
    input.addEventListener("input", updateCaret);
    input.addEventListener("focus", updateCaret);
    input.addEventListener("click", updateCaret);
    input.addEventListener("keyup", updateCaret);
    input.addEventListener("blur", () => {
      if (ghostInput) {
        ghostInput.hidden = true;
      }
      updateCaret();
    });

    landing.addEventListener("click", () => input.focus());
    input.focus();
    updatePromptLabel();
    setLandingWeather();
    setLandingSky();
    updateSuggestion();
    updateCaret();
  }
}
