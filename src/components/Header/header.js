import { useContext } from "react";
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
    <div className="sidebar">
      <div>
        <Image
          id="img"
          //faz uma comparação se user é igual a null, caso contrário mostra user.avatarUrl
          src={user.avatarUrl === null ? avatarImg : user.avatarUrl}
          alt="Foto do usuário"
        ></Image>
      </div>
      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        <span>Chamados</span>
      </Link>

      <Link to="/customers">
        <FiUser color="#FFF" size={24} />
        <span>Clientes</span>
      </Link>

      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />
        <span>Perfil</span>
      </Link>
    </div>
  );
}
