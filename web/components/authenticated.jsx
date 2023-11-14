import { Navigate } from "react-router-dom";
import { useAuthContext } from "../src/contexts/auth";

export function Authenticated({ children }) {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/users/login" />;
    } else {
        return children;
    }
}

export function Unauthenticated({ children }) {
    const { user } = useAuthContext();

    if (user) {
        return <Navigate to="/" />;
    } else {
        return children;
    }
}
