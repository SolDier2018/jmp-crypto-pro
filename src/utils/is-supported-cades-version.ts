export const isSupportedCadesVersion = (version: string): boolean => {
    const match = version.match(/(\d+)\.(\d+)\.(\d+)/);

    if (!match) {
        return false;
    }

    const [, major, minor, patch] = match;

    if (Number(major) < 2) {
        return false;
    }

    return !(Number(major) === 2 && Number(patch) < 12438);
};
