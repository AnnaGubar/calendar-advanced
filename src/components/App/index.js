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

const FormPositionWrapper = styled("div")`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
`;

const FormWrapper = styled(ShadowWrapper)`
  width: 200px;
  background-color: #1e1f21;
  color: #ddd;
  /* box-shadow: none; */
`;

const EventTitle = styled("input")`
  padding: 4px 14px;
  width: 100%;
  font-size: 0.85rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #464648;
  background-color: #1e1f21;
  color: #ddd;
`;

const EventBody = styled(EventTitle)``;

const ButtonsWrapper = styled("div")`
  display: flex;
  justify-content: flex-end;
  padding: 8px 14px;
`;

function App() {
  window.moment = moment;
  // ◼ определение и отображение выбранного месяца с неактивными днями пред/след месяцев
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

  // ◼ работа с заметками: поиск, фильтрация
  const [events, setEvents] = useState([]);
  const startDayQwery = startDay.clone().format("X");
  const endDayQwery = startDay.clone().add(TOTAL_DAYS, "days").format("X"); // конец разметочного месяца

  useEffect(() => {
    fetch(
      `${BASE_URL}/events?date_gte=${startDayQwery}&date_lte=${endDayQwery}`
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log("today", today); // выбранный месяц
        // console.log("res", res); // заметки выбранного месяца

        setEvents(res);
      });
    // отображает заметки в зависимости от today (today меняется из-за переключения кнопок prev/next)
  }, [endDayQwery, startDayQwery, today]);

  // ◼ модальное окно для заметок/дат
  const [event, setEvent] = useState(null);
  const [operation, setOperation] = useState(null);
  const [isShowForm, setShowForm] = useState(false);
  // добавив/редактировав дату будет отображаться текущее время
  const defaultEvent = {
    title: "",
    description: "",
    date: moment().format("X"),
  };

  const openFormHandler = (operationType, eventForUpdate) => {
    setShowForm(true);
    setOperation(operationType);
    setEvent(eventForUpdate || defaultEvent);
  };

  const closeFormHandler = () => {
    setShowForm(false);
    setEvent(null);
  };

  const changeEventHandler = (text, field) => {
    setEvent((prev) => ({ ...prev, [field]: text }));
  };

  // ◼ отправка добавленной/отредактированной заметки в БД
  const eventFetchHandler = () => {
    const fetchUrl =
      operation === "Update"
        ? `${BASE_URL}/events/${event.id}`
        : `${BASE_URL}/events`;
    const httpMethod = operation === "Update" ? "PATCH" : "POST";

    fetch(fetchUrl, {
      method: httpMethod,
      headers: { "Content-Type": "application/json" }, // без этого не создается тело
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);// тело заметки

        // чтобы редактировать существующую и не создавать как новую
        if (operation === "Update") {
          setEvents((prev) =>
            prev.map((eventEl) => (eventEl.id === res.id ? res : eventEl))
          );
        } else {
          setEvents((prev) => [...prev, res]);
        }

        closeFormHandler();
      });
  };

  return (
    <>
      {isShowForm && (
        <FormPositionWrapper onClick={closeFormHandler}>
          <FormWrapper onClick={(e) => e.stopPropagation()}>
            <EventTitle
              value={event.title}
              onChange={(e) => changeEventHandler(e.target.value, "title")}
            />
            <EventBody
              value={event.description}
              onChange={(e) =>
                changeEventHandler(e.target.value, "description")
              }
            />
            <ButtonsWrapper>
              <button onClick={closeFormHandler}>Cancel</button>
              <button onClick={eventFetchHandler}>{operation}</button>
            </ButtonsWrapper>
          </FormWrapper>
        </FormPositionWrapper>
      )}

      <ShadowWrapper>
        <Header />

        <Monitor
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
        />

        <Grid
          startDay={startDay}
          today={today}
          events={events}
          openFormHandler={openFormHandler}
        />
      </ShadowWrapper>
    </>
  );
}

export default App;
