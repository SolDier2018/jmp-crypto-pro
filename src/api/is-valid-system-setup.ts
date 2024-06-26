import { afterPluginsLoaded, isSupportedCadesVersion, isSupportedCSPVersion } from '../utils';
import { getSystemInfo } from './get-system-info';
import type { TSystemInfo } from '../types';

export const isValidSystemSetup = afterPluginsLoaded(async (): Promise<boolean> => {
    let systemInfo: TSystemInfo;

    try {
        systemInfo = await getSystemInfo();
    } catch (error) {
        throw new Error('Настройки ЭП на данной машине не верны');
    }

    if (!isSupportedCadesVersion(systemInfo.cadesVersion)) {
        throw new Error('Не поддерживаемая версия плагина');
    }

    if (!isSupportedCSPVersion(systemInfo.cspVersion)) {
        throw new Error('Не поддерживаемая версия CSP');
    }

    return true;
});
