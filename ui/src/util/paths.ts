import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const processSrcRoot = path.join(process.cwd(), 'src');
export const processUrlRoot = pathToFileURL(processSrcRoot);
