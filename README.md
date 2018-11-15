# ts

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Описание
Из-за политики CORS запрос к API по адресу http://hotels-admin.pegast.su/api/v1/hotels/  невозможен с другого домена, поэтому для имитации API используется файл src/api/hotelsList.js возвращающий асинхронно список отелей (принимает такие же параметры, как и реальный API). Отмена незавершенного запроса, при инициализации нового, осуществлено криво с помощью clearTimeout.

Для имитации запроса к http://hotels-admin.pegast.su/api/v1/hotels/{id} используется сервис typicode.com. Запрос к сервису осуществляется с помощью axios. При совершении следующего запроса к ресурсу, предыдущий отменяется, если еще не завершился. Осуществлено это с помощью маркера CancelToken.

### Плагины
Использовались следующие библиотеки:
-	vue-router
-	vuex
-	vue-property-decorator
-	vuex-module-decorators
-	axios
-	vue-gallery

### Недостатки
- лоадер загрузки реализован просто
- пагинция реализована просто
- ограничение на фильтр поиска в 500 мс реализовано не совсем правильно
- страницы слабо разбиты на компоненты
- TypeScript применяется, но нет полного осознания, как применять его, чтобы было максимум пользы от статической типизации.
- TSLint выводит много WARNONG-ов в части оформления кода.