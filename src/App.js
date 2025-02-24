import {Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Users from "./Users.tsx";
import UserCreate from "./UserCreate.tsx";
import UserUpdate from "./UserUpdate.tsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/create" element={<UserCreate />} />
        <Route path="/update/:id" element={<UserUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
