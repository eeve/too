import Logger from '../src';

let logger = new Logger({
	writeFile: true
});

logger.debug('测试DEBUG信息');
logger.info('测试INFO信息');
logger.warn('测试WARN信息');
logger.error('测试ERROR信息');
