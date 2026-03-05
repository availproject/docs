import ViewHistory from "../view-history/view-history";
import ShowcaseWrapper from "./showcase-wrapper";

const ViewHistoryShowcase = () => {
  return (
    <ShowcaseWrapper type="view-history">
      <ViewHistory viewAsModal={false} />
    </ShowcaseWrapper>
  );
};

export default ViewHistoryShowcase;
