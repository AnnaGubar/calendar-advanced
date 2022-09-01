import moment from "moment";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { Grid } from "../Grid";
import { Header } from "../Header";
import { Monitor } from "../Monitor";
import {
  TOTAL_DAYS,
  BASE_URL,
  DISPLAY_MODE_MONTH,
  DISPLAY_MODE_DAY,
} from "../../constants";
import { DayShowComponent } from "../DayShowComponent";

const ShadowWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  min-width: 850px;
  height: 702px;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
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
  width: 320px;
  min-width: 320px;
  height: 132px;
  background-color: #1e1f21;
  color: #ddd;
  /* box-shadow: none; */
`;

const EventTitle = styled("input")`
  padding: 8px 14px;
  width: 100%;
  font-size: 0.85rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #464648;
  background-color: #1e1f21;
  color: #ddd;
`;

const EventBody = styled("textarea")`
  padding: 8px 14px;
  width: 100%;
  height: 60px;
  font-size: 0.85rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #464648;
  background-color: #1e1f21;
  color: #DDD;
  resize: none;
`;

const ButtonsWrapper = styled("div")`
  display: flex;
  justify-content: flex-end;
  padding: 8px 14px;
`;

const ButtonWrapper = styled("button")`
  background-color: ${(props) => props.danger && "rgba(254, 49, 25, 0.8)"};
  border-radius: 2px;
  font-weight: 700;
  cursor: pointer;
  &:not(:last-child) {margin-right: 2px};
`;

function App() {
  window.moment = moment;
  // ◼ определение и отображение выбранного месяца с неактивными днями пред/след месяцев
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");

    // ◼ отображение месяца с заметками и расписания дня
    const [displayMode, setDisplayMode] = useState("month");

  const prevHandler = () => {
    setToday((prev) => prev.clone().subtract(1, displayMode));
  };
  const todayHandler = () => {
    setToday(moment());
  };
  const nextHandler = () => {
    setToday((prev) => prev.clone().add(1, displayMode));
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

  const openFormHandler = (operationType, eventForUpdate, dayItem) => {
    setShowForm(true);
    setOperation(operationType);

    // дефолтная заметка = создание заметки в текущей дате
    // setEvent(eventForUpdate || defaultEvent);
    // дефолтная заметка + кликнутая дата = создание заметки в кликнутую дату
    setEvent(eventForUpdate || { ...defaultEvent, date: dayItem.format("X") });
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

  const removeEventHandler = () => {
    fetch(`${BASE_URL}/events/${event.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        setEvents((prev) =>
          prev.filter((prevEvent) => prevEvent.id !== event.id)
        );

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
              placeholder="Title"
            />
            <EventBody
              value={event.description}
              onChange={(e) =>
                changeEventHandler(e.target.value, "description")
              }
              placeholder="Description"
            />
            <ButtonsWrapper>
              <ButtonWrapper onClick={closeFormHandler}>Cancel</ButtonWrapper>
              <ButtonWrapper onClick={eventFetchHandler}>
                {operation}
              </ButtonWrapper>
              {operation === "Update" && (
                <ButtonWrapper danger onClick={removeEventHandler}>
                  Remove
                </ButtonWrapper>
              )}
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
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
        />

        {displayMode === DISPLAY_MODE_MONTH && (
          <Grid
            startDay={startDay}
            today={today}
            events={events}
            openFormHandler={openFormHandler}
          />
        )}

        {displayMode === DISPLAY_MODE_DAY && (
          <DayShowComponent
            events={events}
            today={today}
            selectedEvent={event}
            setEvent={setEvent}
          />
        )}
      </ShadowWrapper>
    </>
  );
}

export default App;
