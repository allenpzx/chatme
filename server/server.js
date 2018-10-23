require("babel-core").transform("code", options);
const path = require('path');
const express = require('express');
const Provider = require('react-redux');
const renderToString = require('react-dom/server');
const store = require('../src/store/index.js');
const BrowserRouter = ("react-router-dom");
const app = express();
const port = 9093;

app.use('/static', express.static('static'));
app.use(handleRender);

function handleRender(req, res) {
    const html = renderToString(
      <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider>
    )
    const preloadedState = store.getState();
    res.send(renderFullPage(html, preloadedState));
}
function renderFullPage(html, preloadedState) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>ChatMe</title>
          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // 警告：关于在 HTML 中嵌入 JSON 的安全问题，请查看以下文档
            // http://redux.js.org/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="/static/bundle.js"></script>
        </body>
      </html>
      `
}

app.listen(port);