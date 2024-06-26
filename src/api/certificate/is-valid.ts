import { Certificate } from './certificate';
import { afterPluginsLoaded } from '../../utils';

export const isValid = afterPluginsLoaded(async function (this: Certificate): Promise<boolean> {
    const cadesCertificate = this.cadesCertificate;

    let isValid;

    try {
        isValid = cadesCertificate.IsValid();
        isValid = isValid.Result;
    } catch (error) {
        console.error(error);

        throw new Error('Ошибка при проверке сертификата');
    }

    return Boolean(isValid);
});
