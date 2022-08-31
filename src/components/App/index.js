import moment from "moment";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { Grid } from "../Grid";
import { Header } from "../Header";
import { Monitor } from "../Monitor";
import { TOTAL_DAYS, BASE_URL } from "../../constants";

const ShadowWrapper = styled("div")`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;

  border-radius: 8px;
  overflow: hidden;
`;

function App() {

  window.moment = moment
  // определение и отображение выбранного месяца с неактивными днями пред/след месяцев
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");

  const prevHandler = () => {
    setToday((prev) => prev.clone().subtract(1, "month"));
  };
  const todayHandler = () => {
    setToday(moment());
  };
  const nextHandler = () => {
    setToday((prev) => prev.clone().add(1, "month"));
  };

  // работа с заметками: поиск, фильтрация
  const [events, setEvents] = useState([]);
  const startDayQwery = startDay.clone().format("X");
  const endDayQwery = startDay.clone().add(TOTAL_DAYS,"days").format("X");// конец разметочного месяца

  useEffect(() => {
    fetch(`${BASE_URL}/events?date_gte=${startDayQwery}&date_lte=${endDayQwery}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setEvents(res);
      });
  }, [startDayQwery,endDayQwery]);

  return (
    <ShadowWrapper>
      <Header />

      <Monitor
        today={today}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
      />

      <Grid startDay={startDay} today={today}/>
    </ShadowWrapper>
  );
}

export default App;
