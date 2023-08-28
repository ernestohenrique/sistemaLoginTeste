/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import Header from "../../components/Header/header";
import Title from "../../components/Title/title";

import { FiPlusCircle } from "react-icons/fi";
import { AuthContext } from "../../contexts/auth";

import { db /*storage*/ } from "../../services/firebaseConnection";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
//import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";

//pegar o id do link da pagina
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "./new.css";

const listRef = collection(db, "customers");

export default function New() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  //lista de clientes vazia
  const [customers, setCustomers] = useState([]);
  const [loadCustomer, setLoadCustomer] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0);

  //valores dos campos
  const [complemento, setComplemento] = useState("");
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  //criar um estado para atualizar os dados no banco
  const [idCustomer, setIdCustomer] = useState(false);

  useEffect(() => {
    async function loadCustomers() {
      const querySnapshot = await getDocs(listRef)
        .then((snapshot) => {
          //criar um array para pegar a lista de ids do banco
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeResponsavel: doc.data().nomeResponsavel,
            });
          });
          if (snapshot.docs.size === 0) {
            console.log("Nenhum cliente encontrado");
            setCustomers([{ id: "1", nomeResponsavel: "Tulio Henrique" }]);
            setLoadCustomer(false);
            return;
          }
          setCustomers(lista);
          setLoadCustomer(false);

          if (id) {
            loadId(lista);
          }
        })
        .catch((error) => {
          console.log("ERRO AO BUSCAR CLIENTES", error);
          setLoadCustomer(false);
          setCustomers([{ id: "1", nomeResponsavel: "Tulio Henrique" }]);
        });
    }
    loadCustomers();
    //id array de dependencia
  }, [id]);

  async function loadId(lista) {
    const docRef = doc(db, "chamado", id);
    await getDoc(docRef)
      .then((snapshot) => {
        setAssunto(snapshot.data().assunto);
        setStatus(snapshot.data().status);
        setComplemento(snapshot.data().complemento);

        //comparar o snapshot com o index do id
        let index = lista.findIndex(
          (item) => item.id === snapshot.data().clienteId
        );
        setCustomerSelected(index);
        //atualizar o setIdCustomer
        setIdCustomer(true);
      })
      .catch((error) => {
        console.log(error);
        setIdCustomer(false);
      });
  }

  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  function handleChangeSelect(e) {
    setAssunto(e.target.value);
    //alert(e.target.value);
  }

  function handleChangeCustomer(e) {
    if (setCustomerSelected(e.target.value) === "") {
      setCustomerSelected("Não tem clientes!");
    } else {
      setCustomerSelected(e.target.value);
      //pegar o nome do responsavel no array
      //console.log(customers[e.target.value].nomeResponsavel);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (idCustomer) {
      //atualizando chamado
      const docRef = doc(db, "chamado", id);
      await updateDoc(docRef, {
        cliente: customers[customerSelected].nomeResponsavel,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        complemento: complemento,
        status: status,
        userId: user.uid,
      })
        .then(() => {
          toast.info("Chamado atualizado com sucesso");
          setCustomerSelected(0);
          setComplemento("");
          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error("Ops erro ao atualizar esse chamado");
          console.log(error);
        });
      return;
    }
    //registrar chamado
    await addDoc(collection(db, "chamado"), {
      created: new Date(),
      cliente: customers[customerSelected].nomeResponsavel,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      userId: user.uid,
    })
      .then(() => {
        toast.success("Chamado Registrado");
        setComplemento("");
        setCustomerSelected(0);
      })
      .catch((error) => {
        toast.error("Ops erro ao registrar, tente mais tarde!");
        console.log(error);
      });
  }

  return (
    <div>
      <Header></Header>
      <div className="content">
        <Title
          className="Novo Chamado"
          name={id ? "Editando Chamado" : "Novo Chamado"}
        >
          <FiPlusCircle size={25}></FiPlusCircle>
        </Title>

        <div className="container">
          <form
            className="needs-validation"
            id="formAgenda"
            onSubmit={handleRegister}
          >
            <div className="row">
              <div className="col-md-4">
                <label>Cliente 1</label>

                {loadCustomer ? (
                  <input type="text" disabled={true} value="Carregando"></input>
                ) : (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={customerSelected}
                    onChange={handleChangeCustomer}
                  >
                    {customers.map((item, index) => {
                      return (
                        <option key={index} value={index}>
                          {item.nomeResponsavel}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
              <div className="col-md-4">
                <label>Assunto</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={assunto}
                  onChange={handleChangeSelect}
                >
                  <option value="Suporte">Suporte</option>
                  <option value="Visita Tecnica">Visita Tecnica</option>
                  <option value="Financeiro">Financeiro</option>
                </select>
              </div>
              <div className="col-md-4">
                <label>Status</label>
                <div className="status">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="Aberto"
                    onChange={handleOptionChange}
                    checked={status === "Aberto"}
                  ></input>
                  <span>Em aberto</span>

                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="Progresso"
                    onChange={handleOptionChange}
                    checked={status === "Progresso"}
                  ></input>
                  <span>Progresso</span>

                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="Atendido"
                    onChange={handleOptionChange}
                    checked={status === "Atendido"}
                  ></input>
                  <span>Atendido</span>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col">
                <div className="form-floating">
                  <textarea
                    className="textarea form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">Comments</label>
                </div>
              </div>
            </div>
            <br />
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Confirm identity
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
