const invokeGit = require("./git-cmd");
const logger = require("./log");
const watch = require("./watchFile");
const { dirPath } = require("./config.json");

logger.info('服务启动成功');

// 程序加载 ---- 更新文件
invokeGit("pull", true).then(() => {
    watch(dirPath);
    logger.info("监听文件");
});