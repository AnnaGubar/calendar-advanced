import styled from "styled-components";

export const CellWrapper = styled.div`
  min-width: 140px;
  min-height: ${(props) => (props.isHeader ? 24 : 94)}px;
  background-color: ${(props) => (props.isWeekend ? "#272829" : "#1e1f21")};
  color: ${(props) => (props.isCurrentMonth ? "#dddcdd;" : "#555759")};
`;

export const RowInCellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  ${(props) =>
    props.pr &&
    `padding-right:${props.pr * 8}px`}; // пропс pr={1} отступ(1*8)px
`;
