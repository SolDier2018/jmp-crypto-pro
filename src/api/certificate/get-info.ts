import { Certificate } from './certificate';
import { getCadesProp } from './get-cades-prop';
import type { TTagsTranslations, TTagTranslation } from '../../types';
import { afterPluginsLoaded, parseCertInfo } from '../../utils';

export const getInfo = afterPluginsLoaded(async function (
    this: Certificate,
    tags: TTagsTranslations[],
    entitiesPath: string
): Promise<TTagTranslation[]> {
    let entities: string;

    try {
        entities = await getCadesProp.call(this, entitiesPath);
    } catch (error) {
        console.error(error);

        throw new Error('Ошибка при извлечении информации из сертификата');
    }

    return parseCertInfo(tags, entities);
});
