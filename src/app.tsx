import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import {
    isValidSystemSetup,
    getSystemInfo,
    getUserCertificates,
    Certificate,
    createDetachedSignature,
} from './api';

const App = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setCertificates(await getUserCertificates());
                console.log(await getSystemInfo());
                console.log(await isValidSystemSetup());
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        if (certificates.length) {
            certificates[0].thumbprint;
        }
    }, [certificates.length]);

    const handleOnSign = async () => {
        console.log('--certificates', certificates[0].thumbprint);

        console.log(
            await createDetachedSignature(
                certificates[1].thumbprint,
                'c19a018fd8788d2bbe555dd8fc36e74601e0320d7c0ae5e657760f4dcb07cc35'
            )
        );

        console.log(await certificates[1].getIssuerInfo);
    };

    return (
        <div>
            <button onClick={handleOnSign}>Подписать</button>
        </div>
    );
};

const rootContainer = document.getElementById('root');

if (!rootContainer) {
    throw new Error('Root контейнер не найден!');
}

const root = ReactDOM.createRoot(rootContainer);

root.render(<App />);
