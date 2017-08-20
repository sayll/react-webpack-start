# react-start

> A React.js Start
> - 适用于单页与多页应用.

## Build Setup

``` bash
$ npm install                  # Install project dependencies
$ npm start                    # open server
$ npm run deploy               # Compile and launch
```

## Script Explain

|`npm run <script>`|解释|
|------------------|-----------|
|`start`|第一次运行启用。生成DLL文件，服务启动在3000端口。|
|`dev`|与`npm start`类似相同,只有当DLL文件存在时可用,加快开发速度。|
|`build`|同`dev`在DLL文件存在时，加快打包速度,打包文件为测试环境代码|
|`deploy`|发布：清空目录>生成生产环境的Dll>打包生产环境代码|
|`dll:dev`|生成开发环境的DLL文件。|
|`dll:build`|生成生产环境的DLL文件。|
|`report`|打包资源分析|
|`cnpm`|安装淘宝镜像|

## 路由地址
> 例：
> uat:http://static1.wdai.com/static/fed/fed/app.yiqitou-activity/#/Counter?userId=101010
> prod:http://static1.weidai.com.cn/static/fed/fed/app.yiqitou-activity/#Counter?userId=101010

- 机分期计算器 /Counter
- 机分期 /Installment?userId=
- 机速贷 /MachineSpeed?userId=
- 机抵贷 /Mortgage?userId=