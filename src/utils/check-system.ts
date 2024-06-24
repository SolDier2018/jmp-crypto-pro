import { loadCadesPlugin } from './load-cades-plugin';

async function checkSystem(): Promise<boolean> {
    await loadCadesPlugin();

    const cadesplugin = window.cadesplugin;

    if (!cadesplugin) {
        throw new Error('Cadesplugin не установлен');
    }

    try {
        await cadesplugin.CreateObjectAsync("CAdESCOM.Store");
        return true;
    } catch (error) {
        console.error("CryptoPro не установлен или не поддерживается", error);
        return false;
    }
}

export { checkSystem }