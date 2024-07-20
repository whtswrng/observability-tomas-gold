import { Layout } from "../components/layout";
import { useAuth } from "../contexts/auth-provider";

export const Home = () => {
  const { user } = useAuth();

  return (
    <Layout title={"Dashboard"}>
      Hello {user?.fullName} from organization {user?.orgName}!
    </Layout>
  );
};
