# 贪吃蛇（简单版）

这是一个可以直接在浏览器中打开的简单贪吃蛇小游戏。

文件列表：
- `index.html` — 游戏页面
- `style.css` — 简单样式
- `script.js` — 游戏逻辑

运行方法：
1. 在文件管理器中双击 `index.html` 用浏览器打开即可。

可选：通过本地 HTTP 服务运行（推荐用于某些浏览器的本地文件限制）：

在 PowerShell 中（如果安装了 Python）：

```powershell
# 在项目目录下运行
python -m http.server 8000; Start-Process "http://localhost:8000/index.html"
```

说明：
- 使用方向键或 W/A/S/D 控制蛇的移动。
- 吃到食物分数增加并微幅加速。
- 撞墙或撞到自己游戏结束，点击“重新开始”重置游戏。

祝玩得开心！
