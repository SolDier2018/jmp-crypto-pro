import { OIDS_DICTIONARY } from '../../constants';
import { afterPluginsLoaded } from '../../utils';
import { Certificate } from './certificate';

export type ExtendedKeysTranslations = {
    [key: string]: string | null;
};

export const getDecodedExtendedKeyUsage = afterPluginsLoaded(async function (
    this: Certificate
): Promise<ExtendedKeysTranslations> {
    const certificateOids = await this.getExtendedKeyUsage();

    return certificateOids.reduce(
        (decodedOids, oidCode) => ({
            ...decodedOids,
            [oidCode]: OIDS_DICTIONARY[oidCode] || null,
        }),
        {}
    );
});
