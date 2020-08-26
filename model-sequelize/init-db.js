const model = require('./model');

model.sync().then(() => {
    console.log('init db ok.');
}).catch((err) => {
    console.log(`init error: ${err}`);
}).finally(() => {
    process.exit(0);
});