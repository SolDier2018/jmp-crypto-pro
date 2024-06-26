import { Certificate } from './certificate';
import { afterPluginsLoaded } from '../../utils';

export const isValid = afterPluginsLoaded(async function (this: Certificate): Promise<boolean> {
    const cadesCertificate = (this as Certificate).cadesCertificate;

    let isValid;

    try {
        isValid = await cadesCertificate.IsValid();
        isValid = await isValid.Result;
    } catch (error) {
        throw new Error('Ошибка при проверке сертификата');
    }

    return Boolean(isValid);
});
