import { Certificate } from './certificate';
import { afterPluginsLoaded, cadesAsyncToken, generateCadesFn } from '../../utils';

export const getCadesProp = afterPluginsLoaded(function (this: Certificate, propName: string) {
    const cadesCertificate = this._cadesCertificate;

    return eval(
        generateCadesFn(function getCadesProp() {
            let propertyValue;

            try {
                propertyValue = cadesAsyncToken + cadesCertificate[propName];
            } catch (error) {
                throw new Error('Ошибка при обращении к свойству сертификата');
            }

            return propertyValue;
        })
    );
});
