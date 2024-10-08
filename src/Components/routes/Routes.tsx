import { Routes, Route, useLocation } from "react-router-dom";
import {
  SignUp,
  Signin,
  Header,
  Footer,
  ContactUs,
  Profile,
  ForgotPassword,
  AddTransaction,
  ListTransaction,
  Verification,
} from "../index";

const AppRoutes = () => {
  const location = useLocation();
  const noHeaderRoutes = ["/verification"];
  return (
    <>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signIn" element={<Signin />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/addTransaction" element={<AddTransaction />} />
        <Route path="/listTransaction" element={<ListTransaction />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
      {!noHeaderRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default AppRoutes;
