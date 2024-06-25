import { Certificate } from './certificate';
import { afterPluginsLoaded, cadesAsyncToken, generateCadesFn } from '../../utils';

export const exportBase64 = afterPluginsLoaded(function (this: Certificate): string {
    const cadesCertificate = this._cadesCertificate;

    return eval(
        generateCadesFn(function exportBase64(): string {
            let base64: string;

            try {
                base64 = cadesAsyncToken + cadesCertificate.Export(0);
            } catch (error) {
                throw new Error('Ошибка при экспорте сертификата');
            }

            return base64;
        })
    );
});
