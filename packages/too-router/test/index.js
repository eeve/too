import Koa from 'koa';

const app = new Koa();

// koa body
import body from 'koa-body';
app.use(body({ formidable:{ uploadDir: __dirname }, multipart: true }));

app.use((ctx, next) => {
	console.log('前置中间件...');
	return next();
});

// router
import { register } from '../src'
import * as ctrls from './TestController'
const router = register(ctrls)
app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
app.listen(port);
console.log(`Server running at http://localhost:${port}/`)
console.log(`------------------------------------------------`)
