export default function Security(checkFn, noPremFn) {

	return function security(...args) {
		const permissions = args
		return function(target, name, descriptor) {
			const fn = descriptor.value;
			descriptor.value = function() {
				const ctx = arguments[0];
				if(checkFn && checkFn instanceof Function
				&& noPremFn && noPremFn instanceof Function) {
					const has = checkFn.call(ctx, {
						target: target,
						controller: target.constructor.name,
						method: name,
						fn: fn,
						permission: permissions
					});
					if(!has) {
						return noPremFn.call(ctx, '没有权限！');
					}
				}
				return fn.apply(this, arguments);
			};
		}
	}

}
