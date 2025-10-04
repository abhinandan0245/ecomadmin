import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { token } = useSelector((state: IRootState) => state.auth);

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return token ?  children : <Navigate to="/order/allorders" replace />;
};

export default PrivateRoute;




