import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../../components/spinner";
import { useGetHosts } from "../../../../queries/entities";
import { getHostDetailsRoute } from "../../../../router";
import { Layout } from "../../../../components/layout";
import { useAuth } from "../../../../contexts/auth-provider";
import { assertUserLoggedIn } from "../../../../utils/assert-user-logged-in";

const Hosts = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { isLoading, data: hosts } = useGetHosts();
  const { user } = useAuth();

  assertUserLoggedIn(user);

  const handleRowClick = (id: string) => {
    // Navigate to a detailed view for the clicked host
    navigate(getHostDetailsRoute(user.orgId, id)); // Adjust the path as needed
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Layout title={"Hosts"}>
      <TableContainer component={Paper} sx={{ maxWidth: 1100 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>CPU Load</TableCell>
              <TableCell>Active Alerts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hosts?.map((host) => (
              <TableRow
                key={host.id}
                onClick={() => handleRowClick(host.id)} // Handle row click
                sx={{ cursor: "pointer", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" } }} // Add hover effect
              >
                <TableCell><DeveloperBoardIcon/></TableCell>
                <TableCell>{host.name}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Hosts;
