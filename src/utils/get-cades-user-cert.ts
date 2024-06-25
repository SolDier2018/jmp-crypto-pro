import { CadesCertificate } from '../api';
import { afterPluginsLoaded } from './after-plugin-loaded';
import { cadesAsyncToken, createCadesPluginObject, generateCadesFn } from './generate-cades-fn';

export const getCadesUserCert = afterPluginsLoaded((thumbprint: string): CadesCertificate => {
    const { cadesplugin } = window;

    return eval(
        generateCadesFn(function _getCadesCert() {
            let cadesStore;

            try {
                cadesStore = cadesAsyncToken + createCadesPluginObject('CAdESCOM.Store');
            } catch (error) {
                throw new Error('Ошибка при попытке доступа к хранилищу');
            }

            if (!cadesStore) {
                throw new Error('Не удалось получить доступ к хранилищу сертификатов');
            }

            try {
                void (
                    cadesAsyncToken +
                    cadesStore.Open(
                        cadesplugin.CAPICOM_CURRENT_USER_STORE,
                        cadesplugin.CAPICOM_MY_STORE,
                        cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
                    )
                );
            } catch (error) {
                throw new Error('Ошибка при открытии хранилища пользователя');
            }

            let cadesCertificateList;
            let certificatesCount;

            try {
                cadesCertificateList = cadesAsyncToken + cadesStore.Certificates;
                certificatesCount = cadesAsyncToken + cadesCertificateList.Count;
            } catch (error) {
                throw new Error('Ошибка получения списка сертификатов из хранилища пользователя');
            }

            if (!certificatesCount) {
                throw new Error('Нет доступных сертификатов в хранилище пользователя');
            }

            let cadesCertificate: CadesCertificate;

            try {
                cadesCertificateList =
                    cadesAsyncToken +
                    cadesCertificateList.Find(
                        cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH,
                        thumbprint
                    );

                cadesCertificate = cadesAsyncToken + cadesCertificateList.Item(1);
            } catch (error) {
                throw new Error('Ошибка при получении сертификата из хранилища пользователя');
            }

            cadesStore.Close();

            return cadesCertificate;
        })
    );
});
