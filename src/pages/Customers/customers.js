import Header from "../../components/Header/header";
import Title from "../../components/Title/title";

import { FiUser } from "react-icons/fi";

export default function Customers() {
  return (
    <div>
      <Header></Header>
      <div className="content">
        <Title name="Clientes">
          <FiUser size={25}></FiUser>
        </Title>
      </div>
    </div>
  );
}
