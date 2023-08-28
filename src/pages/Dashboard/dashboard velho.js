/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../../components/Header/header";
import Title from "../../components/Title/title";

import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  startAfter,
  endBefore,
  query,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { format } from "date-fns";

import "./dashboard.css";

const listRef = collection(db, "chamado");
export const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  //Criar os estados
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  //saber o ultimo registro
  const [lastDocs, setLastDocs] = useState();
  // Defina um estado para rastrear o primeiro documento da página atual
  const [firstDocs, setFirstDocs] = useState(null);

  //paginação
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function loadChamados() {
      //buscar no banco a lista, ordem de decrescente de cahamado limitado até 5
      const q = query(listRef, orderBy("created", "desc"), limit(2));
      const querySnapshot = await getDocs(q);
      //solução para evitar chamado duplicado, serm remover <React.StrictMode> do index.js
      //outra solução seria remover o <React.StrictMode> e não acrescentar  setChamados([]) vazio
      setChamados([]);
      await updateState(querySnapshot);
      setLoading(false);
    }
    loadChamados();
    return () => {};
  }, []);

  //função de chamada da lista
  async function updateState(querySnapshot) {
    //verificar se está vazia
    const isCollectionEmpty = querySnapshot.size === 0;

    //testar
    if (!isCollectionEmpty) {
      let lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), "dd/MM/yyyy"),
          status: doc.data().status,
          complemento: doc.data().complemento,
        });
      });

      //pegar o último registro
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      //pegar o chamado que já existe e inserindo a lista
      setChamados((chamados) => [...chamados, ...lista]);
      //inserir o último registro no setLastDocs
      setLastDocs(lastDoc);
    } else {
      setIsEmpty(true);
    }

    //garantir que setLoadingMore false
    setLoadingMore(false);
  }

  //função paginação pra frente
  async function handleMore() {
    setLoadingMore(true);
    const q = query(
      listRef,
      orderBy("created", "desc"),
      startAfter(lastDocs),
      limit(2)
    );
    const querySnapshot = await getDocs(q);
    await updateState(querySnapshot);
  }

  // Função de paginação para a página anterior
  async function handlePrevious() {
    setLoadingMore(true);
    const q = query(
      listRef,
      orderBy("created", "desc"),
      endBefore(lastDocs),
      limit(2)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      await updateState(querySnapshot);
      // Atualize o lastDocs com o novo último documento da página atual
      const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDocs(newLastDoc);
    }
    setLoadingMore(false);
  }

  if (loading) {
    return (
      <div>
        <Header></Header>
        <div className="content">
          <Title name="Tickets">
            <FiMessageSquare size={25}></FiMessageSquare>
          </Title>

          <div className="container spanChamados">
            <span>Buscando chamados...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header></Header>
      <div className="content">
        <Title name="Agenda Consultas">
          <FiMessageSquare size={25}></FiMessageSquare>
        </Title>

        <>
          {chamados.length === 0 ? (
            <div className="botoes col-6 col-md-12">
              <div className="botoes spanChamados">
                <span>Não tem chamados!</span>
              </div>

              <div className="teste">
                <button
                  className="btn btn-success btn-lg"
                  type="submit"
                  id="myButton"
                >
                  <Link to="/new">
                    <FiPlus className="fi" color="#fff" size={25}></FiPlus>
                    Novo Chamado
                  </Link>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="botoes col-6 col-md-12">
                <div className="teste">
                  <button
                    className="btn btn-success btn-lg"
                    type="submit"
                    id="myButton"
                  >
                    <Link to="/new">
                      <FiPlus className="fi" color="#fff" size={25}></FiPlus>
                      Novo Chamado
                    </Link>
                  </button>
                </div>
              </div>
              <div className="container">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Clientes</th>
                      <th scope="col">Assuntos</th>
                      <th scope="col">Status</th>
                      <th scope="col">Cadastro</th>
                      <th scope="col">Botões</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chamados.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td data-label="Código">{item.clienteId}</td>
                          <td data-label="Clientes">{item.cliente}</td>
                          <td data-label="Assuntos">{item.assunto}</td>
                          <td data-label="Status">
                            <span
                              className="badge"
                              style={{
                                backgroundColor:
                                  item.status === "Aberto" ? "#5cb85c" : "#999",
                              }}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td data-label="Cadastro">{item.createdFormat}</td>
                          <td data-label="Botoes">
                            <button className="btn btn-primary action">
                              <FiSearch color="#fff" size={17}></FiSearch>
                            </button>
                            <button className="btn btn-success">
                              <FiEdit2 color="#fff" size={17}></FiEdit2>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {loadingMore && <h3>Buscando Mais Chamados...</h3>}

                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <a className="page-link" onClick={handleMore}>
                        Próxima Página
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link">2</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" onClick={handlePrevious}>
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </>
        {/**
        <button className="btn btn-light" type="button" onClick={handleLogout}>
          Sair da Sistema
        </button> */}
      </div>
    </div>
  );
};
