import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false); // Remova a definição de loadingAuth
  const [loading, setLoading] = useState(true);

  //cria um hook
  const navigate = useNavigate();

  //criar um cilco de vida da aplicação
  useEffect(() => {
    async function loadUser() {
      //buscar local storage
      const storageUser = localStorage.getItem("@ticketsPRO");

      //verificar se tem alguma coisa
      if (storageUser) {
        //converter o storage de string para objeto
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      //caso não entrar no IF
      setLoading(false);
    }
    loadUser();
  }, []);

  async function signIn(email, password) {
    setLoadingAuth(true);
    try {
      const value = await signInWithEmailAndPassword(auth, email, password);
      const uid = value.user.uid;
      const docRef = doc(db, "user", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = {
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
      } else {
        //setLoadingAuth(false);
        throw new Error("Usuário não encontrado. Verifique seu email e senha."); // Display an error message
      }
    } catch (error) {
      console.log(error);
      setLoadingAuth(false);
      toast.error("Usuário ou senha inválidos.");
    }
  }

  async function signUp(email, password, name) {
    setLoadingAuth(true); // Remova essa linha
    try {
      const value = await createUserWithEmailAndPassword(auth, email, password);
      const uid = value.user.uid;

      const docRef = doc(db, "user", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          nome: name,
          avatarUrl: null,
        });

        const data = {
          uid: uid,
          nome: name,
          email: value.user.email,
          avatarUrl: null,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("Seja Bem-vindo ao sistema!");
        navigate("/sign-in");
      } else {
        throw new Error("Usuário já existe no banco.");
      }
    } catch (error) {
      console.log(error);
      setLoadingAuth(false);
      toast.error("Usuário já existe no banco.");
    }
  }

  //Salvar no storage do navegador
  function storageUser(data) {
    localStorage.setItem("@ticketsPRO", JSON.stringify(data));
  }

  //criar metodo de logout
  async function logout() {
    await signOut(auth);
    //remover user do localstorage
    localStorage.removeItem("@ticketsPRO");
    //limpar informações do usuário
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        logout,
        loadingAuth,
        loading,
        storageUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
