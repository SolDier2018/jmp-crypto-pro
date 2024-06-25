const oldestSupportedCSPVersion = 4.0;

export const isSupportedCSPVersion = (version: string): boolean => {
    const localVersion = version.match(/\d+?\b(?:\.\d+)?/)?.[0];

    return Number(localVersion) >= oldestSupportedCSPVersion;
};
