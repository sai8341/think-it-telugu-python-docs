import config from './docusaurus.config.js';

export default {
  ...config,
  future: {
    ...config.future,
    faster: false,
  },
};
