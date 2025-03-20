import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Users from "./Users.tsx";
import UserCreate from "./UserCreate.tsx";
import UserUpdate from "./UserUpdate.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Users />} />
        <Route path="create" element={<UserCreate />} />
        <Route path="update/:id" element={<UserUpdate />} />
      </Route>
    </Routes>
  );
}

export default App;
