import { Layout } from "../components/layout";
import { useAuth } from "../contexts/auth-provider";
import { assertUserLoggedIn } from "../utils/assertions";

export const Home = () => {
  const { user } = useAuth();

  assertUserLoggedIn(user);

  return (
    <Layout title={"Dashboard"}>
      Hello {user.fullName} from organization {user.orgName}!
    </Layout>
  );
};
