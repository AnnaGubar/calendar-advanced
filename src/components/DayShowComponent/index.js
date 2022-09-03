import styled from "styled-components";
import {
  ButtonsWrapper,
  ButtonWrapper,
  EventBody,
  EventItemWrapper,
  EventListItemWrapper,
  EventListWrapper,
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

  return (
    <DayShowWrapper>
      <EventsListWrapper>
        <EventListWrapper>

          {eventsList.map((event) => (
            <EventListItemWrapper key={event.id}>
              <EventItemWrapper
                onClick={() => openFormHandler("Update", event)}
              >
                {event.title}
              </EventItemWrapper>
            </EventListItemWrapper>
          ))}
        </EventListWrapper>
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
              onChange={(e) =>changeEventHandler(e.target.value, "description")}
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
              <button onClick={() => openFormHandler("Create",null, today)}>Create new event</button>
            </div>
            <NoEventMsg>No event selected</NoEventMsg>
          </>
        )}
      </EventFormWrapper>
    </DayShowWrapper>
  );
};

export { DayShowComponent };
