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
  trailingSlash: true,

  organizationName: 'thinkittelugu',
  projectName: 'python-course',

  customFields: {
    feedbackWebhookUrl: process.env.FEEDBACK_WEBHOOK_URL || '',
    socials: {
      youtube: 'https://youtube.com/@ThinkIT-Telugu',
      telegram: 'https://t.me/thinkittelugu',
      instagram: 'https://instagram.com/thinkittelugu',
      linkedin: 'https://www.linkedin.com/company/think-it-telugu',
      x: 'https://x.com/ThinkITTelugu',
      facebook: 'https://facebook.com/thinkit.telugu',
      website: 'https://www.thinkittelugu.in',
    },
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
            'https://t.me/thinkittelugu',
            'https://www.instagram.com/thinkittelugu',
            'https://www.linkedin.com/company/think-it-telugu',
            'https://x.com/ThinkITTelugu',
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
            'https://t.me/thinkittelugu',
            'https://www.instagram.com/thinkittelugu',
            'https://www.linkedin.com/company/think-it-telugu',
            'https://x.com/ThinkITTelugu',
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
      // announcementBar is hidden by default for the documentation-first release.
      // Re-enable when officially launching/announcing the paid Masterclass.
      /*
      announcementBar: {
        id: 'premium_course_masterclass',
        content:
          'Want step-by-step video explanations, Assignments, and Quizzes? Join the <strong>Premium Python Masterclass</strong>. <a target="_blank" rel="noopener noreferrer" href="https://thinkittelugu.graphy.com">Enroll Now</a>',
        backgroundColor: '#4f46e5',
        textColor: '#ffffff',
        isCloseable: true,
      },
      */
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Think IT Telugu',
          src: 'img/think-it-telugu-logo-dark.jpg',
        },
        items: [
          {
            href: 'https://youtube.com/@ThinkIT-Telugu',
            label: 'Watch on YouTube',
            position: 'left',
            className: 'navbar-nav-link',
          },
          {
            to: '/python-interview-questions',
            label: 'Interview Preparation',
            position: 'left',
            className: 'navbar-nav-link',
            target: '_blank',
          },
          {
            to: '/online-python-compiler',
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
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['python', 'bash', 'json'],
      },
      footer: {
        style: 'light',
        links: [],
        copyright: `© ${new Date().getFullYear()} Think IT Telugu. All rights reserved.`,
      },
    }),
};

export default config;
