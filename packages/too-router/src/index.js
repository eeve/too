import Router from 'koa-router';
export const router = new Router();

import * as all from './decorator/router';
export const rt = all;
export * from './decorator/router';
export * from './controller/BaseController';

export function params(...fields) {
	return async (ctx, next) => {

		// 设置合法参数
		ctx.$fields = fields;
		try {
			let result = await next();
			if(result === undefined) { return; };
			ctx.body = {
				error: false,
				model: result || 'success'
			};
		} catch({ message }) {
			ctx.body = {
				error: true,
				model: message
			}
		}

	}
}

export function register(ctrls) {

	console.log('注册mapping:');
	console.log('==========================================');
	for(let ctrl in ctrls) {
		let instance = new ctrls[ctrl]();
		router.use(instance.router.routes(), instance.router.allowedMethods());
	}
	console.log('==========================================');
	return router;

}
