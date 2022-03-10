/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
    'prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
    browser: true,
    es2021: true,
  },
  plugins: ['prettier'],
  overrides: [
    {
      files: ['cypress/integration/**.spec.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
    {
      files: ['__tests__/**/*.{js,ts,jsx,tsx}'],
      extends: ['plugin:jest-dom/recommended'],
      plugins: ['prettier', 'jest-dom'],
      env: {
        jest: true,
      },
    },
  ],
};
