export type TTagsTranslations = {
    possibleNames: string[];
    translation: string;
};

export type TTagTranslation = {
    description: string;
    title: string;
    isTranslated: boolean;
};

export type TAlgorithmInfo = {
    algorithm: string;
    oid: string;
};

export type TSystemInfo = {
    cadesVersion: string;
    cspVersion: string;
};
