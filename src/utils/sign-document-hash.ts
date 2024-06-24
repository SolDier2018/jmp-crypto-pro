import type { TSignOptions } from 'types';

import { loadCadesPlugin } from './load-cades-plugin';

async function signDocumentHash(options: TSignOptions): Promise<string> {
    await loadCadesPlugin();

    const cadesplugin = window.cadesplugin;

    if (!cadesplugin) {
        throw new Error('Cadesplugin is not available');
    }

    const store = cadesplugin.CreateObject("CAdESCOM.Store");

    store.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

    const certificates = store.Certificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, options.certificateThumbprint);

    if (certificates.Count === 0) {
        throw new Error('Certificate not found');
    }

    const certificate = certificates.Item(1);
    const signer = cadesplugin.CreateObject("CAdESCOM.CPSigner");

    signer.Certificate = certificate;

    const signedData = cadesplugin.CreateObject("CAdESCOM.CadesSignedData");

    signedData.ContentEncoding = cadesplugin.CADESCOM_BASE64_TO_BINARY;
    signedData.Content = options.hash;

    const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_BES);

    return signature;
}

export { signDocumentHash };
