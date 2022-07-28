import "./App.css";
import Header from "./components/Header";
// import QRCustomer from "./components/QRCustomer";
import Login from "./components/Login";
import Orders from "./pages/Orders";
import Tables from "./components/Tables";
import Scanner from "./pages/Scanner";
import Kitchen from "./pages/Kitchen";
import ProtectedRoute from "./components/ProtectedRoutes";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute redirectTo="/login">
              <Tables />
            </ProtectedRoute>
          }
        />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/kitchen" element={<Kitchen />} />
        {/* <Route path="/qr" element={<QRCustomer />} /> */}
        <Route path="*" element={<h1>404- Not Found </h1>} />
      </Routes>
    </div>
  );
}

export default App;
