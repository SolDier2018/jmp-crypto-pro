import { afterPluginsLoaded } from '../../utils';
import { Certificate } from './certificate';

export const hasExtendedKeyUsage = afterPluginsLoaded(async function (
    this: Certificate,
    oids: string | string[]
): Promise<boolean> {
    const certOids = await this.getExtendedKeyUsage();

    let result: boolean;

    if (Array.isArray(oids)) {
        result = oids.every((oidToCheck) => certOids.some((certOid) => certOid === oidToCheck));
    } else {
        result = certOids.some((certOid) => certOid === oids);
    }

    return result;
});
