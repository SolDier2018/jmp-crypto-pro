import { CadesCertificate } from '../api';
import { afterPluginsLoaded } from './after-plugin-loaded';
import { getCadesUserCert } from './get-cades-user-cert';
import { getCadesContainerCert } from './get-cades-container-cert';

export const getCadesCert = afterPluginsLoaded(
    async (thumbprint: string): Promise<CadesCertificate> => {
        let cadesCertificate: CadesCertificate;

        try {
            cadesCertificate = await getCadesUserCert(thumbprint);
        } catch (error) {
            cadesCertificate = await getCadesContainerCert(thumbprint);
        }

        return cadesCertificate;
    }
);
