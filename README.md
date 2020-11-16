# react-server-code-checker

Проверяет ответ сервера по переданному списку URL.
Демо: https://лидермедиа.рф/404checker/

Под капотом: React, MobX, PHP

# Быстрый старт
На компьютере глобально должна быть установлен node js.
В консоли в директории проекта пишем npm i, ждем загрузки пакетов. 

Все исходники в папке scr. Вариант на прод в папке public. Папка php содержит серверное api.

Команды:

npm run dev (dev mode)

npm run build (production mode)

Важно! Для production поменяйте mainServerUrl на ваш реальный сервер в файле src/utils/makeRequest.js
