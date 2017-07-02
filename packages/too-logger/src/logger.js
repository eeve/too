import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import EventEmitter from 'events';
import chalk from 'chalk';
import iconv from 'iconv-lite';
import moment from 'moment';
import Merge from './merge';
import defaults from './defaults';

export default class Logger extends EventEmitter {

	constructor (options) {
		super();

		this.opt = Merge.deep(true, defaults, options);

		if (this.opt.encoding === 'utf8') this.opt.encoding = 'utf-8';

		let filename = moment().format(this.opt.format);

  	this.logpath = path.join(this.opt.logdir, filename);

		if (this.opt.writeFile) {
			try {
				mkdirp.sync(path.dirname(this.logpath));
			} catch (err) {
				// ignore
			}
		}
	}

	_appendLogFile(content) {
		return new Promise((resolve, reject) => {
			fs.appendFile(this.logpath, content, (err) => {
				err ? reject(err) : resolve();
			});
		});
	}

	_encode (string) {
		return iconv.encode(string + '\r', 'utf-8');
	}

	async _raw (o) {
		let msg = `${o.ts} ${o.levelRaw}\t${o.content}\r`;
		if(this.opt.writeFile) {
			await this._appendLogFile(msg);
		}
		console.log(this.opt.colorful ? `${o.ts} ${o.level}\t${o.content}\r` : msg);
	}

	debug (msg) {
		this._raw({
			level: chalk.green.bold('DEBUG'),
			levelRaw: 'DEBUG',
			ts: moment().format('HH:MM:SS'),
			content: msg
		});
		this.emit('debug', o);
	}

	info (msg) {
		this._raw({
			level: chalk.blue.bold('INFO'),
			levelRaw: 'INFO',
			ts: moment().format('HH:MM:SS'),
			content: msg
		});
		this.emit('info', o);
	}

	warn (msg) {
		this._raw({
			level: chalk.yellow.bold('WARN'),
			levelRaw: 'WARN',
			ts: moment().format('HH:MM:SS'),
			content: msg
		});
		this.emit('warn', o);
	}

	error (msg) {
		let o = {
			level: chalk.red.bold('ERROR'),
			levelRaw: 'ERROR',
			ts: moment().format('HH:MM:SS'),
			content: msg
		};
	 	this._raw(o);
	 	this.emit('error', o);
	}

}
