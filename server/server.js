const express = require('express');
const app = express();
const port = 9093;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./api/v1/user.js');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/v1', userRouter);

app.listen(port, function (){
  console.log(`express app is listented on port ${port}`); 
});

// function handleRender(req, res) {
//     const html = ReactDOMServer.renderToString(
//       <Provider store={store}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//       </Provider>
//     )
//     const preloadedState = store.getState();
//     res.send(renderFullPage(html, preloadedState));
// }
// function renderFullPage(html, preloadedState) {
//     return `
//       <!doctype html>
//       <html>
//         <head>
//           <title>ChatMe</title>
//           <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
//         </head>
//         <body>
//           <div id="root">${html}</div>
//           <script>
//             // 警告：关于在 HTML 中嵌入 JSON 的安全问题，请查看以下文档
//             // http://redux.js.org/recipes/ServerRendering.html#security-considerations
//             window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
//           </script>
//           <script src="/static/bundle.js"></script>
//         </body>
//       </html>
//       `
// }