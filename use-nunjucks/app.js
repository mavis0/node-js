// const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');

// const app = new Koa();

const nunjucks = require('nunjucks');
function createEnv(path, opts) {
    var 
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            }
        );
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: n => ('0x' + n.toString(16))
    }
})
console.log(env.render('hello.html', {name: '<script>alert("小明")</script>'}));

// app.use(async (ctx, next) => {
//     console.log(`${ctx.request.method} ${ctx.request.url}`);
//     await next();
// })

// app.use(bodyParser());
// app.use(controller());
// app.listen(3000);
// console.log('app started at port 3000 ...');