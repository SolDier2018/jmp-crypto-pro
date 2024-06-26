import { CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME } from '../constants';
import { afterPluginsLoaded } from '../utils';
import { getCadesCert } from '../utils/get-cades-cert';
import { getDateObj } from '../utils/get-date-obj';

export const createDetachedSignature = afterPluginsLoaded(
    async (thumbprint: string, messageHash: string): Promise<string> => {
        const { cadesplugin } = window;

        const cadesCertificate = await getCadesCert(thumbprint);

        let cadesAttrs;
        let cadesHashedData;
        let cadesSignedData;
        let cadesSigner;

        try {
            cadesAttrs = await cadesplugin.CreateObjectAsync('CADESCOM.CPAttribute');
            cadesHashedData = await cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
            cadesSignedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
            cadesSigner = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
        } catch (error) {
            throw new Error('Ошибка при инициализации подписи');
        }

        const currentTime = getDateObj(new Date());

        try {
            cadesAttrs.propset_Name(CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME);
            cadesAttrs.propset_Value(currentTime);
        } catch (error) {
            throw new Error('Ошибка при установке времени подписи');
        }

        let cadesAuthAttrs;

        try {
            cadesSigner.propset_Certificate(cadesCertificate);

            cadesAuthAttrs = await cadesSigner.AuthenticatedAttributes2;

            cadesAuthAttrs.Add(cadesAttrs);

            cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN);
        } catch (error) {
            throw new Error('Ошибка при установке сертификата');
        }

        try {
            cadesHashedData.propset_Algorithm(
                cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256
            );
            cadesHashedData.SetHashValue(messageHash);
        } catch (error) {
            throw new Error('Ошибка при установке хеша');
        }

        let signature: string;

        try {
            signature = cadesSignedData.SignHash(
                cadesHashedData,
                cadesSigner,
                cadesplugin.CADESCOM_PKCS7_TYPE
            );
        } catch (error) {
            throw new Error('Ошибка при подписании данных');
        }

        return signature;
    }
);
