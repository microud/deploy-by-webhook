# deploy-by-webhook
通过Webhook自动部署代码的简单示例，可直接使用。
代码丑以及模块化差= =，各位node大佬求轻喷。

# 使用说明
以下三项可以通过`index.js`中的三个变量修改

- 修改secret为github中设置的值
- 修改日志路径为自己想要的路径，程序中默认为`/var/log/webhook/webhook.log`,其中，不存在的目录需要手动创建。
- 端口也可以按自己意愿修改

deploy.sh脚本文件是用来执行的代码，请根据自己的需求编写。

以上
