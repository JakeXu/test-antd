/* eslint-disable import/no-dynamic-require, no-console */
const chalk = require('chalk');
const path = require('path');
const fetch = require('isomorphic-fetch');
const simpleGit = require('simple-git');

const cwd = process.cwd();
const git = simpleGit(cwd);

const { version } = require(path.resolve(cwd, 'package.json'));

function exitProcess(code = 1) {
  console.log(''); // Keep an empty line here to make looks good~
  process.exit(code);
}

async function checkVersion() {
  const { versions } = await fetch('http://registry.npmjs.org/antd').then(res => res.json());
  if (version in versions) {
    console.log(chalk.yellow('😈 Current version already exists. Forget update package.json?'));
    console.log(chalk.cyan(' => Current:'), version);
    exitProcess();
  }
}

async function checkBranch({ current }) {
  if (version.includes('-alpha.')) {
    console.log(chalk.cyan('😃 Alpha version. Skip branch check.'));
  } else if (current !== 'master' && current !== '4.0-prepare') {
    console.log(chalk.yellow('🤔 You are not in the master branch!'));
    exitProcess();
  }
}

async function checkCommit({ files }) {
  if (files.length) {
    console.log(chalk.yellow('🙄 You forgot something to commit.'));
    files.forEach(({ path: filePath, working_dir: mark }) => {
      console.log(' -', chalk.red(mark), filePath);
    });
    exitProcess();
  }
}

async function checkRemote() {
  const { remote } = await git.fetch('origin', 'master');
  if (remote?.indexOf('JakeXu/test-antd') === -1) {
    console.log(
      chalk.yellow('😓 Your remote origin is not ant-design/ant-design, did you fork it?'),
    );
    exitProcess();
  }
}

async function checkAll() {
  const status = await git.status();

  await checkVersion();

  await checkBranch(status);

  await checkCommit(status);

  await checkRemote();
}

checkAll();
