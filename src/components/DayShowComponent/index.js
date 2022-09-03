import styled from "styled-components";
import moment from "moment";
import { HOURS_IN_DAY } from "../../constants";
import {
  ButtonsWrapper,
  ButtonWrapper,
  EventBody,
  EventItemWrapper,
  EventTitle,
} from "../../containers/StyledComponents";
import { isDayContainCurrentEvent } from "../../helpers";

const DayShowWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
  border-top: 1px solid #464648;
`;

const EventsListWrapper = styled("div")`
  background-color: #1e1f21;
  color: #dddddd;
  flex-grow: 1;
`;

const EventFormWrapper = styled("div")`
  position: relative;
  width: 300px;
  border-left: 1px solid #464648;
  background-color: #27282a;
  color: #dddddd;
  border-left: 1px solid #464648;
`;

const NoEventMsg = styled("div")`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  color: #565759;
`;

const ScaleWrapper = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 4px;
`;

const ScaleCellWrapper = styled("div")`
  flex-grow: 1;
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid #464648;
  }
  margin-left: 32px;
`;

const ScaleCellTimeWrapper = styled("div")`
  position: absolute;
  left: -26px;
  top: -6px;
  font-size: 8px;
`;

const ScaleCellEventWrapper = styled("div")`
  min-height: 16px;
`;

const DayShowComponent = ({
  events,
  today,
  selectedEvent,
  changeEventHandler,
  closeFormHandler,
  eventFetchHandler,
  removeEventHandler,
  operation,
  openFormHandler,
}) => {
  const eventsList = events.filter((event) =>
    isDayContainCurrentEvent(event, today)
  );

  const hoursCells = [...new Array(HOURS_IN_DAY)].map((_, index) => {
    const temp = [];

    eventsList.forEach((event) => {
      if (Number(moment.unix(Number(event.date)).format("H")) === index) {
        temp.push(event);
      }
    });
    return temp;
  });

  return (
    <DayShowWrapper>
      <EventsListWrapper>
        {/* <EventListWrapper>
          {eventsList.map((event) => (
            <EventListItemWrapper key={event.id}>
              <EventItemWrapper
                onClick={() => openFormHandler("Update", event)}
              >
                {event.title}
              </EventItemWrapper>
            </EventListItemWrapper>
          ))}
        </EventListWrapper> */}

        <ScaleWrapper>
          {hoursCells.map((eventsList, index) => (
            <ScaleCellWrapper>
              <ScaleCellTimeWrapper>
                {index ? <>{`${index}`.padStart(2, "0")}:00</> : null}
              </ScaleCellTimeWrapper>

              <ScaleCellEventWrapper>
                {eventsList.map((event) => (
                  <EventItemWrapper
                    onClick={() => openFormHandler("Update", event)}
                  >
                    {event.title}
                  </EventItemWrapper>
                ))}
              </ScaleCellEventWrapper>
            </ScaleCellWrapper>
          ))}
        </ScaleWrapper>
      </EventsListWrapper>

      <EventFormWrapper>
        {selectedEvent ? (
          <div>
            <EventTitle
              value={selectedEvent.title}
              onChange={(e) => changeEventHandler(e.target.value, "title")}
              placeholder="Title"
            />
            <EventBody
              value={selectedEvent.description}
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
          </div>
        ) : (
          <>
            <div>
              <button onClick={() => openFormHandler("Create", null, today)}>
                Create new event
              </button>
            </div>
            <NoEventMsg>No event selected</NoEventMsg>
          </>
        )}
      </EventFormWrapper>
    </DayShowWrapper>
  );
};

export { DayShowComponent };
