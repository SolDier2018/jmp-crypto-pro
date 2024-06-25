import { CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME } from '../constants';
import {
    afterPluginsLoaded,
    cadesAsyncToken,
    createCadesPluginObject,
    generateCadesFn,
} from '../utils';
import { getCadesCert } from '../utils/get-cades-cert';
import { getDateObj } from '../utils/get-date-obj';

export const createDetachedSignature = afterPluginsLoaded(
    async (thumbprint: string, messageHash: string): Promise<string> => {
        const { cadesplugin } = window;

        const cadesCertificate = await getCadesCert(thumbprint);

        return eval(
            generateCadesFn(function createDetachedSignature(): string {
                let cadesAttrs;
                let cadesHashedData;
                let cadesSignedData;
                let cadesSigner;

                try {
                    cadesAttrs = cadesAsyncToken + createCadesPluginObject('CADESCOM.CPAttribute');
                    cadesHashedData =
                        cadesAsyncToken + createCadesPluginObject('CAdESCOM.HashedData');
                    cadesSignedData =
                        cadesAsyncToken + createCadesPluginObject('CAdESCOM.CadesSignedData');
                    cadesSigner = cadesAsyncToken + createCadesPluginObject('CAdESCOM.CPSigner');
                } catch (error) {
                    throw new Error('Ошибка при инициализации подписи');
                }

                const currentTime = getDateObj(new Date());

                try {
                    void (
                        cadesAsyncToken +
                        cadesAttrs.propset_Name(CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME)
                    );
                    void (cadesAsyncToken + cadesAttrs.propset_Value(currentTime));
                } catch (error) {
                    throw new Error('Ошибка при установке времени подписи');
                }

                let cadesAuthAttrs;

                try {
                    void (cadesAsyncToken + cadesSigner.propset_Certificate(cadesCertificate));
                    cadesAuthAttrs = cadesAsyncToken + cadesSigner.AuthenticatedAttributes2;
                    void (cadesAsyncToken + cadesAuthAttrs.Add(cadesAttrs));
                    void (
                        cadesAsyncToken +
                        cadesSigner.propset_Options(
                            cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN
                        )
                    );
                } catch (error) {
                    throw new Error('Ошибка при установке сертификата');
                }

                try {
                    void (
                        cadesAsyncToken +
                        cadesHashedData.propset_Algorithm(
                            cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256
                        )
                    );
                    void (cadesAsyncToken + cadesHashedData.SetHashValue(messageHash));
                } catch (error) {
                    throw new Error('Ошибка при установке хеша');
                }

                let signature: string;

                try {
                    signature =
                        cadesAsyncToken +
                        cadesSignedData.SignHash(
                            cadesHashedData,
                            cadesSigner,
                            cadesplugin.CADESCOM_PKCS7_TYPE
                        );
                } catch (error) {
                    throw new Error('Ошибка при подписании данных');
                }

                return signature;
            })
        );
    }
);
