import { Routes, Route } from 'react-router-dom';
import { SignUp, Signin,Header,Footer,ContactUs,Profile,ForgotPassword,AddTransaction,ListTransaction } from "../index";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signIn' element={<Signin />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/addTransaction' element={<AddTransaction />} />
        <Route path='/listTransaction' element={<ListTransaction />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default AppRoutes;
