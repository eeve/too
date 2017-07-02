const PREFIX = '$$route_'

function formatArgs(args) {
	const hasRoute = typeof args[0] === 'string'
	const route = hasRoute ? args[0] : ''
	const middleware = hasRoute ? args.slice(1) : args
	if (middleware.some(m => typeof m !== 'function')) {
    throw new Error('Middleware must be function')
  }
	return [ route, middleware ]
}

export function controller(...args) {
	const [ controllerRoute, controllerMiddleware ] = formatArgs(args)
  return function(target) {
		const proto = target.prototype
		proto.$routes = Object.getOwnPropertyNames(proto)
			.filter(prop => prop.indexOf(PREFIX) === 0)
			.map(prop => {
        const {method, route: actionRoute, middleware: actionMiddleware} = proto[prop]
				const url = `${controllerRoute}${actionRoute}`
				const middleware = [].concat(controllerMiddleware, actionMiddleware)
				const fnName = prop.substring(PREFIX.length)
				return {
					method: method === 'del' ? 'delete' : method,
					url,
					middleware,
					fnName
				}
			});
  }
}

export function mapping(method, ...args) {
	if(typeof method !== 'string') {
		throw new Error('The first argument must be an HTTP method')
	}
	const [ route, middleware ] = formatArgs(args)
  return function(target, name, descriptor) {
		target[`${PREFIX}${name}`] = { method, route, middleware }
  }
}

const methods = ['head', 'options', 'get', 'post', 'put', 'patch', 'del', 'delete', 'all']
methods.forEach(method => exports[method] = mapping.bind(null, method))
