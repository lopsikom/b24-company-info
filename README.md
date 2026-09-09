# b24-company-info

Приложение для Bitrix24, встраиваемое в карточку компании CRM. Берёт ИНН из реквизитов
компании и подтягивает по нему актуальные данные из [DaData](https://dadata.ru/):
статус и дата регистрации, ОПФ, основной ОКВЭД, реквизиты, юридический адрес,
руководитель, контакты и бренд (сайт, логотип).

## Как это работает

```
Bitrix24 (iframe, placement CRM_COMPANY_DETAIL_TAB)
        │  b24jssdk: crm.requisite.list → RQ_INN
        ▼
Nuxt / Nitro server  ──►  GET /api/company/inn/:inn
        │                  findById/party  + findById/brand + findById/okved2
        ▼
DaData API (токен хранится только на сервере)

## Запуск

```bash
npm install
cp .env.example .env   # заполнить токены DaData
npm run dev            # http://localhost:3000
```

## Переменные окружения

| Переменная | Описание |
|---|---|
| `NUXT_TOKEN` | API-токен DaData |
| `NUXT_SECRET_KEY` | Секретный ключ DaData (заголовок `X-Secret`) |
| `NUXT_DADATA_PATH` | `https://suggestions.dadata.ru/suggestions/api/4_1/rs/` |
| `NUXT_DADATA_PATH_BRAND` | `https://api.dadata.ru/` |
| `NUXT_PUBLIC_BASE_URI` | Базовый URL приложения, например `http://localhost:3000` |

## Docker

```bash
docker build -t b24-company-info .
docker run -p 3000:3000 --env-file .env b24-company-info
```

## Установка в Bitrix24

1. Разработчикам → Другое → Локальное приложение.
2. Тип встраивания — `CRM_COMPANY_DETAIL_TAB`, путь обработчика — URL приложения.
3. Права: `crm`.
