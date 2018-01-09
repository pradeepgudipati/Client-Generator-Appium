'use strict';

const
	path = require('path'),
	fs = require('fs-extra');

// Colours to be used in the console logging
const
	Red = '\x1b[31m',
	Grey = '\x1b[37m',
	Reset = '\x1b[0m',
	Green = '\x1b[32m',
	Yellow = '\x1b[33m';

class output_helper {
	/*****************************************************************************
	 * Writes a green done to the console and resolves the promise if passed
	 *
	 * @param {Function} done - Promise callback passed from the function
	 ****************************************************************************/
	static finish(done, value) {
		appendLog('basic', `Done\n`, false);
		if(global.logging === 'basic') {
			process.stdout.write(`${Green}Done${Reset}\n`);
		}

		if(done) done(value);
	}

	/*****************************************************************************
	 * Writes a yellow skip to the console and resolves the promise if passed
	 *
	 * @param {Function} done - Promise callback passed from the function
	 ****************************************************************************/
	static skip(done, value) {
		appendLog('basic', `Skipping\n`, false);
		if(global.logging === 'basic') {
			process.stdout.write(`${Yellow}Skipping${Reset}\n`);
		}

		if(done) done(value);
	}

	/*****************************************************************************
	 * Writes a message with a green info tag (note no new line is passed by
	 * default)
	 *
	 * @param {String} message - A string to be output after the info tag
	 ****************************************************************************/
	static info(message) {
		appendLog('basic', `[INFO] ${message}`, true);
		appendLog('debug', `[INFO] ${message}\n`, true);
		if(global.logging === 'basic') {
			process.stdout.write(`${Green}[INFO]${Reset} ${message}`);
		} else {
			process.stdout.write(`${Green}[INFO]${Reset} ${message}\n`);
		}
	}

	/*****************************************************************************
	 * Outputs all of a string in red
	 *
	 * @param {String} message - String to be output
	 ****************************************************************************/
	static error(message) {
		appendLog('basic', `\n[ERROR] ${message}\n`, true);
		appendLog('debug', `[ERROR] ${message}\n`, true);
		if(global.logging === 'basic') {
			process.stdout.write(`\n${Red}[ERROR] ${message}${Reset}\n`);
		} else {
			process.stdout.write(`${Red}[ERROR] ${message}${Reset}\n`);
		}
	}

	/*****************************************************************************
	 * Creates a banner and a green info tag around a message
	 *
	 * @param {String} message - String to be enclosed by the banner
	 ****************************************************************************/
	static banner(message) {
		appendLog('both', `\n############### ${message} ###############\n`, false);
		process.stdout.write('\n-------------------------------------------------------\n');
		process.stdout.write(`${Green}[INFO]${Reset} ${message}\n`);
		process.stdout.write('-------------------------------------------------------\n');
	}

	/*****************************************************************************
	 * Outputs a message when the debug flag is used
	 *
	 * @param {String} message - String to be output
	 ****************************************************************************/
	static debug(message) {
		appendLog('debug', `[DEBUG] ${message}`, true);
		if(global.logging === 'debug') {
			process.stdout.write(`${Grey}[DEBUG] ${message}${Reset}`)
		}
	}

	/*****************************************************************************
	 * Append data into the log only
	 *
	 * @param {String} message - String to be output
	 ****************************************************************************/
	static log(message) {
		appendLog('both', `[LOG] ${message}\n`, true);
	}

	/*****************************************************************************
	 * Creates the logging records for a new run, setting up an overhead
	 * directory, containing a log of formatted data, and a log of debug data. It
	 * also creates a directory for storing any screenshots of failed tests.
	 ****************************************************************************/
	static setupLogDir() {
		return new Promise((resolve, reject) => {
			// Build up the paths to the relevant files
			const
				logRoot = path.join(global.projRoot, 'Logs'),
				logPath = path.join(logRoot, global.timestamp),
				logBasicFile = path.join(logPath, 'basic.log'),
				logDebugFile = path.join(logPath, 'debug.log'),
				screenshots = path.join(logPath, 'Screen Shots'),
				reportRoot = path.join(global.projRoot, 'Reports');

			try {
				// If the log directory doesn't exist then make it
				fs.ensureDirSync(logRoot);
				// Create/Empty the JUnit report directory
				fs.emptyDirSync(reportRoot);
				// Make the directory for storing all the data for this run
				fs.mkdirSync(logPath);
				// Create a directory to store the failure screenshots for this run
				fs.mkdirSync(screenshots);
				// Create an empty file for the basic logging output
				fs.closeSync(fs.openSync(logBasicFile, 'w'));
				// Create an empty file for the debug logging output
				fs.closeSync(fs.openSync(logDebugFile, 'w'));

				resolve(null);
			} catch(err) {
				// If a log file already exists we don't need a new one
				if(err.code === 'EEXIST') return resolve(null);

				reject(err);
			}
		});
	}

	/*******************************************************************************
	 * Generates a timestamp for use in logging and screenshots
	 *
	 * @param {Object} now - The time at which the function was called
	 * @param {Boolean} full - The full date and time, or just time
	 ******************************************************************************/
	static generateTimestamp(now, full) {
		const
			timeOptions = {
				hour12: false, // Rule Britannia
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			},
			dateOptions = {
				day: 'numeric',
				year: 'numeric',
				month: 'numeric'
			};

		let
			date = now.toLocaleDateString('en-gb', dateOptions).replace(/\//g, '-'),
			time = now.toLocaleTimeString('en-gb', timeOptions);

		if(full) return(`${date} ${time}`);
		if(!full) return(time);
	}
}

/*******************************************************************************
 * Write a message into one or both logs depending on the type of message that
 * needs to be written.
 *
 * @param {String} type - The type of logging that the message is for
 * @param {String} message - The string to write to the relevant log file
 * @param {Boolean} time - A bool value for whether a timestamp should be added
 ******************************************************************************/
function appendLog(type, message, time) {
	const
		logBasicFile = path.join(global.projRoot, 'Logs', global.timestamp, 'basic.log'),
		logDebugFile = path.join(global.projRoot, 'Logs', global.timestamp, 'debug.log');

	if(time) message = `[${output_helper.generateTimestamp(new Date(), false)}] ${message}`;

	try {
		// Append to the relevant log depending on the type of message
		if(type === 'basic' || type === 'both') fs.appendFileSync(logBasicFile, message);
		if(type === 'debug' || type === 'both') fs.appendFileSync(logDebugFile, message);
	} catch(err) {
		// Do Nothing
	}
}

module.exports = output_helper;
