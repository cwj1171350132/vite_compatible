module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "46",
          firefox: "45",
          ie: "11",
        },
        useBuiltIns: "usage",
        corejs: {
          version: 3,
          proposals: true,
        },
        modules: false,
        debug: false,
        // 确保转换所有现代JS特性
        include: [
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-nullish-coalescing-operator",
        ],
      },
    ],
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-transform-async-to-generator",
    // Vue 3 JSX支持（如果需要）
    "@vue/babel-plugin-jsx",
  ],
  env: {
    development: {
      plugins: [],
    },
    production: {
      plugins: [["transform-remove-console", { exclude: ["error", "warn"] }]],
    },
  },
};
