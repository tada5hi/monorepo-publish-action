import { error, getInput, info } from '@actions/core';
import type { Package } from 'workspaces-publish';
import {
    getUnpublishedPackages,
    publishPackages,
    readPackageJson,
    readWorkspacePackages,
} from 'workspaces-publish';

export async function run(): Promise<void> {
    const token = getInput('token', { required: true });
    const registry = getInput('registry', { required: true });
    const cwd = getInput('cwd') || process.cwd();

    let packages : Package[] = [];

    const pkg = await readPackageJson(cwd);
    if (!Array.isArray(pkg.workspaces)) {
        error('No workspaces defined.');
        process.exit(0);
    }

    packages.push(...await readWorkspacePackages(pkg.workspaces!, cwd));

    packages = await getUnpublishedPackages(packages);
    if (packages.length === 0) {
        info('No packages need to be published.');
        process.exit(0);
    }

    await publishPackages(packages, {
        token,
        registry,
    });

    for (let i = 0; i < packages.length; i++) {
        if (packages[i].published) {
            info(`published ${packages[i].content.name}@${packages[i].content.version}`);
        } else {
            info(`already published ${packages[i].content.name}@${packages[i].content.version}`);
        }
    }
}
