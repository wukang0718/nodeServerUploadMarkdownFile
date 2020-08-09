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

## github同步

使用`simple-git`模块操作github，使用`chokidar`模块监听文件修改，延迟3秒上传到github

##  开机自启动

使用node-windows模块