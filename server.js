const logger = require("./log");
const toast = require("./toast");
const Service = require("node-windows").Service;

const svc = new Service({
    name: "nodejsUploadMarkdownToGithub",
    description: "nodejs脚本自动上传文件到github",
    script: require("path").join(__dirname, "app.js"),
    wait: 1,
    grow: 0.25,
    maxRestarts: 40
});

svc.on("install", () => {
    logger.info("自启动程序安装成功");
    svc.start();
})

svc.on("uninstall", () => {
    logger.info("自启动程序卸载成功");
})

svc.on("alreadyinstalled ", () => {
    logger.warn("程序已经启动");
})

svc.on("error", (err) => {
    logger.error("自启动服务异常" + err);
    toast("自启动服务异常");
})

svc.install();