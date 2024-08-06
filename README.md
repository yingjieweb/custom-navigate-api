# Custom-navigate-api

一种比较神奇的页面间的通信方式

### 通信流程

1. **Page A**：

   - 在页面 A 中，用户点击按钮触发跳转到页面 B 的逻辑。
   - 在跳转之前，页面 A 使用 `Taro` 的 `eventCenter.once` 方法监听 `formDataChange` 事件，并将跳转操作包装在一个 Promise 中，等待页面 B 返回的数据。

2. **Page B**：

   - 页面 B 加载时，从 URL 参数中获取初始表单值，并将其设置为表单的默认值。
   - 用户在页面 B 修改表单内容，并在提交时触发 `eventCenter.trigger` 事件，将表单数据通过 `formDataChange` 事件发送回页面 A。
   - 然后，页面 B 使用 `Taro.navigateBack()` 返回页面 A。

3. **Page A**：
   - 页面 A 中等待的 Promise 通过监听的 `formDataChange` 事件被触发，接收到页面 B 返回的表单数据。
   - 页面 A 获取到数据后，更新其内部状态并重新渲染界面，显示从页面 B 接收的新表单数据。

### 效果预览

![image](./src/assets/preview_image.gif)
