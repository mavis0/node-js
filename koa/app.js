const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    await next();

app.use(async (ctx, next) => {
    await next();
    ctx.response.tyep = 'text/html';
    ctx.response.body = '<h1> hello koa</h1>';
})
    ctx.response.tyep = 'text/html';
    ctx.response.body = '<h1> hello koa</h1>';
})

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
})

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const end = new Date().getTime();
    console.log(`it costs ${end - start} ms`);
})

app.listen(3000);
console.log('app started at port 3000 ...');