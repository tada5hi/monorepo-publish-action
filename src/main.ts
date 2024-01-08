import { getInput, info, setFailed } from '@actions/core';
import type { Package } from 'workspaces-publish';
import { publish } from 'workspaces-publish';

export async function run(): Promise<void> {
    const token = getInput('token') || undefined;
    const registry = getInput('registry') || undefined;
    const cwd = getInput('cwd') || undefined;

    try {
        const packages: Package[] = await publish({
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
    } catch (e) {
        if (e instanceof Error) setFailed(e.message);
    }
}
