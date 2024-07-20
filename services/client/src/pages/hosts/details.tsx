import { useParams } from 'react-router-dom';

const HostDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Host Details Page</h2>
      <p>Host ID: {id}</p>
      {/* Add your host details related code here */}
    </div>
  );
};

export default HostDetails;
