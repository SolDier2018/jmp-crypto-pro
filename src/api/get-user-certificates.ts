import { CadesCertificate, Certificate } from './certificate';
import { CAPICOM_PROPID_KEY_PROV_INFO } from '../constants';
import {
    afterPluginsLoaded,
    generateCadesFn,
    cadesAsyncToken,
    createCadesPluginObject,
    extractCommonName,
} from '../utils';

let certificatesCache: Certificate[];

export const getUserCertificates = afterPluginsLoaded(
    (resetCache: boolean = false): Certificate[] => {
        const { cadesplugin } = window;

        if (!resetCache && certificatesCache) {
            return certificatesCache;
        }

        return eval(
            generateCadesFn(function getUserCertificates(): Certificate[] {
                let cadesStore;

                try {
                    cadesStore = cadesAsyncToken + createCadesPluginObject('CAdESCOM.Store');
                } catch (error) {
                    throw new Error('Ошибка при попытке доступа к хранилищу');
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
                    throw new Error('Ошибка при открытии хранилища');
                }

                let cadesCertificates;
                let cadesCertificatesCount;

                try {
                    cadesCertificates = cadesAsyncToken + cadesStore.Certificates;

                    if (cadesCertificates) {
                        cadesCertificates =
                            cadesAsyncToken +
                            cadesCertificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);

                        /**
                         * Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
                         * или не действительны на данный момент
                         */
                        cadesCertificates =
                            cadesAsyncToken +
                            cadesCertificates.Find(
                                cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
                                CAPICOM_PROPID_KEY_PROV_INFO
                            );

                        cadesCertificatesCount = cadesAsyncToken + cadesCertificates.Count;
                    }
                } catch (error) {
                    console.error(error);

                    throw new Error('Ошибка получения списка сертификатов');
                }

                if (!cadesCertificatesCount) {
                    throw new Error('Нет доступных сертификатов');
                }

                const certificateList: Certificate[] = [];

                try {
                    while (cadesCertificatesCount) {
                        const cadesCertificate: CadesCertificate =
                            cadesAsyncToken + cadesCertificates.Item(cadesCertificatesCount);

                        certificateList.push(
                            new Certificate(
                                cadesCertificate,
                                extractCommonName(cadesAsyncToken + cadesCertificate.SubjectName),
                                cadesAsyncToken + cadesCertificate.IssuerName,
                                cadesAsyncToken + cadesCertificate.SubjectName,
                                cadesAsyncToken + cadesCertificate.Thumbprint,
                                cadesAsyncToken + cadesCertificate.ValidFromDate,
                                cadesAsyncToken + cadesCertificate.ValidToDate
                            )
                        );

                        cadesCertificatesCount--;
                    }
                } catch (error) {
                    throw new Error('Ошибка обработки сертификатов');
                }

                cadesStore.Close();

                certificatesCache = certificateList;

                return certificatesCache;
            })
        );
    }
);
