import moment from "moment";
import styled from "styled-components";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${(props) => (props.isHeader ? "#1e1f21" : "#404040")};
  ${(props) => props.isHeader && "border-bottom:1px solid #404040"}
`;

const CellWrapper = styled.div`
  min-width: 140px;
  min-height: ${(props) => (props.isHeader ? 24 : 80)}px;
  background-color: ${(props) => (props.isWeekend ? "#272829" : "#1e1f21")};
  color: ${(props) => (props.isCurrentMonth ? "#dddcdd;" : "#555759")};
`;

const RowInCellWrapper = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  ${(props) =>
    props.pr &&
    `padding-right:${props.pr * 8}px`}; // пропс pr={1} отступ(1*8)px
`;
const DayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  width: 33px;
  margin: 2px;
`;

const CurrentDay = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f00;
  border-radius: 50%;
`;

const Grid = ({ startDay,today }) => {
  // разметка - максимально 6 недель по 7 дней
  const TOTAL_DAYS = 42;

  // clone() - чтобы не мутировать startDay
  // const day = startDay.clone().subtract(1,"day");
  const day = startDay.clone();

  // смещаем индекс на +1 что бы неделя начиналась с Пн
  const daysMap = [...Array(TOTAL_DAYS)].map(() => day.add(1, "day").clone());

  const isCurrentDay = (day) => moment().isSame(day, "day");
  const isCurrentMonth = (day) => today.isSame(day, "month");

  return (
    <>
      <GridWrapper isHeader>
        {[...Array(7)].map((_, index) => (
          <CellWrapper key={index} isHeader isCurrentMonth>
            <RowInCellWrapper justifyContent={"flex-end"} pr={1}>
              {/* index+1 - чтобы начало недели было с Пн */}
              {moment()
                .day(index + 1)
                .format("ddd")}
            </RowInCellWrapper>
          </CellWrapper>
        ))}
      </GridWrapper>

      <GridWrapper>
        {daysMap.map((dayItem) => (
          <CellWrapper
            key={dayItem.unix()}
            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
            isCurrentMonth={isCurrentMonth(dayItem)}
          >
            <RowInCellWrapper justifyContent={"flex-end"}>
              <DayWrapper>
                {!isCurrentDay(dayItem) ? (
                  dayItem.format("D")
                ) : (
                  <CurrentDay>{dayItem.format("D")}</CurrentDay>
                )}
              </DayWrapper>
            </RowInCellWrapper>
          </CellWrapper>
        ))}
      </GridWrapper>
    </>
  );
};

export { Grid };
