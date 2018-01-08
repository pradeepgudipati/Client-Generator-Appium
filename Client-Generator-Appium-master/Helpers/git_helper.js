'use strict';

const
	path = require('path'),
	fs = require('fs-extra'),
	spawn = require('child_process').spawn,
	Output = require('./output_helper.js');

class git_helper {
	/*****************************************************************************
	 * Clone the repo from GitHub, into the local directory
	 *
	 * @param {Object} repo - The Git repo URL to be cloned from
	 ****************************************************************************/
	static cloneRepo(repo) {
		return new Promise((resolve, reject) => {
			Output.info(`Cloning GitHub repo... `);

			const
				dir = repo.split('/').pop(),
				projRoot = path.join(global.projRoot, dir)

			// Remove the repo if it is already in the local project, to allow the latest one to be downloaded
			if(fs.existsSync(projRoot)) fs.removeSync(projRoot);

			let
				cmd = 'git',
				args = ['clone', repo];

			const prc = spawn(cmd, args);
			prc.stdout.on('data', data => {
				Output.debug(data);
			});
			prc.stderr.on('data', data => {
				Output.debug(data);
			});
			prc.on('exit', code => {
				(code !== 0) ? reject(`Error Cloning Repo`): Output.finish(resolve, null);
			});
		});
	}

	/*****************************************************************************
	 * Remove the project from the local directory
	 *
	 * @param {Object} config - The object containing project details
	 ****************************************************************************/
	static removeRepo(config) {
		return new Promise((resolve, reject) => {
			Output.info('Removing repo from local directory... ');

			let
				dir = config.git.split('/').pop(),
				repoPath = path.join(global.projRoot, dir);

			fs.remove(repoPath, err => {
				(err) ? reject(err): Output.finish(resolve, null);
			});
		});
	}
}

module.exports = git_helper;