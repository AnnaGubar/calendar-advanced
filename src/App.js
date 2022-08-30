import moment from "moment";
import "./App.css";

function App() {
  // чтобы работать в devTools а не через console.log(moment())
  // можно напрямую вызывать методы библиотеки moment (moment().startOf("month"))
  window.moment = moment;

  // c какого дня в календаре начинается первая неделя месяца (разметка)
  const startDay = moment().startOf("month").startOf("week");
  // каким днем в календаре заканчивается последняя неделя месяца (разметка)
  const endDay = moment().endOf("month").endOf("week");

  // можно преобразовать в любой формат методом .format()
  // console.log(endDay.format("YYYY-MM-DD")) // 2022-09-03

  // месяц для отрисовки (актуальный и дни с пред/след месяцев)
  const calendar = [];

  // clone() - чтобы не мутировать startDay
  const day = startDay.clone();

  // пока day !== endDay
  while (!day.isAfter(endDay)) {
    // будут добавляться в calendar один и тот же день
    // calendar.push(day);
    calendar.push(day.clone());
    day.add(1, "day"); // типа i++
  }

  return <div></div>;
}

export default App;
