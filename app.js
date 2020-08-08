const invokeGit = require("./git-cmd");
const toast = require("./toast");
const logger = require("./log");
const watch = require("./watchFile");
const { dirPath } = require("./config.json");

// 程序加载 ---- 更新文件
invokeGit("pull", true).then(() => {
    logger.info('服务启动成功');
    watch(dirPath);
    toast("markdwon笔记初始化更新完成，开始监听文件自动同步");
});