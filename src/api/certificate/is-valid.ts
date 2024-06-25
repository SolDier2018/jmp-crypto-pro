import { Certificate } from './certificate';
import { afterPluginsLoaded, cadesAsyncToken, generateCadesFn } from '../../utils';

export const isValid = afterPluginsLoaded(function (this: Certificate): boolean {
    const cadesCertificate = this._cadesCertificate;

    return eval(
        generateCadesFn(function isValid() {
            let isValid;

            try {
                isValid = cadesAsyncToken + cadesCertificate.IsValid();
                isValid = cadesAsyncToken + isValid.Result;
            } catch (error) {
                console.error(error);

                throw new Error('Ошибка при проверке сертификата');
            }

            return Boolean(isValid);
        })
    );
});
