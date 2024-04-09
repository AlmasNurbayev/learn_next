# Фронтенд сайта [https://cipo.kz]

Совместно с репо cipo-site-server и nginx запускается в одном поде docker. Статику (картинки) получаем также как и restAPI подключаясь к cipo-site-server через прокси-nginx.

## Функционал
- лендинг-страница
- каталог товаров с пагинацией и фильтрами
- SSR-рендеринг везде где можно

## Верстка
- в основном flex с wrap + media-запросы. Есть одно место с grid
- CSS Nested вместо препроцессоров CSS
- CSS-структура: globals.css, page.css для каждой страницы, если необходимо для компонента - свой CSS в той же папке, что и tsx
- свой компонент пагинации

## Стек
- Next 14.1
- Winston для логов в консоль
- rc-slider для прокрутки картинок в карточке товара
- обращение к бэкенду по RestAPI, нет встроенного бэкенда или БД

## Deploy
- пример docker compose и конфигурации nginx - в папке deploy
- Nginx поднимается через официальный image, в его volume нужно положить папку conf.d и внутри:
    папка ssl с сертификатами
    файл app.conf с конфигурацией
- папки для контейнеров нужно получить через git clone этого репо и cipo-site-server, пример структуры каталогов:
    cipo-nginx\conf.d - создать каталог
    cipo-site-server\ - клонировать репо
    cipo_next\ - клонировать репо
    volume_db\
    docker-compose.yaml
    .env.example
    .env
- для получения доступа к cipo-site-server из другого пода контейнеров с телеграм-ботом - в docker-compose прокинута внешняя сеть kofd