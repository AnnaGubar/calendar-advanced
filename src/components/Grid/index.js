import styled from "styled-components";
import { GridHeader } from "../GridHeader";
import { MonthDaysList } from "../MonthDaysList";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${(props) => (props.isHeader ? "#1e1f21" : "#404040")};
  ${(props) => props.isHeader && "border-bottom:1px solid #404040"}
`;

const Grid = ({ startDay, today, events, openFormHandler, setDisplayMode }) => {
  return (
    <>
      <GridWrapper isHeader>
        <GridHeader />
      </GridWrapper>

      <GridWrapper>
        <MonthDaysList
          startDay={startDay}
          events={events}
          openFormHandler={openFormHandler}
          today={today}
          setDisplayMode={setDisplayMode}
        />
      </GridWrapper>
    </>
  );
};

export { Grid };
