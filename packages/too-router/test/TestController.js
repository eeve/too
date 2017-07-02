import { rt, params, BaseController } from '../src'

@rt.controller('/api')
export class TestController extends BaseController {

	/**
	 * 通过params来指定合法参数名，以*开头参数名为必须参数
	 * @param {*} ctx
	 */
	@rt.all('/test', params('*id', '*name', '*age'))
	test(ctx) {
		// 合法的查询参数将会在ctx.$query对象中
		console.log('query:', ctx.$query);
		// 如果有文件上传，则文件对象将会在ctx.$files对象中
		console.log('files:', ctx.$files);
		if(parseInt(ctx.$query.age) < 18) {
			// 如果出现错误，可以直接抛出异常，异常消息将会出现在响应json的model字段
			throw new Error('未成年人🔞');
		}
		// 返回结果将会出现在响应json的model字段
		return 'hello world!';
	}

}
