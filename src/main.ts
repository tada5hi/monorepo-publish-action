import { getInput, info } from '@actions/core';
import type { Package } from 'workspaces-publish';
import { publish } from 'workspaces-publish';

export async function run(): Promise<void> {
    const token = getInput('token', { required: true });
    const registry = getInput('registry', { required: true });
    const cwd = getInput('cwd') || process.cwd();

    const packages : Package[] = await publish({
        token,
        registry,
        cwd,
        rootPackage: true,
    });

    if (packages.length === 0) {
        info('No packages need to be published.');
        return;
    }

    for (let i = 0; i < packages.length; i++) {
        info(`published ${packages[i].content.name}@${packages[i].content.version}`);
    }
}
