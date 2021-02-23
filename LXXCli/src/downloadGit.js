const downloadGit = require('download-git-repo');
const {
    down
} = require('inquirer/lib/utils/readline');
const ora = require('ora');

const downGit = (url, name) => {
    const spiner = ora('拉取模板......');
    spiner.start();
    downloadGit(url, name, {
        clone: false,
    }, err => {
        spiner.stop();
        console.log(err ? err : '拉取模板完毕');
        process.exit(1);
    });
}

module.exports = downGit;