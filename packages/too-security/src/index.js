export export function Security(checkFn, noPremFn) {

	return function security(...args) {
		const permissions = args
		return function(target, name, descriptor) {
			const fn = descriptor.value;
			descriptor.value = function() {
				const ctx = arguments[0];
				if(checkFn && checkFn instanceof Function
				&& noPremFn && noPremFn instanceof Function) {
					const has = checkFn(permissions);
					if(!has) {
						return noPremFn('没有权限！');
					}
				}
				return fn.apply(this, arguments);
			};
		}
	}

}
