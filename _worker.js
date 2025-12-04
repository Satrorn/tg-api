// 修改这里的代码，将 YOUR_BOT_TOKEN 替换为你的实际 Bot Token
const whitelist = ["/bot7832387863:"];

// Telegram API 的主机名
const tg_host = "api.telegram.org";

// 监听 fetch 事件
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

// 验证请求路径是否在白名单中
function validate(path) {
  for (let i = 0; i < whitelist.length; i++) {
    if (path.startsWith(whitelist[i])) {
      return true;
    }
  }
  return false;
}

// 处理请求的核心函数
async function handleRequest(request) {
  const url = new URL(request.url);
  // 修改请求的目标主机为 Telegram 官方服务器
  url.host = tg_host;

  // 检查路径是否合法
  if (!validate(url.pathname)) {
    return new Response('Unauthorized', { status: 403 });
  }

  // 创建转发到 Telegram API 的新请求
  const req = new Request(url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  try {
    // 发送请求到 Telegram API 并获取响应
    const result = await fetch(req);
    return result;
  } catch (error) {
    // 捕获并返回可能的错误
    return new Response('Error: ' + error.message, { status: 500 });
  }
}
