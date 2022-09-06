import styled from "styled-components";
import { DISPLAY_MODE_DAY } from "../../constants";
import {
  CellWrapper,
  RowInCellWrapper,
} from "../../containers/StyledComponents";
import { isCurrentDay, isCurrentMonth } from "../../helpers";

const DayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  width: 33px;
  margin: 2px;
  cursor: pointer;
`;

const CurrentDay = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fe3119;
  border-radius: 50%;
`;

const ShowDayWpapper = styled("div")`
  display: flex;
  justify-content: flex-end;
`;

const EventListWrapper = styled("ul")`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const EventListItemWrapper = styled("li")`
  padding-left: 2px;
  padding-right: 2px;
  margin-bottom: 2px;
  display: flex;
`;

const EventItemWrapper = styled("button")`
  position: relative;
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  color: #DDD;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
  background-color: #5d5f63;
  border: 1px solid #5d5f63;
  border-radius: 2px;
`;

const MoreEventItemWrapper = styled(EventItemWrapper)`
background-color: transparent;
color: #AAA;
text-align: center;
border-radius: 10px;
&:hover {
    background-color: #2A2B2D;
    color: #DDD;
  }
`

const GridCell = ({ dayItem, today, openFormHandler, events,setDisplayMode }) => {
  return (
    <>
      <CellWrapper
        key={dayItem.unix()}
        isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
        isCurrentMonth={isCurrentMonth(dayItem, today)}
      >
        {/* сетка дней */}
        <RowInCellWrapper justifyContent={"flex-end"}>
          <ShowDayWpapper>
            <DayWrapper
              onDoubleClick={() => openFormHandler("Create", null, dayItem)}
            >
              {!isCurrentDay(dayItem) ? (
                dayItem.format("D")
              ) : (
                <CurrentDay>{dayItem.format("D")}</CurrentDay>
              )}
            </DayWrapper>
          </ShowDayWpapper>

          {/* заметки */}
          <EventListWrapper>

            {/* slice(0,2) - для фиксированного отображения заметок, иначе растягивают разметку сетки */}
            {events.slice(0, 2).map((event) => (
              <EventListItemWrapper key={event.id}>
                <EventItemWrapper
                  onDoubleClick={() => openFormHandler("Update", event)}
                >
                  {event.title}
                </EventItemWrapper>
              </EventListItemWrapper>
            ))}
            {/* если заметок больше двух  */}
            {events.length > 2 ? (
              <EventListItemWrapper key="show more">
                <MoreEventItemWrapper onClick={()=>setDisplayMode(DISPLAY_MODE_DAY)}>more events</MoreEventItemWrapper>
              </EventListItemWrapper>
            ) : null}

          </EventListWrapper>
        </RowInCellWrapper>
      </CellWrapper>
    </>
  );
};

export { GridCell };
