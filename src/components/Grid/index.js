import styled from "styled-components";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 1px;
  background-color: #404040;
`;

const CellWrapper = styled.div`
  min-width: 140px;
  min-height: 80px;
  background-color: ${(props) => (props.isWeekend ? "#272829" : "#1e1f21")};
  color: #dddcdd;
`;

const RowInCellWrapper = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
`;
const DayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  width: 33px;
`;

const Grid = ({ startDay }) => {
  // разметка - максимально 6 недель по 7 дней
  const TOTAL_DAYS = 42;
  // const day = startDay.clone().subtract(1,"day");
  const day = startDay.clone();

  // смещаем индекс на +1 что бы неделя начиналась с Пн
  const daysArray = [...Array(TOTAL_DAYS)].map(() => day.add(1, "day").clone());

  return (
    <GridWrapper>

      {daysArray.map((dayItem) => (
        <CellWrapper key={dayItem.format("DDMMYYYY")} isWeekend={dayItem.day()===6 || dayItem.day()===0 }>
          <RowInCellWrapper justifyContent={"flex-end"}>
            <DayWrapper>

              {dayItem.format("D")}

            </DayWrapper>
          </RowInCellWrapper>
        </CellWrapper>
      ))}

    </GridWrapper>
  );
};

export { Grid };
