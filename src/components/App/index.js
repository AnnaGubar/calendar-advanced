import moment from "moment";
import styled from "styled-components";
import { Grid } from "../Grid";
import { Header } from "../Header";
import { Monitor } from "../Monitor";

const ShadowWrapper = styled("div")`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;

  border-radius: 8px;
  overflow: hidden;
`;

function App() {
  const today = moment()
  // c какого дня в календаре начинается первая неделя месяца (разметка)
  const startDay = today.clone().startOf("month").startOf("week");
  // каким днем в календаре заканчивается последняя неделя месяца (разметка)
  // const endDay = moment().endOf("month").endOf("week");


  return (
    <ShadowWrapper>
      <Header />
      <Monitor today={today}/>
      <Grid startDay={startDay} />
    </ShadowWrapper>
  );
}

export default App;


