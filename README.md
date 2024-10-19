
https://www.electronjs.org/zh/docs/latest/tutorial/quick-start

# 摘要
Electron 程序是通过 npm 包创建的。 
您应将 Electron 依赖安装到 devDependencies ，然后在 package.json 中设置一个脚本来运行。

执行命令后，Electron 程序会运行您在 package.json 文件的 main 字段设置的入口文件。 

这个入口文件控制着 Electron 的主进程，后者运行于 Node.js 实例，负责应用的生命周期、展示原生窗口、执行特殊操作和管理渲染进程。

渲染器进程(简称渲染器) 负责展示图形内容。 
您可以将渲染的网页指向 web 地址或本地 HTML 文件。 渲染器和常规的网页行为很相似，访问的 web API 也相同。


# 什么是预加载脚本？
Electron 的主进程是一个拥有着完全操作系统访问权限的 Node.js 环境。
除了 Electron 模组 之外，您也可以访问 Node.js 内置模块 和所有通过 npm 安装的包。 l另一方面，出于安全原因，渲染进程默认跑在网页页面上，而并非 Node.js里。

为了将 Electron 的不同类型的进程桥接在一起，我们需要使用被称为 预加载 的特殊脚本。

# 在进程之间通信
我们之前提到，Electron 的主进程和渲染进程有着清楚的分工并且不可互换。 这代表着无论是从渲染进程直接访问 Node.js 接口，亦或者是从主进程访问 HTML 文档对象模型 (DOM)，都是不可能的。

解决这一问题的方法是使用进程间通信 (IPC)。可以使用 Electron 的 ipcMain 模块和 ipcRenderer 模块来进行进程间通信。 为了从你的网页向主进程发送消息，你可以使用 ipcMain.handle 设置一个主进程处理程序（handler），然后在预处理脚本中暴露一个被称为 ipcRenderer.invoke 的函数来触发该处理程序（handler）。

我们将向渲染器添加一个叫做 ping() 的全局函数来演示这一点。这个函数将返回一个从主进程翻山越岭而来的字符串。

首先，在预处理脚本中设置 invoke 调用：

在 Electron 中，预加载脚本可以用于在渲染进程和主进程之间进行通信。使用 ipcRenderer 的 send 和 on 方法可以实现这一点

工作流程
主进程创建窗口并加载 index.html 文件，同时指定 preload.js 为预加载脚本。
预加载脚本使用 contextBridge 将 sendMessage 和 onMessage 方法暴露给渲染进程。
渲染进程点击按钮时，会通过 sendMessage 方法发送消息到主进程，主进程接收到消息后会打印并回复。
渲染进程通过 onMessage 监听主进程的回复，并更新页面内容。
这样就实现了预加载脚本中使用 send 和 on 的基本用法！