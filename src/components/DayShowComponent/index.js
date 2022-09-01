import styled from "styled-components";
import {
  EventItemWrapper,
  EventListItemWrapper,
  EventListWrapper,
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
`;

const NoEventMsg = styled("div")`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  color: #565759;
`;

const DayShowComponent = ({ events, today, selectedEvent, setEvent }) => {
  const eventsList = events.filter((event) =>
    isDayContainCurrentEvent(event, today)
  );

  return (
    <DayShowWrapper>
      <EventsListWrapper>
        <EventListWrapper>

          {eventsList.map((event) => (
            <EventListItemWrapper key={event.id}>
              <EventItemWrapper onClick={() => setEvent(event)}>
                {event.title}
              </EventItemWrapper>
            </EventListItemWrapper>
          ))}

        </EventListWrapper>
      </EventsListWrapper>

      <EventFormWrapper>
        {selectedEvent ? (
          <div>
            <h3>{selectedEvent.title}</h3>
          </div>
        ) : (
          <NoEventMsg>No event selected</NoEventMsg>
        )}
      </EventFormWrapper>
    </DayShowWrapper>
  );
};

export { DayShowComponent };
