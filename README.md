# Асинхронный JavaScript API для работы с КриптоПРО ЭЦП Browser Plug-In

## Установка

Для NPM:

```bash
npm install crypto-pro-js
```

Для Yarn:

```bash
yarn add crypto-pro-js
```

Подключение пакета как UMD модуля через тэг script:

```html
<script src="crypto-pro-js/dist/crypto-pro.min.js"></script>
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
import { getUserCertificates, Certificate } from 'crypto-pro-js';

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

-   [getUserCertificates](src/api/get-user-certificates.ts) - возвращает список
    [сертификатов](#api-certificate), доступных пользователю в системе
-   [getAllUserCertificates](src/api/getAllUserCertificates.ts) - возвращает список
    [сертификатов](#api-certificate), доступных пользователю в системе, в том числе просроченные и
    без закрытого ключа
-   [getContainerCertificates](src/api/getContainerCertificates.ts) - возвращает список
    [сертификатов](#api-certificate), из закрытых ключей и/или сертификаты не установленные
    всистеме\*
-   [getAllContainerCertificates](src/api/getAllContainerCertificates.ts) - возвращает список
    [сертификатов](#api-certificate), из закрытых ключей и/или сертификаты не установленные
    всистеме\*, в том числе просроченные и без закрытого ключа
-   [getCertificate](src/api/getCertificate.ts) - возвращает [сертификат](#api-certificate) по
    отпечатку
-   [createAttachedSignature](src/api/createAttachedSignature.ts) - создает совмещенную
    (присоединенную) подпись сообщения
-   [createDetachedSignature](src/api/createDetachedSignature.ts) - создает отсоединенную
    (открепленную) подпись сообщения
-   [addAttachedSignature](src/api/addAttachedSignature.ts) - добавляет совмещенную (присоединенную)
    подпись к раннее подписанному документу (реализует метод coSign)
-   [addDetachedSignature](src/api/addDetachedSignature.ts) - добавляет отсоединенную (открепленную)
    подпись к раннее подписанному документу (реализует метод coSign)
-   [createXMLSignature](src/api/createXMLSignature.ts) - создает XML подпись для документа в
    формате XML
-   [createHash](src/api/createHash.ts) - создает хеш сообщения по ГОСТ Р 34.11-2012 256 бит
-   [getSystemInfo](src/api/getSystemInfo.ts) - возвращает информацию о CSP и плагине
-   [isValidSystemSetup](src/api/isValidSystemSetup.ts) - возвращает флаг корректности настроек ЭП
    на машине

> \*Методы `getContainerCertificates` и `getAllContainerCertificates` позволяют получить сертификаты
> из закрытых ключей, записанных на обыкновенную флэшку

<a name="api-certificate"></a>

### Методы объекта сертификата

[Сертификат](src/api/certificate/certificate.ts) предоставляет следущее API:

-   [isValid](src/api/certificate/isValid.ts) - возвращает флаг действительности сертификата
-   [getCadesProp](src/api/certificate/getCadesProp.ts) - возвращает указанное внутренее свойство у
    сертификата в формате Cades
-   [exportBase64](src/api/certificate/exportBase64.ts) - возвращает сертификат в формате base64
-   [getAlgorithm](src/api/certificate/getAlgorithm.ts) - возвращает информацию об алгоритме
    сертификата
-   [getOwnerInfo](src/api/certificate/getInfo.ts) - возвращает расшифрованную информацию о
    владельце сертификата
-   [getIssuerInfo](src/api/certificate/getInfo.ts) - возвращает расшифрованную информацию об
    издателе сертификата
-   [getExtendedKeyUsage](src/api/certificate/getExtendedKeyUsage.ts) - возвращает ОИД'ы сертификата
-   [getDecodedExtendedKeyUsage](src/api/certificate/getDecodedExtendedKeyUsage.ts) - возвращает
    расшифрованные ОИД'ы
-   [hasExtendedKeyUsage](src/api/certificate/hasExtendedKeyUsage.ts) - проверяет наличие ОИД'а
    (ОИД'ов) у сертификата

<a name="supported-cist"></a>

## Поддерживаемые СКЗИ

[КриптоПРО CSP](https://www.cryptopro.ru/products/csp/downloads) (v4.0+)

<a name="examples"></a>

## Примеры

Для их запуска необходим NodeJS LTS.

<a name="example-script-tag"></a>

### Тэг script (UMD)

```bash
cd examples/script-tag
npm i
npm start
```

<a name="developers"></a>

# Тем, кто хочет помочь

Буду благодарен за расширение/улучшение/доработку API. Вам будут полезны
[примеры](http://cpdn.cryptopro.ru/?url=/content/cades/plugin-samples-sign.html), предоставляемые
Крипто ПРО.

<a name="dev-mode"></a>

## Запуск режима разработки

Устанавливаем зависимости:

```bash
npm i
```

Во время работы с кодом необходим запущенный сборщик:

```bash
npm start
```

И пример, на котором можно тестировать изменения. Удобнее всего тестировать на примере с тэгом
script, тк он отвязан от фреймворков и использует сборку в формате UMD из папки `dist/`, постоянно
обновляемую пока работает сборщик. Запускаем его таким образом:

```bash
cd examples/script-tag
npm i
npm link ../../
npm start
```

> После выполнения `npm link ../../` в директории `examples/script-tag/node_modules` папка
> `crypto-pro-js` станет ярлыком, указывающим на папку содержащую локально собранный пакет.

<a name="tests-execution"></a>

## Запуск тестов

Тесты написаны с использованием
[Jest](https://jestjs.io/docs/en/configuration#testpathignorepatterns-arraystring):

```bash
npm test
```

<a name="final-check"></a>

## Проверка пакета перед публикацией в NPM

Необходимо протестировать работу в заявленных браузерах, сделав это на локально запакованной версии
пакета. Для этого собираем пакет:

```bash
npm run package
mv package ..
```

> Важно переместить папку `package` куда-нибудь выше для избежания конфликтов при линковке с текущим
> `package.json`.

Переходим в любую директорию с примером и создаем там ссылку на только что собранный пакет:

```bash
cd examples/script-tag
npm link ../../../package
```

Проверяем работу примеров в режимах разработки и продакшн.

После завершения экспериментов можно удалить глобальную ссылку из директории `../../../package`
таким образом:

```bash
cd ../../../package
npm unlink
```

<a name="lisense"></a>

# Лицензия

[MIT](/LICENSE)

[license-url]: /LICENSE
[license-image]: https://img.shields.io/github/license/webmasterskaya/crypto-pro-js
[npm-url]: https://npmjs.org/package/crypto-pro-js
[npm-version-image]: https://img.shields.io/npm/v/crypto-pro-js.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/crypto-pro-js.svg?style=flat
[downloads-url]: https://npmcharts.com/compare/crypto-pro-js?minimal=true
[actions-url]: https://github.com/webmasterskaya/crypto-pro-js/actions
[actions-image]:
    https://img.shields.io/github/workflow/status/webmasterskaya/crypto-pro-js/test?event=push
