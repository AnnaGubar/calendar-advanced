import { TOTAL_DAYS } from "../../constants";
import { isDayContainCurrentEvent } from "../../helpers";
import { GridCell } from "../GridCell";

const MonthDaysList = ({ startDay, events, openFormHandler, today }) => {
  // clone() - чтобы не мутировать startDay
  // const day = startDay.clone().subtract(1,"day");
  const day = startDay.clone();

  // смещаем индекс на +1 что бы неделя начиналась с Пн
  const daysMap = [...Array(TOTAL_DAYS)].map(() => day.add(1, "day").clone());

  return (
    <>
      {/* перечень дней недели */}
      {daysMap.map((dayItem) => (
        <GridCell
        key={dayItem}
          dayItem={dayItem}
          today={today}
          openFormHandler={openFormHandler}
          events={events.filter((event) =>
            isDayContainCurrentEvent(event, dayItem)
          )}
        />
      ))}
    </>
  );
};

export { MonthDaysList };
