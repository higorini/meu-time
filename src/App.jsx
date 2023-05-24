import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

import { Outlet } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="main">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
