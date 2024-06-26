import { CadesCertificate } from '../api';
import { afterPluginsLoaded } from './after-plugin-loaded';

export const getCadesContainerCert = afterPluginsLoaded(
    async (thumbprint: string): Promise<CadesCertificate> => {
        const { cadesplugin } = window;

        let cadesStore;

        try {
            cadesStore = await cadesplugin.CreateObjectAsync('CAdESCOM.Store');
        } catch (error) {
            throw new Error('Ошибка при попытке доступа к хранилищу');
        }

        if (!cadesStore) {
            throw new Error('Не удалось получить доступ к хранилищу сертификатов');
        }

        try {
            cadesStore.Open(
                cadesplugin.CADESCOM_CONTAINER_STORE,
                cadesplugin.CAPICOM_MY_STORE,
                cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
            );
        } catch (error) {
            throw new Error('Ошибка при открытии хранилища закрытого ключа');
        }

        let cadesCertificateList;
        let certificatesCount;

        try {
            cadesCertificateList = await cadesStore.Certificates;
            certificatesCount = await cadesCertificateList.Count;
        } catch (error) {
            throw new Error('Ошибка получения списка сертификатов из хранилища закрытого ключа');
        }

        if (!certificatesCount) {
            throw new Error('Нет доступных сертификатов в хранилище закрытого ключа');
        }

        let cadesCertificate: CadesCertificate;

        try {
            cadesCertificateList = await cadesCertificateList.Find(
                cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH,
                thumbprint
            );

            const count = await cadesCertificateList.Count;

            if (!count) {
                throw new Error(
                    `Сертификат с отпечатком: "${thumbprint}" не найден в хранилище закрытого ключа`
                );
            }

            cadesCertificate = await cadesCertificateList.Item(1);
        } catch (error) {
            throw new Error('Ошибка при получении сертификата из хранилища закрытого ключа');
        }

        await cadesStore.Close();

        return cadesCertificate;
    }
);
