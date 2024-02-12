import { readFileSync, writeFileSync } from 'node:fs';

import { PackageJson } from 'nx/src/utils/package-json';

function getCurrentTimestamp(): string {
    const now = new Date();
    return [ now.getUTCDate(), now.getUTCMonth(), now.getUTCFullYear() ]
        .map((item) => item.toString().padStart(2, '0'))
        .join('.');
}

function syncProjectConstants(): void {
    const { version } = JSON.parse(readFileSync('package.json').toString()) as PackageJson;

    const versionConstant = `export const APP_VERSION = '${version}';`;
    const dateConstant = `export const APP_VERSION_AT = '${getCurrentTimestamp()}'; // UTC`;
    writeFileSync('src/app/constants/version.ts', `${versionConstant}\n${dateConstant}\n`, { encoding: `utf-8` });
}

(function main(): void {
    syncProjectConstants();
})();
