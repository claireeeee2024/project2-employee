import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HrRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.role === "hr" ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};
export default HrRoute;
