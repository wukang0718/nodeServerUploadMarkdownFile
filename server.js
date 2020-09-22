const logger = require("./log");
const path = require("path");
const os = require("os")
const args = process.argv.slice(2);

if (os.type() === "Windows_NT") {
    const Service = require("node-windows").Service;

    const svc = new Service({
        name: "nodejsUploadMarkdownToGithub",
        description: "nodejs脚本自动上传文件到github",
        script: path.resolve(__dirname, "app.js"),
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
    })

    svc.on("start", () => {
        logger.info("自启动脚本，启动服务");
    })

    if (args[0] === "uninstall") {
        svc.uninstall();
    } else {
        svc.install();
    }
} else {
    const exec = require("child_process").exec;
    if (args[0] === "uninstall") {
        exec("sudo sh " + path.resolve(__dirname, "./scripts/shutdown.sh"), err => {
            if (err) {
                logger.info(err)
                throw err;
            }
        })
    } else {
        exec("sudo sh " + path.resolve(__dirname, "./scripts/start.sh"), (err) => {
            if (err) {
                logger.info(err)
                throw err;
            }
        });
    }
    
}
