// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Think IT Telugu',
  tagline: 'Python for College Students - Nee coding journey ikkada start avuthundi! ',
  favicon: 'img/python-logo.svg',

  future: {
    v4: true,
    faster: true,
  },

  url: 'https://python.thinkittelugu.in',
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

  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Think IT Telugu - Python Course',
        url: 'https://python.thinkittelugu.in',
        description: 'Python for College Students in Telugu - Interactive coding playground and structured modules.',
        publisher: {
          '@type': 'Organization',
          name: 'Think IT Telugu',
          url: 'https://www.thinkittelugu.in',
          sameAs: [
            'https://www.thinkittelugu.in',
            'https://www.youtube.com/@ThinkIT-Telugu',
            'https://www.instagram.com/thinkittelugu',
            'https://www.facebook.com/thinkit.telugu'
          ],
        },
      }),
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Complete Python Programming Course in Telugu',
        description: 'Comprehensive Python programming tutorial series designed specifically for college students in Telugu.',
        provider: {
          '@type': 'Organization',
          name: 'Think IT Telugu',
          url: 'https://www.thinkittelugu.in',
          sameAs: [
            'https://www.thinkittelugu.in',
            'https://www.youtube.com/@ThinkIT-Telugu',
            'https://www.instagram.com/thinkittelugu',
            'https://www.facebook.com/thinkit.telugu'
          ],
        },
      }),
    },
  ],

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
        ...(process.env.NODE_ENV === 'production' ? {
          googleTagManager: {
            containerId: 'GTM-PX58P696',
          },
          gtag: {
            trackingID: 'G-DLFSRK6KB0',
            anonymizeIP: true,
          },
        } : {}),
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
        ignoreCssSelectors: ['pre', 'code'],
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
          src: 'img/python-logo.svg',
        },
        items: [
          {
            to: '/python-lab',
            label: '🐍 Python Lab',
            position: 'right',
            className: 'navbar-python-lab',
          },
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
