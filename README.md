# Асинхронный JavaScript API для работы с КриптоПРО ЭЦП Browser Plug-In

## Установка

Для NPM:

```bash
npm install jmp-crypto-pro
```

Для Yarn:

```bash
yarn add jmp-crypto-pro
```

Подключение пакета как UMD модуля через тэг script:

```html
<script src="jmp-crypto-pro/build/index.js"></script>
<script>
    window.cryptoPro
        .getUserCertificates()
        .then(function (certificates) {
            //...
        })
        .catch(function (error) {
            //...
        });
</script>
```

Подключение пакета как ES модуля с Typescript или JavaScript:

```typescript
import { getUserCertificates, Certificate } from 'jmp-crypto-pro';

(async () => {
    let certificates: Certificate[];

    try {
        certificates = await getUserCertificates();
    } catch (error) {
        // ...
    }
})();
```

### Методы объекта cryptoPro

-   [getUserCertificates](src/api/get-user-certificates.ts) - возвращает список сертификатов,
    доступных пользователю в системе
-   [createDetachedSignature](src/api/create-detached-signature.ts) - создает отсоединенную
    (открепленную) подпись сообщения
-   [getSystemInfo](src/api/get-system-info.ts) - возвращает информацию о CSP и плагине
-   [isValidSystemSetup](src/api/is-valid-system-setup.ts) - возвращает флаг корректности настроек
    ЭП на машине

### Методы объекта сертификата

[Сертификат](src/api/certificate/certificate.ts) предоставляет следущее API:

-   [isValid](src/api/certificate/is-valid.ts) - возвращает флаг действительности сертификата
-   [getAlgorithm](src/api/certificate/get-algorithm.ts) - возвращает информацию об алгоритме
    сертификата
-   [getOwnerInfo](src/api/certificate/get-info.ts) - возвращает расшифрованную информацию о
    владельце сертификата
-   [getIssuerInfo](src/api/certificate/get-nfo.ts) - возвращает расшифрованную информацию об
    издателе сертификата

## Поддерживаемые СКЗИ

[КриптоПРО CSP](https://www.cryptopro.ru/products/csp/downloads) (v4.0+)

# Лицензия

[MIT](/LICENSE)
