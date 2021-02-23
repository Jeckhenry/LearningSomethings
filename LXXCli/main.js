#!/usr/bin/env node

const cmd = require("commander");
const chalk = require('chalk');
const downGit = require('./src/downloadGit');
const options = require('./src/options');

const template = 'Jeckhenry/common-template';

cmd.command("init").description('lxx-cli初始化模板').action(async (args) => {
    const argsObj = process.argv;
    argsObj[3] == undefined && (console.log(chalk.red('缺少必要参数name')), process.exit(1));
    console.log(chalk.yellow('正在初始化***'));
    // await options();
    downGit(template, argsObj[3])
});

cmd.parse(process.argv);