import styled from "styled-components";

const DivWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  background-color: #1e1f21;
  color: #dcdddd;
`;

const TextWrapper = styled("span")`
  font-size: 32px;
`;

const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
`;

const ButtonWrapper = styled("button")`
  height: 20px;
  margin-right: 2px;
  border-radius: 4;
  border: none;
  color: #e6e6e6;
  background-color: #565759;
  cursor: pointer;
`;

const TodayButtonWrapper = styled(ButtonWrapper)`
  padding: 0 16px;
  font-weight: bold;
`;

const Monitor = ({ today, prevHandler, todayHandler, nextHandler }) => {
  return (
    <DivWrapper>
      <div>
        <TitleWrapper>{today.format("MMMM")}</TitleWrapper>
        <TextWrapper>{today.format("YYYY")}</TextWrapper>
      </div>
      <div>
        <ButtonWrapper onClick={prevHandler}>&lt;</ButtonWrapper>
        <TodayButtonWrapper onClick={todayHandler}>Today</TodayButtonWrapper>
        <ButtonWrapper onClick={nextHandler}>&gt;</ButtonWrapper>
      </div>
    </DivWrapper>
  );
};

export { Monitor };
