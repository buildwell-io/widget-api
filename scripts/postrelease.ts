import { readFileSync, writeFileSync } from 'node:fs';

import { execSync } from 'child_process';
import { PackageJson } from 'nx/src/utils/package-json';

function getCurrentTimestamp(): string {
    const now = new Date();
    return [ now.getUTCDate(), now.getUTCMonth(), now.getUTCFullYear() ]
        .map((item) => item.toString().padStart(2, '0'))
        .join('.');
}

function syncProjectConstants(version: string): void {
    const versionConstant = `export const APP_VERSION = '${version}';`;
    const dateConstant = `export const APP_VERSION_AT = '${getCurrentTimestamp()}'; // UTC`;
    writeFileSync('src/app/constants/version.ts', `${versionConstant}\n${dateConstant}\n`, { encoding: `utf-8` });
}

function updateGitIndexAndPush(version: string): void {
    execSync('git add ./package.json', { stdio: `inherit` });
    execSync('git add ./src/app/constants/version.ts', { stdio: `inherit` });
    execSync(`git commit -a -n -m 'chore(release): ${version}'`);
    execSync(`git tag -a v${version} -m "Release ${version}"`);
    execSync('git push --set-upstream origin', { stdio: 'inherit', encoding: 'utf-8' });
    execSync('git push --set-upstream origin --tags', { stdio: 'inherit', encoding: 'utf-8' });
}

(function main(): void {
    const { version } = JSON.parse(readFileSync('package.json').toString()) as PackageJson;

    syncProjectConstants(version);
    updateGitIndexAndPush(version);
})();
