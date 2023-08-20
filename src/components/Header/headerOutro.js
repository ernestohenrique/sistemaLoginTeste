/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import React from "react"; // Importe o React
import "bootstrap/dist/css/bootstrap.min.css";

import { Image } from "react-bootstrap";
import avatarImg from "../../img/avatar/avatarUser.png";

import { AuthContext } from "../../contexts/auth";

import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../Header/header.css";

export default function Header() {
  //Consumir o contexto User
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
        <a>
          <span className="fs-4">Sidebar</span>
        </a>
        <div id="img">
          <Image
            //faz uma comparação se user é igual a null, caso contrário mostra user.avatarUrl
            src={user.avatarUrl === null ? avatarImg : user.avatarUrl}
            alt="Foto do usuário"
          ></Image>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/dashboard"
            >
              <FiHome
                className="bi me-2"
                width="16"
                height="16"
                color="#FFF"
                size={24}
              />
              <span>Chamados</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/customers"
            >
              <FiUser
                className="bi me-2"
                width="16"
                height="16"
                color="#FFF"
                size={24}
              />
              <span>Clientes</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/profile">
              <FiSettings
                className="bi me-2"
                width="16"
                height="16"
                color="#FFF"
                size={24}
              />
              <span>Perfil</span>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="dropdown"></div>
      </div>
    </div>
  );
}
