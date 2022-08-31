import moment from "moment";
import {
  CellWrapper,
  RowInCellWrapper,
} from "../../containers/StyledComponents";
import { DAYS_IN_WEEK } from "../../constants";

const GridHeader = () => (
  <>
    {[...Array(DAYS_IN_WEEK)].map((_, index) => (
      <CellWrapper key={index} isHeader isCurrentMonth>
        <RowInCellWrapper justifyContent={"flex-end"} pr={1}>
          {/* index+1 - чтобы начало недели было с Пн */}
          {moment()
            .day(index + 1)
            .format("ddd")}
        </RowInCellWrapper>
      </CellWrapper>
    ))}
  </>
);

export { GridHeader };
