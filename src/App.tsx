import { Navigate, Route, Routes } from "react-router-dom";
import { SignupPage } from "@/pages/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}

export default App;
