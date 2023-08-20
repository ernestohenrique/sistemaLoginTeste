import { useState, createContext } from "react";
import { auth, db } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false); // Remova a definição de loadingAuth

  //cria um hook
  const navigate = useNavigate();

  async function signIn(email, password) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "user", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("Bem-vindo(a) de volta!");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
        toast.error("Ops algo deu arrado!");
      });
  }

  async function signUp(email, password, name) {
    setLoadingAuth(true); // Remova essa linha

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "user", uid), {
          nome: name,
          avatarUrl: null,
        }).then(() => {
          //alert("Cadastrado com sucesso");

          //Criar um objeto
          let data = {
            uid: uid,
            nome: name,
            email: value.user.email,
            avatarUrl: null,
          };
          setUser(data);
          //storage navegador
          storageUser(data);
          setLoadingAuth(false); // Remova essa linhad
          //toaste mensagem
          toast.success("Seja Bem-vindo ao sistema!");
          navigate("/sign-in");
        });
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false); // Remova essa linha
      });
  }

  //Salvar no storage do navegador
  function storageUser(data) {
    localStorage.setItem("@ticketsPRO", JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
