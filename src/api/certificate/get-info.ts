import { Certificate } from './certificate';
import { getCadesProp } from './get-cades-prop';
import { afterPluginsLoaded, parseCertInfo } from '../../utils';
import type { TTagsTranslations, TTagTranslation } from '../../types';

export const getInfo = afterPluginsLoaded(async function (
    this: Certificate,
    tags: TTagsTranslations[],
    entitiesPath: string
): Promise<TTagTranslation[]> {
    let entities: string;

    console.log('--this');

    try {
        entities = await getCadesProp.call(this, entitiesPath);
    } catch (error) {
        console.error(error);

        throw new Error('Ошибка при извлечении информации из сертификата');
    }

    return parseCertInfo(tags, entities);
});
