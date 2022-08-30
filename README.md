`npm i moment` - для работы с датой

`window.moment = moment` - напрямую в devTools вызывает методы библиотеки moment (moment().startOf("month"))

---

### Разметка (использование styled-components)

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
- методы **format, add, subtract**:
  - `moment().format("DD-MM-YYYY")` - желаемый формат даты
  - `moment().add(1, "day")` - следующий день
  - `moment().subtract(1,"month")` - прошлый месяц
