import { getAlgorithm } from './get-algorithm';
import { getInfo } from './get-info';
import { isValid } from './is-valid';

import { ISSUER_TAGS_TRANSLATIONS, SUBJECT_TAGS_TRANSLATIONS } from '../../constants';
import type { TTagTranslation, TAlgorithmInfo } from '../../types';

export type CadesCertificate = any;

export class Certificate {
    cadesCertificate?: CadesCertificate;
    name?: string;
    issuerName: string;
    subjectName: string;
    thumbprint: string;
    validFrom: string;
    validTo: string;

    constructor({
        cadesCertificate,
        name,
        issuerName,
        subjectName,
        thumbprint,
        validFrom,
        validTo,
    }: {
        cadesCertificate?: CadesCertificate;
        name?: string;
        issuerName: string;
        subjectName: string;
        thumbprint: string;
        validFrom: string;
        validTo: string;
    }) {
        this.cadesCertificate = cadesCertificate;
        this.name = name;
        this.issuerName = issuerName;
        this.subjectName = subjectName;
        this.thumbprint = thumbprint;
        this.validFrom = validFrom;
        this.validTo = validTo;
    }

    get getOwnerInfo(): Promise<TTagTranslation[]> {
        return getInfo.call(this, SUBJECT_TAGS_TRANSLATIONS, 'SubjectName');
    }

    get getIssuerInfo(): Promise<TTagTranslation[]> {
        return getInfo.call(this, ISSUER_TAGS_TRANSLATIONS, 'IssuerName');
    }

    get getAlgorithm(): Promise<TAlgorithmInfo> {
        return getAlgorithm.call(this);
    }

    get isValid(): Promise<boolean> {
        return isValid.call(this);
    }
}
