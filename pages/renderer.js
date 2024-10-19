const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome (v${electron.chrome()}), Node.js (v${electron.node()}), 和 Electron (v${electron.electron()})`


const button = document.getElementById('sendButton');
const responseDiv = document.getElementById('response');

button.addEventListener('click', () => {
    window.electron.sendMessage('你好，主进程！');
});

window.electron.onMessage((message) => {
    responseDiv.innerText = message; // 显示来自主进程的消息
});
const func = async () => {
    const response = await window.electron.ping()
    alert(response)

}

func() 