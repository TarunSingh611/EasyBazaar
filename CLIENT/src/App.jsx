import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import CartPage from "./pages/cart/cart";
import ForgotPass from "./pages/Pass/forgotPass";
import NewPass from "./pages/Pass/newPass";
import ChangePass from "./pages/Pass/changePass";
import AdminAdd from "./pages/Admin/adminAdd";
import Admin from "./pages/Admin/admin";
import LogoutPage from "./pages/LogoutPage/LogoutPage";

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route path="/newPass" element={<NewPass />} />
          <Route path="/changePass" element={<ChangePass />} />
          <Route path="/adminAdd" element={<AdminAdd />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
}

export default App;
