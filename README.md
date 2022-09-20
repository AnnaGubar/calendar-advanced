### moment | styled-components | json-server

# HEROKU | VERCEL

`npm i moment` - для работы с датой

`window.moment = moment` - напрямую в devTools вызывает методы библиотеки moment (moment().startOf("month"))

---

1. Декомпозиция - разбить на общие части (Header, Monitor, Grid)
2. Получить структуру данных (daysArray)
3. Создание сетки календаря (daysMap)
4. Стилизация сетки

- `npm i styled-components` формат `styled.div`/`styled("div")`
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
- отображение заметок в useEffect зависит от изменения today

14. выводим заметки в сетку календаря events->Grid

- стилизация
- определяем начало/конец дня

```
<div>{dayItem.startOf("day").format("X")}</div> {/* start */}
<div>{moment().format("X")}</div> {/* current */}
<div>{dayItem.clone().endOf("day").format("X")}</div> {/* end */}
```

15. модальное окно для заметки/дня (openFormHandler) `onDoubleClick`

- запрет на всплытие событий `e.stopPropagation()`
  - eventHandler выполняется на Ancestor и Child но игнорирует Parent

```
<Ancestor onClick={eventHandler}>
  <Parent onClick={e=>e.stopPropagation()}>
   <Child onClick={eventHandler}>Close</Child>
  </Parent>
</Ancestor>
```

16. Отправляем добавленную/отредактированную заметку в БД

- создание `POST запроса` - добавление заметки

```
fetch(fetchUrl, {
method: httpMethod,
headers: { "Content-Type": "application/json" }, // без этого не создается тело
body: JSON.stringify(event)})
```

17. Создаем кнопку удаления заметки
18. Раздробили компоненты
19. Сделали фиксированной ячейку даты `events.slice(0, 2)`
20. Создаем отображение расписания дня `displayMode`

- разделили отрисовку разметки в зависимости от displayMode в компоненте Monitor
- создали компонент DayShowComponent - забираем события дня
- если displayMode=day стрелки должны переключать не месяца а дни
  - добавление зависимости к функциям prevHandler/nextHandler
  - отображаем выбранное из списка событие selectedEvent ([events, setEvents])

21. Кнопка `Show More` при нажатии переходит в режим отображения расписания дня
22. Добавляем возможность добавлять заметку в режиме рассписани дня
23. Часовая сетка в режиме рассписание дня

- ` {`${index}`.padStart(2,"0")}:00 ` - сетка часов

24. деплой на vercel

- `const BASE_URL = "https://calendar-advanced.herokuapp.com";`
- находим свой проект, делаем импорт
- `Environment Variables`
  - name -> API_URL
  - value -> https://calendar-advanced.herokuapp.com
- сделать коммит сохранив настройки
- deploy
- https://calendar-advanced.vercel.app

25. Создаем таймпикер

- DayShowComponent -> `Number(moment.unix(Number(selectedEvent.date)).format("H"))`
- создать выпадающее меню (выбор времени)
- `moment.unix(+selectedEvent.date).hour(index).format("X")` - метод hour() устанавливает час 

26. Текущее время в DayShowConponent
  - в стилях RedLine -> динамический X `top: x%;`
  - 86400 - кол-во секунд в сутках
  - `const getRedLinePosition = () => ((moment().format("x") - today.format("x")) / 86400) * 100;`
  - чтобы линия динамически меняла положение использовать useEffect
