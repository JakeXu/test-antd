const $ = require('dekko');
const chalk = require('chalk');

$('dist')
  .isDirectory()
  .hasFile('t123456-antd-with-locales.js')
  .hasFile('t123456-antd-with-locales.min.js')
  .hasFile('t123456-antd.css')
  .hasFile('t123456-antd.min.css')
  .hasFile('t123456-antd.js')
  .hasFile('t123456-antd.min.js')
  .hasFile('t123456-antd.less')
  .hasFile('t123456-antd.dark.less')
  .hasFile('t123456-antd.dark.css')
  .hasFile('t123456-antd.compact.less')
  .hasFile('t123456-antd.compact.css')
  .hasFile('dark-theme.js');

// eslint-disable-next-line no-console
console.log(chalk.green('✨ `dist` directory is valid.'));
