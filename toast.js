const notifier = require("node-notifier");
const path = require('path');

module.exports = function(message) {
    notifier.notify({
        title: "nodejsServer消息",
        message,
        icon: path.join(__dirname, "./assets/icon.png")
    })
}