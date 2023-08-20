/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
//import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "../img/logo/logoHorizontal.png";

import Header from "../components/Header/header";
import Title from "../components/Title/title";

import { FiHome } from "react-icons/fi";

export const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
  }
  return (
    <div>
      <Header></Header>
      <div className="content">
        <Title name="Dashboard">
          <FiHome size={25}></FiHome>
        </Title>
        <button className="btn btn-light" type="button" onClick={handleLogout}>
          Sair da Sistema
        </button>
      </div>
    </div>
  );
};
