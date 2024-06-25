import {
    afterPluginsLoaded,
    generateCadesFn,
    cadesAsyncToken,
    createCadesPluginObject,
} from '../utils';

export type TSystemInfo = {
    cadesVersion: string;
    cspVersion: string;
};

export const getSystemInfo = afterPluginsLoaded((): TSystemInfo => {
    const sysInfo = {
        cadesVersion: '',
        cspVersion: '',
    };

    return eval(
        generateCadesFn(function getSystemInfo(): TSystemInfo {
            let cadesAbout;

            try {
                cadesAbout = cadesAsyncToken + createCadesPluginObject('CAdESCOM.About');

                sysInfo.cadesVersion = cadesAsyncToken + cadesAbout.PluginVersion;
                sysInfo.cspVersion = cadesAsyncToken + cadesAbout.CSPVersion();

                if (!sysInfo.cadesVersion) {
                    sysInfo.cadesVersion = cadesAsyncToken + cadesAbout.Version;
                }

                sysInfo.cadesVersion = cadesAsyncToken + sysInfo.cadesVersion.toString();
                sysInfo.cspVersion = cadesAsyncToken + sysInfo?.cspVersion.toString();
            } catch (error) {
                console.error(error);

                throw new Error('Ошибка при получении информации о системе');
            }

            return sysInfo;
        })
    );
});
