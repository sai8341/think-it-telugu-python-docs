// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Think IT Telugu',
  tagline: 'Python for AI & ML - Nee AI engineering journey ikkada start avuthundi!',
  favicon: 'img/python-logo.svg',

  future: {
    v4: true,
    faster: true,
  },

  url: 'https://python.thinkittelugu.in',
  baseUrl: '/',

  organizationName: 'thinkittelugu',
  projectName: 'python-course',

  customFields: {
    feedbackWebhookUrl: process.env.FEEDBACK_WEBHOOK_URL || '',
  },

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
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
        media: 'print',
        onload: "this.media='all'",
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Think IT Telugu - Python for AI & ML',
        url: 'https://python.thinkittelugu.in',
        description: 'Python for AI & ML in Telugu - Learn Python from scratch to build real AI applications.',
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
        name: 'Python for AI & ML - Complete Course in Telugu',
        description: 'Learn Python from zero to building real AI & ML applications. Designed for beginners in Telugu.',
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
        indexPages: false,
        explicitSearchResultPath: false,
        highlightSearchTermsOnTargetPage: false,
        docsRouteBasePath: '/',
        ignoreCssSelectors: ['pre', 'code'],
        searchBarShortcut: false,
        searchBarShortcutHint: false,
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
            href: 'https://youtube.com/@ThinkIT-Telugu',
            label: 'Watch on YouTube',
            position: 'left',
            className: 'navbar-nav-link',
          },
          {
            href: 'https://resources.thinkittelugu.in',
            label: 'Resources',
            position: 'left',
            className: 'navbar-nav-link',
          },
          {
            to: '/python-lab',
            label: 'Python Lab',
            position: 'right',
            className: 'navbar-python-lab',
            target: '_blank',
          },
          {
            type: 'custom-fullscreenToggle',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'bash', 'json'],
      },
    }),
};

export default config;
