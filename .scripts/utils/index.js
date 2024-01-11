import fs from 'fs';
import { createRequire } from 'module';
import path, { dirname } from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

/**
 * Strip the extension from a filename if it has one.
 * @param {string} name A filename.
 * @return {string} The filename without a path.
 */
export function stripExt(name) {
	const extension = path.extname(name);
	if (!extension) {
		return name;
	}

	return name.slice(0, -extension.length);
}

/**
 * Check if a module was run directly with node as opposed to being
 * imported from another module.
 * @param {ImportMeta} meta The `import.meta` object.
 * @return {boolean} The module was run directly with node.
 */
export function isMainModule(meta) {
	if (!meta || !process.argv[1]) {
		return false;
	}

	const require = createRequire(meta.url);
	const scriptPath = require.resolve(process.argv[1]);

	const modulePath = fileURLToPath(meta.url);

	const extension = path.extname(scriptPath);
	if (extension) {
		return modulePath === scriptPath;
	}

	return stripExt(modulePath) === scriptPath;
}

/** @param {string} dir */
export function mkdirp(dir) {
	try {
		fs.mkdirSync(dir, { recursive: true });
	} catch (/** @type {any} */ e) {
		if (e.code === 'EEXIST') return;
		throw e;
	}
}

/** @param {string} path */
export function rimraf(path) {
	fs.rmSync(path, { force: true, recursive: true });
}

export function write(file, contents) {
	mkdirp(dirname(file));
	fs.writeFileSync(file, contents);
}
