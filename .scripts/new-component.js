import { isMainModule, write, mkdirp } from './utils/index.js';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import prompt from 'enquirer';
import fs from 'fs';
import kleur from 'kleur';
import { indexJS, svelteFile } from './utils/componentFiles.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const cwd = join(__dirname, '..');

const DIR_LIB_COMPONENTS = join(cwd, 'src', 'lib', 'components');

const COMPONENTS_FOLDERS = fs.readdirSync(DIR_LIB_COMPONENTS).map((comp) => comp.toLowerCase());
const FOLDERS = [...new Set([...COMPONENTS_FOLDERS])];

const relativePath = (path) => kleur.green(relative(cwd, path).replaceAll('\\', '/'));

async function pickComponentName() {
	console.log('What is the component name? Leave empty to exit.');

	/** @type {{componentName: string}} */
	const { componentName } = await prompt.prompt({
		type: 'input',
		name: 'componentName',
		message: 'Name'
	});

	if (componentName === '') {
		process.exit();
	}

	const resLower = componentName.toLowerCase();

	// Check if component already exists
	if (FOLDERS.includes(resLower)) {
		console.log(`Component ${componentName} already exists! Choose a different name`);
		return pickComponentName();
	}

	return componentName;
}

export async function run() {
	// 1. Ask for component name
	const nameLower = await pickComponentName();

	// Capitalize it
	const name = nameLower[0].toUpperCase() + nameLower.slice(1);

	// Create necessary files
	// Folders
	const dirComp = join(DIR_LIB_COMPONENTS, name);

	mkdirp(dirComp);

	// Files
	const filepathIndex = join(dirComp, 'index.ts');
	const filepathSvelte = join(dirComp, `${name}.svelte`);

	// Add to component exports
	const exportPath = join(DIR_LIB_COMPONENTS, 'index.ts');
	const exports = fs.readFileSync(exportPath).toString();
	write(exportPath, exports + `\nexport * from './${name}';`);

	write(filepathIndex, indexJS(name));
	write(filepathSvelte, svelteFile(name));

	console.log(kleur.cyan(`Component "${name}" generated!`) + `\nFile to edit:\n`);
	console.log(relativePath(filepathSvelte));
}

if (isMainModule(import.meta)) {
	run();
}
