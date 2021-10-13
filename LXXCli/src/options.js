const inquire = require('inquirer');
const options = [{
        name: "type",
        message: "你想创建一个什么类型得模板(vue|react|ssr)",
        default: 'vue'
    },
    {
        name: "tem",
        message: "你想创建一个什么样得项目('空模板：template|后台管理系统：adminTemplate')",
        default: 'template'
    }
];

module.exports = () => {
    return inquire.prompt(options);
}