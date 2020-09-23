##  特殊操作

1.修改repo的remote  
```bash
    git remote set-url remote-name https://<username>:<password>@github.com/<username>/<repo_name>.git
```

2.设置为repo用户名和邮箱  

```bash
git config  user.email "xxxx@xx.com"
git config  user.name "xxxx"
```

##  安装
在项目目录下运行下`npm start`

##  启动多次服务需要不同配置文件
    配置文件存放在 `config` 目录中，配置 `process.env.config` 调用不同的配置文件

##  非 `windows` 机器使用 `pm2` 设置开机自启动

```bash
pm2 start --name <name> npm -- run <scripts>
pm2 save
pm2 startup
```

## github同步

使用`simple-git`模块操作github，使用`chokidar`模块监听文件修改，延迟3秒上传到github

##  开机自启动

使用node-windows模块