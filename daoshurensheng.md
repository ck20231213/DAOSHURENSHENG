
# 《倒数人生》小程序 — Cursor 分步指令手册  
*版本：v1.0 日期：2025‑04‑30*

---

## 0️⃣  为什么推荐 **逐步指令** 而不是一次性需求

1. **上下文更清晰**  
   Cursor 会根据最近的代码和对话生成内容，拆分任务能减少混乱、避免遗漏。  
2. **及时调试**  
   每一步生成后即可在微信开发者工具中跑通、立刻修复 bug。  
3. **灵活回滚**  
   若结果不满意，可以撤销最近一次而不用整体推倒重来。  

> **使用方法：**  
> - 打开 Cursor，新建空文件夹并 `Open in VS Code`（或直接在 Cursor 里新建 Workspace）  
> - 依次复制下面 **Step 1 → Step 10** 的块状指令给 Cursor  
> - 每执行完一步、确认没报错后，再继续下一步  
> - 若出现红色报错，把报错发给 Cursor 并说：“请修复这个报错”  

---

## 1️⃣ Step 1 — 初始化项目结构
```plain
你是前端开发助手，请为我创建一个微信小程序项目，名称《倒数人生》。  
功能概要：1) 用户输入出生年月日；2) 以 30000 天为总寿命计算已活/剩余天数；3) 结果页展示数字、环形进度条和每日金句。  
请先生成基本目录：pages/index, pages/result, utils, app.js/json/wxss，并写空白页面。  
```

---

## 2️⃣ Step 2 — 首页输入 (index)
```plain
在 pages/index/index.wxml 添加一个日期 Picker（placeholder "请选择生日"），  
一个按钮“开始倒计时”。  
在 index.js 捕获日期并在点击按钮时 `wx.navigateTo` 到 pages/result/result，  
通过 URL 参数传递日期字符串 birth=YYYY‑MM‑DD。  
```

---

## 3️⃣ Step 3 — 结果页逻辑 (result)
```plain
在 result.js  
1. 读取 options.birth；  
2. 计算已活天数、剩余天数（30000‑used）；  
3. 计算 percentUsed = used/30000；  
4. setData 到页面；  
5. 页面展示：  
   * 大号数字：剩余天数  
   * 小号数字：已活天数  
   * 百分比文字  
   * 留一个 <canvas id="lifeRing"> 用于环形进度条  
   * 每日金句占位 div  
```

---

## 4️⃣ Step 4 — 工具函数 (utils)
```plain
新增 utils/dateUtils.js：export function getDaysBetween(start, end) { /* … */ }  
新增 utils/quotes.js：定义 5 句金句，并导出 getQuote() 随机返回一句。  
在 result.js 引入并调用 getQuote()。  
```

---

## 5️⃣ Step 5 — 环形进度条
```plain
请在 result 页面用 canvas 绘制环形进度条：  
- 圆环半径 120rpx，线宽 16rpx；  
- 起点 12 点方向；  
- 动画 800ms 从 0 → percentUsed；  
- 中心显示 percentUsed*100 保留 1 位小数。  
```

---

## 6️⃣ Step 6 — 设置期望寿命 (settings)
```plain
新增 pages/settings：  
- Slider 或 Input 让用户把目标寿命改为 25000‑40000 区间；  
- 存储到 wx.setStorageSync('targetDays', value)；  
- index/result 页面先读取，没有则默认 30000。  
```

---

## 7️⃣ Step 7 — 愿望清单 (wishes)
```plain
新增 pages/wishes  
- 输入框 + “添加”按钮，可写入愿望文本；  
- 愿望列表可长按删除；  
- 数据保存在 wx.getStorageSync('wishes') 数组。  
```

---

## 8️⃣ Step 8 — 分享卡片
```plain
在 result 页面新增“分享”按钮，点击调用 canvas 2D：  
- 绘制白色背景 1080x1920；  
- 写入 “我还剩 XXX 天” / 百分比 / 金句；  
- 导出成临时文件并 `wx.saveImageToPhotosAlbum`；  
- 返回分享成功 / 失败提示。  
```

---

## 9️⃣ Step 9 — 重要节点提醒
```plain
在 result.js 判断 remainingDays == 10000 / 5000 / 1000 时，  
顶部 WXSS 用红色 banner 显示 “重要提醒：你的人生只剩 1000 天！”  
```

---

## 🔟 Step 10 — 代码审查 & 打包
```plain
帮我全局搜索 TODO；解决遗漏；  
为核心函数添加 JSDoc；优化冗余变量；  
最后输出 “项目已准备好，可在微信开发者工具 → 预览”。  
```

---

### ⭐️ 附录：向 Cursor 提 Bug 的示例
```plain
运行 result 页面时控制台报错：Cannot read property 'getContext' of null  
请检查 canvas 初始化时机并修复。
```

---

> **复制贴士**  
> - 建议每个 Step 独立发送，防止超时。  
> - 若想同时执行多步，可合并 2‑3 个 Step 一起发。  
> - 若 Cursor 回复不完整，补上一句 “继续” 即可。

祝编码顺利！  
