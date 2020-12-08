const git = require('simple-git');
const { dirPath, branch, commitMessage, remote } = require(`./config/${process.env.config || "config"}.json`);
const logger = require('./log');

/**
 * 初始化git
 */
let gitEntity = git(dirPath)

/**
 * 初始化 推送 队列
 */
let queueNumber = 0;

/**
 * git提交，要先更新在提交
 */
function gitPush() {
    queueNumber++;
    const push = () => {
        gitPull().then((status) => {
            if (!status) { return }
            logger.info("开始提交到github");
            gitEntity
                .add('./*')
                .commit(commitMessage)
                .push([remote, branch])
                .then(() => {
                    logger.info(`Push to ${branch} success`);
                })
                .catch(err => {
                    logger.error(`Push to ${branch} error`);
                    logger.error(err);
                })
                .finally(() => {
                    queueNumber--;
                    // 还有其他的提交请求
                    if(queueNumber) {
                        push()
                    }
                })
        })
    }
    if (queueNumber === 1) {
        // 第一个进入队列 直接提交
        push()
    }
}

/**
 * git更新
 */
function gitPull() {
    logger.info("开始从github更新");
    return gitEntity
        .pull(remote, branch)
        .then(() => {
            logger.info(`Pull to ${branch} success`);
        })
        .catch(err => {
            logger.error(`Pull to ${branch} error`);
            logger.error(err);
            return false
        });
}

/**
 * 延时执行函数, 延迟3秒
 */
const delayMethod = function(type) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            gitCmd[type]();
            clearTimeout(timer);
        }, 3000)
    }
};

const gitCmd = {
    push: gitPush,
    pull: gitPull,
    delayInvoke: {
        push: delayMethod("push"),
        pull: delayMethod("pull")
    }
}


module.exports = function(type, immediately) {
    if (immediately) {
        return gitCmd[type]();
    } else {
        gitCmd.delayInvoke[type]();
    }
}