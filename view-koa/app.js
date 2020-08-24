const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');

const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
})
if (!isProduction) {
    const staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));
app.use(controller());
app.listen(3000);
console.log('app started at port 3000 ...');