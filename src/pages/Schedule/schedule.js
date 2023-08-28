/* eslint-disable react/jsx-no-comment-textnodes */
import { Image } from "react-bootstrap";
import React, { useState } from "react";
import logoAgenda from "../../img/logo/logoHorizontal.png";

import "./schedule.css";
import UppercaseInput from "../../components/toUpperCase.component";
import CEPInput from "../../components/cepInput.component";

export default function Schedule() {
  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  /*

const [endereco, setEndereco] = useState({
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [cepNotFound, setCepNotFound] = useState(false);

  function obterEnderecoPorCEP(cep) {
    cep = cep.replace(/\D/g, "");

    if (cep.length !== 8) {
      // Se o campo do CEP estiver vazio ou não tiver 8 dígitos, limpe os campos do endereço
      setEndereco({
        logradouro: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      // Defina cepNotFound como false para habilitar campos de endereço manualmente
      //setCepNotFound(false);
      return;
    }

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar o endereço");
        }
        return response.json();
      })
      .then((data) => {
        if (data.erro) {
          console.log("CEP não encontrado");
          // Defina cepNotFound como true para habilitar campos de endereço manualmente
          setCepNotFound(true);
          setEndereco({
            logradouro: "",
            bairro: "",
            cidade: "",
            estado: "",
          });
        } else {
          // Defina cepNotFound como false para desabilitar campos de endereço manualmente
          setCepNotFound(false);
          setEndereco({
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
          });
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  function handleCEPInput(event) {
    let cep = event.target.value;

    // Remova todos os caracteres não numéricos do valor do CEP
    cep = cep.replace(/\D/g, "");

    // Adicione o traço (-) após os primeiros 5 dígitos, se necessário
    if (cep.length >= 5) {
      cep = cep.substring(0, 5) + "-" + cep.substring(5);
    }

    // Atualize o campo do CEP com o valor formatado
    event.target.value = cep;

    // Obtenha o endereço com base no CEP formatado
    obterEnderecoPorCEP(cep);
  }
*/

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };

  return (
    <div className="container">
      <div className="py-5 text-center">
        <Image
          className="d-block mx-auto mb-4"
          src={logoAgenda}
          alt=""
          width="200"
        />
        <h2>Agendamento de Consulta</h2>
        <p className="lead"></p>
      </div>

      <div className="row">
        <div className="col-md-12 order-md-1">
          <h5 className="mb-3">Informação do agendamento</h5>

          <form className="needs-validation" id="formAgenda" novalidate>
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="nomeResponsavel">Nome do Responsável</label>
                <UppercaseInput
                  type="text"
                  className="form-control"
                  id="nomeResponsavel"
                  name="nomeResponsavel"
                  placeholder="Responsável pela consulta"
                  required
                ></UppercaseInput>
                <div className="invalid-feedback">
                  É obrigatório inserir o nome completo.
                </div>
              </div>

              <div className="col-md-4">
                <label for="nomePaciente">Nome do Paciente</label>
                <UppercaseInput
                  type="text"
                  className="form-control"
                  id="nomePaciente"
                  name="nomePaciente"
                  placeholder="Paciente consultado"
                  required
                />
                <div className="invalid-feedback">
                  É obrigatório inserir o nome completo.
                </div>
              </div>

              <div className="col-md-4">
                <label for="email">
                  Email <span className="text-muted">(Opcional)</span>
                </label>
                <UppercaseInput
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="fulano@exemplo.com"
                  autocomplete="off"
                />
                <div className="invalid-feedback">
                  Por favor, insira um endereço de e-mail válido.
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <CEPInput
                  onAddressChange={handleAddressChange}
                  name="cep"
                  placeholder="_____-___"
                  maxLength="9"
                  required
                />
                {/**
                <label htmlFor="cep">CEP</label>

                <input
                  type="text"
                  className="form-control"
                  id="cep"
                  name="cep"
                  placeholder="_____-___"
                  maxLength="9"
                  //onInput={handleCEPInput}

                  required
                />
                */}

                <div className="invalid-feedback">
                  É obrigatório inserir o CEP.
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label for="endereco">Endereço</label>
                <input
                  type="text"
                  className="form-control"
                  id="endereco"
                  name="endereco"
                  placeholder="Nome da AV, Rua, Tv ..."
                  //value={endereco.logradouro}
                  value={address.street}
                  //required={!cepNotFound}
                  //readOnly={!cepNotFound}
                  onChange={(event) =>
                    setAddress({ ...address, street: event.target.value })
                  }
                />
                <div className="invalid-feedback">
                  É obrigatório inserir o endereço.
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <label for="numeroLocal">Número</label>
                <input
                  type="number"
                  className="form-control"
                  id="numeroLocal"
                  name="numeroLocal"
                  placeholder="Número ou O"
                  required
                />
                <div className="invalid-feedback">
                  É obrigatório inserir o número.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label for="bairro">Bairro</label>
                <input
                  type="text"
                  className="form-control"
                  id="bairro"
                  name="bairro"
                  placeholder="Nome do bairro"
                  // value={endereco.bairro}
                  value={address.neighborhood}
                  //required={!cepNotFound}
                  // onChange={(event) =>
                  // setEndereco({ ...endereco, bairro: event.target.value })
                  //  }
                  onChange={(event) =>
                    setAddress({ ...address, neighborhood: event.target.value })
                  }
                />
                <div className="invalid-feedback">
                  É obrigatório inserir o bairro.
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <label for="cidade">Cidade</label>
                <input
                  type="text"
                  className="form-control"
                  id="cidade"
                  name="cidade"
                  placeholder="Nome da cidade"
                  //value={endereco.cidade}
                  value={address.city}
                  //required={!cepNotFound}
                  //onChange={(event) =>
                  // setEndereco({ ...endereco, cidade: event.target.value })
                  // }
                  onChange={(event) =>
                    setAddress({ ...address, city: event.target.value })
                  }
                />
                <div className="invalid-feedback">
                  É obrigatório inserir a cidade.
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <label for="estado">Estado</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="estado"
                  name="estado"
                  //value={endereco.estado}
                  value={address.state}
                  //required={!cepNotFound}
                  //onChange={(event) =>
                  //setEndereco({ ...endereco, estado: event.target.value })
                  // }
                  onChange={(event) =>
                    setAddress({ ...address, state: event.target.value })
                  }
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
                <label for="complemento">
                  Complemento <span className="text-muted">(Opcional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="complemento"
                  name="complemento"
                  placeholder="Apartamento, casa ou referência"
                />
              </div>

              <div className="col-md-4">
                <label for="contato">Número do contato</label>
                <input
                  type="tel"
                  className="form-control"
                  id="contato"
                  name="contato"
                  oninput="formatarTelefone(this)"
                  placeholder="(__) ____-____"
                  maxlength="15"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, insira seu número de contato.
                </div>
              </div>

              <div className="col-md-4">
                <label for="contatoWhats">
                  Número do WhatsApp
                  <span className="text-muted">(Opcional)</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="contatoWhats"
                  name="contatoWhats"
                  oninput="formatarTelefone(this)"
                  placeholder="(__) ____-____"
                  maxlength="15"
                />
              </div>
            </div>
            {/*
            <hr className="mb-3" />
            <div className="row">
              <div className="col-md-8 mb-3">
                <h5 className="mb-3">Endereço para consulta</h5>
                <p className="mb-3">
                  Se o endereço for o mesmo para o atendimento domiciliar,
                  marque a opção SIM.
                </p>

                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="enderecoConsulta"
                    name="enderecoConsulta"
                    onclick="habilitaBotao()"
                  />
                  <label
                    className="custom-control-label mb-3"
                    for="enderecoConsulta"
                  >
                    <strong>SIM! É o mesmo endereço.</strong>
                  </label>
                  <p className="mb-3">
                    Se o endereço for outro clicar em cadastrar endereço.
                  </p>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="button"
                  id="btnCadEndereco"
                  onclick="mostrarEsconderDiv()"
                >
                  Cadastrar Endereço
                </button>
              </div>
            </div>
            <div className="escondido" id="endConsulta">
              <h5 className="mb-3">Cadastro do endereço para consulta</h5>
              <div className="row">
                <div className="col-md-2">
                  <label for="cepNovoConsulta">CEP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cepNovoConsulta"
                    name="cepNovoConsulta"
                    placeholder="_____-___"
                    maxlength="9"
                    oninput="formatarCEP(this)"
                    //onchange={obterEnderecoPorCEP}
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    É obrigatório inserir o CEP.
                  </div>
                </div>
                <div className="col-md-4">
                  <label for="endNovoConsulta">Endereço da Consulta</label>
                  <input
                    type="text"
                    className="form-control"
                    id="endNovoConsulta"
                    placeholder="Rua Tal"
                    name="endNovoConsulta"
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    É obrigatório inserir o endereço.
                  </div>
                </div>
                <div className="col-md-2">
                  <label for="numNovoConsulta">Número</label>
                  <input
                    type="number"
                    className="form-control"
                    id="numNovoConsulta"
                    name="numNovoConsulta"
                    placeholder="Número do local"
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    É obrigatório inserir o número.
                  </div>
                </div>

                <div className="col-md-4">
                  <label for="compNovoConsulta">
                    Complemento <span className="text-muted">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="compNovoConsulta"
                    name="compNovoConsulta"
                    placeholder="Apartamento, casa ou referência"
                    value=""
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label for="bairroNovoConsulta">Bairro</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bairroNovoConsulta"
                    name="bairroNovoConsulta"
                    placeholder="Nome do bairro"
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    É obrigatório inserir o bairro.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label for="cidNovoConsulta">Cidade</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cidNovoConsulta"
                    name="cidNovoConsulta"
                    placeholder="Nome da cidade"
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    É obrigatório inserir a cidade.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label for="estNovoConsulta">Estado</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="estNovoConsulta"
                    name="estNovoConsulta"
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
            </div>
            <hr className="mb-3" />
            <div className="row">
              <div className="col-md-3 mb-3">
                <h5 className="mb-3">Local</h5>
                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input
                      id="clinica"
                      name="localAtendimento"
                      type="radio"
                      className="custom-control-input"
                      value="clínica"
                      required
                    />
                    <label className="custom-control-label" for="clinica">
                      Clínica
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="domicilio"
                      name="localAtendimento"
                      type="radio"
                      className="custom-control-input"
                      value="domicilio"
                      required
                      checked
                    />
                    <label className="custom-control-label" for="domicilio">
                      Domicílio
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <h5 className="mb-3">Consulta</h5>
                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input
                      id="avaliacao"
                      name="tipoconsulta"
                      type="radio"
                      className="custom-control-input"
                      value="avaliação"
                      required
                    />
                    <label className="custom-control-label" for="clinica">
                      Avaliação
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="acompanhamento"
                      name="tipoconsulta"
                      type="radio"
                      className="custom-control-input"
                      value="acompanhamento"
                      required
                      checked
                    />
                    <label className="custom-control-label" for="domicilio">
                      Acompanhamento
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <h5 className="mb-3">Data</h5>
                <div className="d-block my-3">
                  <div className="mb-3">
                    <label for="dataConsulta">
                      Data da consulta
                      <span className="text-muted">(Selecionar)</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dataConsulta"
                      name="dataConsulta"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <h5 className="mb-3">Hora</h5>
                <div className="d-block my-3">
                  <div className="mb-3">
                    <label for="horaConsulta">
                      Hora da consulta
                      <span className="text-muted">(Selecionar)</span>
                    </label>
                    <input
                      type="time"
                      value="00:00"
                      step="3600"
                      className="form-control"
                      id="horaConsulta"
                      name="horaConsulta"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </div>
            */}
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
