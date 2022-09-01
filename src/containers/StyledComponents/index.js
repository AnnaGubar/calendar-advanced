import styled from "styled-components";

export const CellWrapper = styled.div`
  min-width: 120px;
  min-height: ${(props) => (props.isHeader ? 24 : 94)}px;
  background-color: ${(props) => (props.isWeekend ? "#272829" : "#1e1f21")};
  color: ${(props) => (props.isCurrentMonth ? "#DDD;" : "#555759")};
`;

export const RowInCellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent ? props.justifyContent : "flex-start"};
  ${(props) => props.pr && `padding-right:${props.pr * 8}px`}; // пропс pr={1} отступ(1*8)px
`;

export const EventListWrapper = styled('ul')`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const EventListItemWrapper = styled('li')`
	display: flex;
	padding: 0 2px;
	margin-bottom: 2px;
`;

export const EventItemWrapper = styled('button')`
	position: relative;
	flex-grow: 1;
	width: 114px;
	margin: 0;
	padding: 0;
	text-align: left;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	border: unset;
	border: 1px solid #5d5f63;
	border-radius: 2px;
	color: #DDD;
	background-color: #5d5f63;
	cursor: pointer;

`;

// export const EventTitle = styled('input')`
//   padding: 8px 14px;
//   font-size: .85rem;
//   width: 100%;
//   border: unset;
//   background-color: #1E1F21;
//   color: #DDDDDD;
//   outline: unset;
//   border-bottom: 1px solid #464648;
// `;

// export const EventBody = styled('textarea')`
//   padding: 8px 14px;
//   font-size: .85rem;
//   width: 100%;
//   border: unset;
//   background-color: #1E1F21;
//   color: #DDDDDD;
//   outline: unset;
//   border-bottom: 1px solid #464648;
//   resize: none;
//   height: 60px;
// `;

// export const ButtonsWrapper = styled('div')`
//   padding: 8px 14px;
//   display: flex;
//   justify-content: flex-end;
// `;

// export const ButtonWrapper = styled('button')`
//   color: ${props => props.danger ? '#f00' : '#27282A'};
//   border: 1px solid ${props => props.danger ? '#f00' : '#27282A'};
//   border-radius: 2px;
//   cursor: pointer;
//   &:not(:last-child){
//     margin-right: 2px;
//   }
// `;
