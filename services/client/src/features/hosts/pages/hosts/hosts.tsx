import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../../components/layout";
import { Spinner } from "../../../../components/spinner";
import { useAuth } from "../../../../contexts/auth-provider";
import { useGetHosts } from "../../../../queries/entities";
import { getHostDetailsRoute } from "../../../../router";
import { assertUserLoggedIn } from "../../../../utils/assertions";

const Hosts = () => {
  const navigate = useNavigate();
  const { isLoading, data: hosts } = useGetHosts();
  const { user } = useAuth();

  assertUserLoggedIn(user);

  const handleRowClick = (id: string) => {
    navigate(getHostDetailsRoute(user.orgId, id));
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
                onClick={() => handleRowClick(host.id)}
                sx={{ cursor: "pointer", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" } }}
              >
                <TableCell>
                  <DeveloperBoardIcon />
                </TableCell>
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
