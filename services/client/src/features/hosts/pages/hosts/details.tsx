import { useParams } from "react-router-dom";
import { Layout } from "../../../../components/layout";
import TimeWindow from "../../../../components/time-window";

const HostDetails = () => {
  const { id } = useParams();

  return (
    <Layout title={"Host Details"}>
      <div>
        <h2>Host Details Page</h2>
        <TimeWindow/>
        <p>Host ID: {id}</p>
        {/* Add your host details related code here */}
      </div>
    </Layout>
  );
};

export default HostDetails;
