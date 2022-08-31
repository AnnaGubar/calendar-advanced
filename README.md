### moment styled-components json-server

`npm i moment` - для работы с датой

`window.moment = moment` - напрямую в devTools вызывает методы библиотеки moment (moment().startOf("month"))

---

1. Декомпозиция - разбить на общие части (Header, Monitor, Grid)
2. Получить структуру данных (daysArray)
3. Создание сетки календаря ()
4. Стилизация сетки

- `npm i styled-components`
- `vscode-styled-jsx-stylus`- расширение в VSC

5. Выводим данные (кол-во дней) в календарь (daysArray)
6. Определение Сб Вс и их стилизация
7. Затянули данные текущей даты в календарь
8. Реализация контроллеров кнопки Today

- метод **moment(дата).isSame(дата, что сравнить)** - поиск текущей даты
  - `moment("2010-10-20").isSame("2010-10-20", "year")` - true

- методы **format, add, subtract, clone, startOf, endOf**:
  - `moment().format("DD-MM-YYYY")` - желаемый формат даты
  - `moment().add(1, "day")` - следующий день
  - `moment().subtract(1,"month")` - прошлый месяц
  - `moment().clone();` - для дальнейшей работы с выбранной датой (чтобы не мутировать текущую)
  - `moment().clone().startOf("month").startOf("week");` - c какого дня в календаре начинается первая неделя месяца (разметка)
  - `moment().endOf("month").endOf("week");` - каким днем в календаре заканчивается последняя неделя месяца (разметка)

  ```
  var a = moment([2012]);
  var b = a.clone();
  a.year(2000);
  b.year(); // 2012
  ```

9. Реализация и стили дней выбранного месяца
10. Реализация и стили дней не актуального месяца
11. Поключаем БД для хранения заметок
  - `npm i json-server`
  - создать корневую папку db.json с конфигурациями
    - "date" принимает значение даты в виде timestamp (кол-во секунд) `https://i-leon.ru/tools/time`
  - добавили скрипт в package.json для запуска сервера 
    - `"server":"npx json-server --watch db.json --port 4444"` - по умолачанию порт 3000
12. Инфу которую получаем динамически обрабатывать в useEffect
  - получаем данные (fetch)
  - добавить полученные данные в состояние (setState)
13. Фильтруем данные: берем заметки только текущего дня
  - `GET /posts?views_gte=10&views_lte=20` - диапазон для фильтра gte(>) lte(<)
  - `moment().format("X")` - формат timestamp
