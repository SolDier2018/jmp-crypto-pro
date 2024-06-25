import { afterPluginsLoaded, cadesAsyncToken, generateCadesFn } from '../../utils';
import { Certificate } from './certificate';
import type { TAlgorithmInfo } from '../../types';

export const getAlgorithm = afterPluginsLoaded(function (this: Certificate): TAlgorithmInfo {
    const cadesCertificate = this._cadesCertificate;

    return eval(
        generateCadesFn(function getAlgorithm(): TAlgorithmInfo {
            const algorithmInfo: TAlgorithmInfo = {
                algorithm: '',
                oid: '',
            };

            let cadesPublicKey;

            try {
                cadesPublicKey = cadesAsyncToken + cadesCertificate.PublicKey();
                cadesPublicKey = cadesAsyncToken + cadesPublicKey.Algorithm;
                algorithmInfo.algorithm = cadesAsyncToken + cadesPublicKey.FriendlyName;
                algorithmInfo.oid = cadesAsyncToken + cadesPublicKey.Value;
            } catch (error) {
                throw new Error('Ошибка при получении алгоритма');
            }

            return algorithmInfo;
        })
    );
});
