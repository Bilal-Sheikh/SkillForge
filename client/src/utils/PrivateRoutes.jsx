import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoutes = () => {

    if (localStorage.getItem('token')) {

        return <Outlet />
    } else {

        return <Navigate to='/unauthorized' />
    }
}

export default PrivateRoutes