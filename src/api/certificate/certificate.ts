import { exportBase64 } from './export-base-64';
import { getAlgorithm } from './get-algorithm';
import { getCadesProp } from './get-cades-prop';
import {
    getDecodedExtendedKeyUsage,
    ExtendedKeysTranslations,
} from './get-decoded-extended-key-usage';
import { getExtendedKeyUsage } from './get-extended-key-usage';
import { getInfo } from './get-info';
import { hasExtendedKeyUsage } from './has-extended-key-usage';
import { isValid } from './is-valid';

import { ISSUER_TAGS_TRANSLATIONS, SUBJECT_TAGS_TRANSLATIONS } from '../../constants';
import type { TTagTranslation, TAlgorithmInfo } from '../../types';

export type CadesCertificate = any;

export class Certificate {
    constructor(
        public _cadesCertificate: CadesCertificate,
        public name: string | undefined,
        public issuerName: string,
        public subjectName: string,
        public thumbprint: string,
        public validFrom: string,
        public validTo: string
    ) {}

    public getOwnerInfo(): Promise<TTagTranslation[]> {
        return getInfo.call(this, SUBJECT_TAGS_TRANSLATIONS, 'SubjectName');
    }

    public getIssuerInfo(): Promise<TTagTranslation[]> {
        return getInfo.call(this, ISSUER_TAGS_TRANSLATIONS, 'IssuerName');
    }

    public getExtendedKeyUsage(): Promise<string[]> {
        return getExtendedKeyUsage.call(this);
    }

    public getDecodedExtendedKeyUsage(): Promise<ExtendedKeysTranslations> {
        return getDecodedExtendedKeyUsage.call(this);
    }

    public getAlgorithm(): Promise<TAlgorithmInfo> {
        return getAlgorithm.call(this);
    }

    public getCadesProp(propName: string): Promise<any> {
        return getCadesProp.call(this, propName);
    }

    public isValid(): Promise<boolean> {
        return isValid.call(this);
    }

    public exportBase64(): Promise<string> {
        return exportBase64.call(this);
    }

    public hasExtendedKeyUsage(oids: string): Promise<boolean> {
        return hasExtendedKeyUsage.call(this, oids);
    }
}
