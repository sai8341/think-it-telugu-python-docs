// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Think IT Telugu',
  tagline: 'Python for College Students - Nee coding journey ikkada start avuthundi! ',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://thinkittelugu.in',
  baseUrl: '/',

  organizationName: 'thinkittelugu',
  projectName: 'python-course',

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Think IT Telugu',
        logo: {
          alt: 'Think IT Telugu Logo',
          src: 'img/logo.jpg',
        },
        items: [
          {
            href: 'https://youtube.com/@ThinkIT-Telugu',
            label: 'YouTube',
            position: 'right',
          },
          {
            href: 'https://github.com/thinkittelugu',
            label: 'Resources',
            position: 'right',
          },
          {
            type: 'doc',
            docId: 'intro',
            label: 'Start Learning ',
            position: 'right',
            className: 'navbar-start-btn',
          },
        ],
      },
      // Footer removed to achieve Mintlify-style independent scrolling
      // where the sidebar is 100% height and never scrolls up.
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'bash', 'json'],
      },
    }),
};

export default config;
