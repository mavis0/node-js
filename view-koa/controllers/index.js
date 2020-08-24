var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    })
}

var fn_signin = async (ctx, next) => {
    var 
        email = ctx.request.body.email || '', 
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${email}, password: ${password}`);
    if (email  === 'admin@example.com' && password === '12345'){
        ctx.render('signin-ok.html', {
            title: 'Sign In OK',
            name: 'Mr. Node'
        })
    } else {
        ctx.render('signin-failed.html', {
            title: 'Signin Failed'
        })
    }
}

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}