import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProviderContext";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import ConfirmAccountPage from "./pages/auth/ConfirmAccountPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import PatientPage from "./pages/patient/PatientPage";
import { ChangePasswordPage } from "./pages/veterinary/ChangePasswordPage";
import ProfilePage from "./pages/veterinary/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="confirm/:token" element={<ConfirmAccountPage />} />
          </Route>

          <Route path="/veterinary" element={<AdminLayout />}>
            <Route index element={<PatientPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
