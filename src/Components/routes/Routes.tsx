import { Routes, Route, useLocation } from 'react-router-dom';
import { SignUp, Signin,Header } from "../index";

const AppRoutes = () => {
  const location = useLocation();
  const noHeaderRoutes = ['/signup', '/signIn','/forgotpassword']; 
  return (
    <>
      {/* { !noHeaderRoutes.includes(location.pathname) && <Header /> } */}
      <Header />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signIn' element={<Signin />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
