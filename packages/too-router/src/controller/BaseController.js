import Router from 'koa-router';
import formatParamsMiddleware from '../middleware/format_params';

export class BaseController {

	constructor() {

		this.router = new Router();

		for (const { method, url, middleware, fnName } of this.$routes) {
			console.log(`${method}`.toUpperCase(), url)
			// 所有middleware -+> 参数格式化middleware
			this.router[method](url, ...[ ...middleware, formatParamsMiddleware ], this[fnName].bind(this))
		}

	}

}
