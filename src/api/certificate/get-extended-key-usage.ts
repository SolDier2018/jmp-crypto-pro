import { Certificate } from './certificate';
import { afterPluginsLoaded, cadesAsyncToken, generateCadesFn } from '../../utils';

export const getExtendedKeyUsage = afterPluginsLoaded(function (this: Certificate): string[] {
    const cadesCertificate = this._cadesCertificate;

    return eval(
        generateCadesFn(function getExtendedKeyUsage(): string[] {
            const OIDS: string[] = [];
            let count: any;

            try {
                count = cadesAsyncToken + cadesCertificate.ExtendedKeyUsage();
                count = cadesAsyncToken + count.EKUs;
                count = cadesAsyncToken + count.Count;

                if (count > 0) {
                    while (count > 0) {
                        let cadesExtendedKeyUsage;

                        cadesExtendedKeyUsage =
                            cadesAsyncToken + cadesCertificate.ExtendedKeyUsage();
                        cadesExtendedKeyUsage = cadesAsyncToken + cadesExtendedKeyUsage.EKUs;
                        cadesExtendedKeyUsage = cadesAsyncToken + cadesExtendedKeyUsage.Item(count);
                        cadesExtendedKeyUsage = cadesAsyncToken + cadesExtendedKeyUsage.OID;

                        OIDS.push(cadesExtendedKeyUsage);

                        count--;
                    }
                }
            } catch (error) {
                throw new Error("Ошибка при получении ОИД'ов");
            }

            return OIDS;
        })
    );
});
