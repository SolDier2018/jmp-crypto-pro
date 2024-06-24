export type TSignOptions = {
    certificateThumbprint: string;
    hash: string;
}

export type TCertificate = {
    thumbprint: string;
    subjectName: string;
    issuerName: string;
    validFrom: Date;
    validTo: Date;
}
