import { afterPluginsLoaded } from '../utils';

import type { TSystemInfo } from '../types';

export const getSystemInfo = afterPluginsLoaded(async (): Promise<TSystemInfo> => {
    const { cadesplugin } = window;

    const sysInfo = {
        cadesVersion: '',
        cspVersion: '',
    };

    try {
        let cadesAbout = await cadesplugin.CreateObjectAsync('CAdESCOM.About');

        sysInfo.cadesVersion = await cadesAbout.PluginVersion;
        sysInfo.cspVersion = await cadesAbout.CSPVersion();

        sysInfo.cadesVersion = await sysInfo.cadesVersion.toString();
        sysInfo.cspVersion = await sysInfo.cspVersion.toString();
    } catch (error) {
        throw new Error('Ошибка при получении информации о системе');
    }

    return sysInfo;
});
