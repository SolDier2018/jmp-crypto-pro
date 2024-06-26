import { afterPluginsLoaded } from '../../utils';
import { Certificate } from './certificate';
import type { TAlgorithmInfo } from '../../types';

export const getAlgorithm = afterPluginsLoaded(async function (
    this: Certificate
): Promise<TAlgorithmInfo> {
    const cadesCertificate = this.cadesCertificate;

    const algorithmInfo: TAlgorithmInfo = {
        algorithm: '',
        oid: '',
    };

    let cadesPublicKey;

    try {
        cadesPublicKey = cadesCertificate.PublicKey();
        cadesPublicKey = cadesPublicKey.Algorithm;

        algorithmInfo.algorithm = cadesPublicKey.FriendlyName;
        algorithmInfo.oid = cadesPublicKey.Value;
    } catch (error) {
        throw new Error('Ошибка при получении алгоритма');
    }

    return algorithmInfo;
});
