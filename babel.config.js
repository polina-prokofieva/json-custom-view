module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: true,
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
};
