/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../img/logo/logoHorizontal.png";

import Header from "../components/Header/header";

export const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
  }
  return (
    <div>
      <nav
        className="navbar bg-dark border-bottom border-body "
        data-bs-theme="dark"
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand">
            <Image src={logo} alt="Logo" width="200"></Image>
          </a>
          <h4 className="text-center text-white">Sistema Clínica Micheline</h4>
          <button
            className="btn btn-light"
            type="button"
            onClick={handleLogout}
          >
            Sair da Sistema
          </button>
        </div>
      </nav>

      <div className="card text-center">
        <h5 className="-title">Página Dashboard</h5>
      </div>
      <Header></Header>
    </div>
  );
};
