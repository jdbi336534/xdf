const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const serve = require('koa-static');
// const koaBody = require('koa-body');
const index = require('./routes/index')
const users = require('./routes/users')
const path = require('path');
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(koaBody({ multipart: true }));
app.use(serve(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start;
  //  const ckies = ctx.cookies.get('token');
  console.log(`${ctx.method}-*-${ctx.url} - ${ms}ms`);
})
// serve files from ./public

// app.use(serve(path.join(__dirname, '/public')));
// routes
app.use(index.routes(), index.allowedMethods())
app.use( users.routes(), users.allowedMethods())
// //装载子路由
// router.use('/api', users.routes(), users.allowedMethods());
// //加载路由中间件
// app.use(router.routes()).use(router.allowedMethods());
module.exports = app
