import { OIDS_DICTIONARY } from '../constants';
import type { TTagsTranslations, TTagTranslation } from '../types';

export const parseCertInfo = (
    tagsTranslations: TTagsTranslations[],
    rawInfo: string
): TTagTranslation[] => {
    const extractedEntities: string[] | null = rawInfo.match(
        /([а-яА-Яa-zA-Z0-9\s.]+)=(?:("[^"]+?")|(.+?))(?:,|$)/g
    );

    if (extractedEntities) {
        return extractedEntities.map((group) => {
            const segmentsMatch = group.trim().match(/^([а-яА-Яa-zA-Z0-9\s.]+)=(.+?),?$/);

            let title = segmentsMatch?.[1] || '';

            // Вырезаем лишние кавычки
            const description =
                segmentsMatch?.[2]?.replace(/^"(.*)"$/, '$1')?.replace(/"{2}/g, '"') || '';
            const oidIdentifierMatch = title.match(/^OID\.(.*)/);
            const oidIdentifier = oidIdentifierMatch?.[1];

            let isTranslated = false;

            // Если нашли в тайтле ОИД, пытаемся его расшифровать
            if (oidIdentifier) {
                const oidTranslation = OIDS_DICTIONARY[oidIdentifier];

                if (oidTranslation) {
                    title = oidTranslation;
                    isTranslated = true;
                }
            }

            const tagTranslation = tagsTranslations.find((tag) =>
                tag.possibleNames.includes(title)
            )?.translation;

            if (tagTranslation) {
                title = tagTranslation;
                isTranslated = true;
            }

            return { description, title, isTranslated };
        });
    }

    return [];
};
