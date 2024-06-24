async function loadCadesPlugin(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (window.cadesplugin) {
            resolve();
        } else {
            window.addEventListener('message', function listener(event) {
                if (event.data === 'cadesplugin_loaded') {
                    window.removeEventListener('message', listener);

                    resolve();
                } else if (event.data === 'cadesplugin_load_error') {
                    window.removeEventListener('message', listener);

                    reject(new Error('Не удалось загрузить cadesplugin'));
                }
            });

            const script = document.createElement('script');

            script.src = 'https://www.cryptopro.ru/sites/default/files/products/cades/cadesplugin_api.js';
            script.onerror = () => reject(new Error('Не удалось загрузить cadesplugin'));

            document.head.appendChild(script);
        }
    });
}

export { loadCadesPlugin }