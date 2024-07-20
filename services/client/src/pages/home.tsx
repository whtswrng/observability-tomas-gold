import { useAuth } from "../contexts/auth-provider"

export const Home = () => {
    const {user} = useAuth();
    return <div>Hello {user?.fullName} from organization {user?.orgName}!</div>
}