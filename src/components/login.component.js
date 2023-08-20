/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Image } from "react-bootstrap";
import logo from "../img/logo/logoHorizontal.png";
import "../css/login.css";

export default function Login() {
  const { signIn, loadingAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(""); // Adicione o estado para o email
  const [password, setPassword] = useState(""); // Adicione o estado para a senha

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function validateEmail(emailValue) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  }

  function validatePassword(passwordValue) {
    return passwordValue.length >= 6; // Exemplo: senha deve ter pelo menos 6 caracteres
  }

  async function handleSignIn(e) {
    e.preventDefault();

    // Validação do e-mail
    if (email === "") {
      setEmailError("O campo de e-mail é obrigatório.");
      return;
    } else {
      setEmailError("");
    }

    // Validação da senha
    if (password === "") {
      setPasswordError("O campo de senha é obrigatório.");
      return;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      return;
    } else {
      setPasswordError("");
    }

    if (!validateEmail(email)) {
      setEmailError("Digite um e-mail válido");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setEmailError("");
    setPasswordError("");

    // Realiza o login se os campos estiverem válidos
    try {
      await signIn(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="main">
      <form onSubmit={handleSignIn} className="form">
        <div className="m-4">
          <Image src={logo} alt="Logo Clínica" id="img"></Image>
        </div>
        <h5 className="titulo">ENTRAR NO SISTEMA</h5>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualize o estado do email
          />
          <label htmlFor="floatingInput">Email</label>
          {emailError && <p className="error-text">{emailError}</p>}
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualize o estado da senha
          />
          <label htmlFor="floatingPassword">Senha</label>
          {passwordError && <p className="error-text">{passwordError}</p>}
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          ></input>
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Lembrar login
          </label>
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-success"
            onSubmitCapture={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
          >
            {loadingAuth ? "Carregando..." : "Acessar"}
          </button>
        </div>
      </form>
    </main>
  );
}
