import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import PrivateRoute from '../components/PrivateRoute';

const finalRoutes = routes.map((route) => {
   
    const Element = route.protected ? (
        <PrivateRoute>{route.element}</PrivateRoute>
    ) : (
        route.element
    );

    return {
        ...route,
        element: route.layout === 'blank' ? (
            <BlankLayout>{Element}</BlankLayout>
        ) : (
            <DefaultLayout>{Element}</DefaultLayout>
        ),
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
