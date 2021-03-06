/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  extends: "@snowpack/app-scripts-react",
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript'
  ],
  alias: {
    "@components": "./src/components",
    "@hooks": "./src/hooks",
    "@utils": "./src/utils"
  },
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
    "knownEntrypoints": ["styled-components"]
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
