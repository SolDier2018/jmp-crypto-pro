import { Certificate } from './certificate';

import { afterPluginsLoaded } from '../utils';

let certificatesCache: Certificate[];

export const getUserCertificates = afterPluginsLoaded(
    async (resetCache: boolean = false): Promise<Certificate[]> => {
        const { cadesplugin } = window;

        if (!resetCache && certificatesCache) {
            return certificatesCache;
        }

        const certificates: Certificate[] = [];

        try {
            const store = await cadesplugin.CreateObjectAsync('CAdESCOM.Store');

            await store.Open(
                cadesplugin.CAPICOM_CURRENT_USER_STORE,
                cadesplugin.CAPICOM_MY_STORE,
                cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
            );

            const certs = await store.Certificates;
            const count = await certs.Count;

            for (let i = 1; i <= count; i++) {
                const cert = await certs.Item(i);
                const thumbprint = await cert.Thumbprint;
                const subjectName = await cert.SubjectName;
                const issuerName = await cert.IssuerName;
                const validFrom = await cert.ValidFromDate;
                const validTo = await cert.ValidToDate;

                certificates.push(
                    new Certificate({
                        cadesCertificate: cert,
                        thumbprint,
                        subjectName,
                        issuerName,
                        validFrom,
                        validTo,
                    })
                );
            }

            await store.Close();
        } catch (error) {
            console.error('Ошибка при получении сертификатов', error);
        }
        return certificates;
    }
);
