import { useState } from "react";
import Header from "../../components/Header/header";
import Title from "../../components/Title/title";
import { FiUser } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Customers() {
  const [formData, setFormData] = useState({
    nomeResponsavel: "",
    nomePaciente: "",
    email: "",
    cep: "",
    endereco: "",
    numeroLocal: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
    contato: "",
    contatoWhats: "",
  });

  const validateFields = () => {
    for (const field of Object.keys(formData)) {
      if (formData[field] === "") {
        return false;
      }
    }
    return true;
  };

  async function handleRegister(e) {
    e.preventDefault();
    // Verifique se todos os campos obrigatórios estão preenchidos
    if (validateFields()) {
      try {
        await addDoc(collection(db, "customers"), formData);

        setFormData({
          nomeResponsavel: "",
          nomePaciente: "",
          email: "",
          cep: "",
          endereco: "",
          numeroLocal: "",
          bairro: "",
          cidade: "",
          estado: "",
          complemento: "",
          contato: "",
          contatoWhats: "",
        });

        toast.success("Dados registrados");
      } catch (error) {
        console.error(error);
        toast.error("Erro ao fazer cadastro");
      }
    } else {
      toast.error("Preencha todos os campos obrigatórios");
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  /* código correto
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    if (cep !== "" && rua !== "") {
      await addDoc(collection(db, "customers"), {
        cep: cep,
        rua: rua,
      })
        .then(() => {
          setCep("");
          setRua("");
          toast.success("Dados registrados");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao fazer cadastro");
        });
    } else {
      toast.error("Preencha todos os campos");
    }
  }
*/
  return (
    <div>
      <Header></Header>
      <div className="content">
        <Title name="Clientes">
          <FiUser size={25}></FiUser>
        </Title>
        <div className="container">
          <form
            className="needs-validation"
            id="formAgenda"
            noValidate
            onSubmit={handleRegister}
          >
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="nomeResponsavel">Nome do Responsável</label>
                <input
                  type="text"
                  className="form-control"
                  id="nomeResponsavel"
                  name="nomeResponsavel"
                  placeholder="Responsável pela consulta"
                  value={formData.nomeResponsavel}
                  onChange={(e) =>
                    handleInputChange("nomeResponsavel", e.target.value)
                  }
                  required
                ></input>
                <div className="invalid-feedback">
                  É obrigatório inserir o nome completo.
                </div>
              </div>

              <div className="col-md-4">
                <label htmlFor="nomePaciente">Nome do Paciente</label>
                <input
                  type="text"
                  className="form-control"
                  id="nomePaciente"
                  name="nomePaciente"
                  placeholder="Paciente consultado"
                  value={formData.nomePaciente}
                  onChange={(e) =>
                    handleInputChange("nomePaciente", e.target.value)
                  }
                  required
                />
                <div className="invalid-feedback">
                  É obrigatório inserir o nome completo.
                </div>
              </div>

              <div className="col-md-4">
                <label htmlFor="email">
                  Email <span className="text-muted">(Opcional)</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="fulano@exemplo.com"
                  autoComplete="off"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, insira um endereço de e-mail válido.
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="cep">CEP</label>
                <input
                  type="text"
                  className="form-control"
                  name="cep"
                  placeholder="_____-___"
                  maxLength="9"
                  value={formData.cep}
                  onChange={(e) => handleInputChange("cep", e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  É obrigatório inserir o CEP.
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="endereco">Endereço</label>
                <input
                  type="text"
                  className="form-control"
                  id="endereco"
                  name="endereco"
                  placeholder="Nome da AV, Rua, Tv ..."
                  value={formData.endereco}
                  onChange={(e) =>
                    handleInputChange("endereco", e.target.value)
                  }
                  required
                />
                <div className="invalid-feedback">
                  É obrigatório inserir o endereço.
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="numeroLocal">Número</label>
                <input
                  type="number"
                  className="form-control"
                  id="numeroLocal"
                  name="numeroLocal"
                  placeholder="Número ou O"
                  value={formData.numeroLocal}
                  onChange={(e) =>
                    handleInputChange("numeroLocal", e.target.value)
                  }
                  required
                />
                <div className="invalid-feedback">
                  É obrigatório inserir o número.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="bairro">Bairro</label>
                <input
                  type="text"
                  className="form-control"
                  id="bairro"
                  name="bairro"
                  placeholder="Nome do bairro"
                  value={formData.bairro}
                  onChange={(e) => handleInputChange("bairro", e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  É obrigatório inserir o bairro.
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="cidade">Cidade</label>
                <input
                  type="text"
                  className="form-control"
                  id="cidade"
                  name="cidade"
                  placeholder="Nome da cidade"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange("cidade", e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  É obrigatório inserir a cidade.
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="estado">Estado</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={(e) => handleInputChange("estado", e.target.value)}
                  required
                >
                  <option value="">ESCOLHA...</option>
                  <option value="AC">ACRE</option>
                  <option value="AL">ALAGOAS</option>
                  <option value="AP">AMAPÁ</option>
                  <option value="AM">AMAZONAS</option>
                  <option value="BA">BAHIA</option>
                  <option value="CE">CEARÁ</option>
                  <option value="DF">DISTRITO FEDERAL</option>
                  <option value="ES">ESPÍRITO SANTO</option>
                  <option value="GO">GOIÁS</option>
                  <option value="MA">MARANHÃO</option>
                  <option value="MT">MATO GROSSO</option>
                  <option value="MS">MATO GROSSO DO SUL</option>
                  <option value="MG">MINAS GERAIS</option>
                  <option value="PA">PARÁ</option>
                  <option value="PB">PARAÍBA</option>
                  <option value="PR">PARANÁ</option>
                  <option value="PE">PERNAMBUCO</option>
                  <option value="PI">PIAUÍ</option>
                  <option value="RJ">RIO DE JANEIRO</option>
                  <option value="RN">RIO GRANDE DO NORTE</option>
                  <option value="RS">RIO GRANDE DO SUL</option>
                  <option value="RO">RONDÔNIA</option>
                  <option value="RR">RORAIMA</option>
                  <option value="SC">SANTA CATARINA</option>
                  <option value="SP">SÃO PAULO</option>
                  <option value="SE">SERGIPE</option>
                  <option value="TO">TOCANTINS</option>
                </select>
                <div className="invalid-feedback">
                  Por favor, insira um estado válido.
                </div>
              </div>
            </div>

            <div className="mb-3"></div>

            <div className="row">
              <div className="col-md-4">
                <label htmlFor="complemento">
                  Complemento <span className="text-muted">(Opcional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="complemento"
                  name="complemento"
                  placeholder="Apartamento, casa ou referência"
                  value={formData.complemento}
                  onChange={(e) =>
                    handleInputChange("complemento", e.target.value)
                  }
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="contato">Número do contato</label>
                <input
                  type="tel"
                  className="form-control"
                  id="contato"
                  name="contato"
                  placeholder="(__) ____-____"
                  maxLength="15"
                  value={formData.contato}
                  onChange={(e) => handleInputChange("contato", e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, insira seu número de contato.
                </div>
              </div>

              <div className="col-md-4">
                <label htmlFor="contatoWhats">
                  Número do WhatsApp
                  <span className="text-muted">(Opcional)</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="contatoWhats"
                  name="contatoWhats"
                  placeholder="(__) ____-____"
                  maxLength="15"
                  value={formData.contatoWhats}
                  onChange={(e) =>
                    handleInputChange("contatoWhats", e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <hr className="mb-3" />
            <div className="d-grid gap-2 col-4 mx-auto">
              <button
                className="btn btn-success btn-lg btn-block"
                type="submit"
                id="myButton"
              >
                Salvar Agendamento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
