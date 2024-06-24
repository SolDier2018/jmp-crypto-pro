import type { TCertificate } from 'types';

import { loadCadesPlugin } from './load-cades-plugin';

async function getCertificates(): Promise<TCertificate[]> {
    await loadCadesPlugin();

    const cadesplugin = window.cadesplugin;

    if (!cadesplugin) {
        throw new Error('Cadesplugin is not available');
    }

    const certificates: TCertificate[] = [];

    try {
        const store = await cadesplugin.CreateObjectAsync("CAdESCOM.Store");

        await store.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

        const certs = await store.Certificates;
        const count = await certs.Count;

        for (let i = 1; i <= count; i++) {
            const cert = await certs.Item(i);
            const thumbprint = await cert.Thumbprint;
            const subjectName = await cert.SubjectName;
            const issuerName = await cert.IssuerName;
            const validFrom = new Date(await cert.ValidFromDate);
            const validTo = new Date(await cert.ValidToDate);

            certificates.push({
                thumbprint,
                subjectName,
                issuerName,
                validFrom,
                validTo
            });
        }

        await store.Close();
    } catch (error) {
        console.error("Ошибка при получении сертификатов", error);
    }
    return certificates;
}

export { getCertificates }