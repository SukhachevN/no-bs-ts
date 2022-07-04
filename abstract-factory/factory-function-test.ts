import { createLogger } from './factory-function';

const logger = createLogger();

logger.debug('debug message');
logger.warn('warn message');
logger.info('info message');
logger.error('error message');
