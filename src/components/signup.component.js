import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";

const SignUp = () => {
  const { signUp, loadingAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Clear error messages when input changes
    if (name === "name") {
      setNameError("");
    } else if (name === "email") {
      setEmailError("");
    } else if (name === "password") {
      setPasswordError("");
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "") {
      setNameError("O campo de nome é obrigatório.");
      return;
    }

    if (email === "") {
      setEmailError("O campo de e-mail é obrigatório.");
      return;
    } else if (!isValidEmail(email)) {
      setEmailError("Digite um e-mail válido.");
      return;
    }

    if (password === "") {
      setPasswordError("O campo de senha é obrigatório.");
      return;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    signUp(email, password, name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label htmlFor="name">First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        {nameError && <p className="error-text">{nameError}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        {emailError && <p className="error-text">{emailError}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        {passwordError && <p className="error-text">{passwordError}</p>}
      </div>

      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loadingAuth} // Disable the button while submitting
          onSubmitCapture={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          {loadingAuth ? "Carregando..." : "Cadastrar"}
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  );
};

export default SignUp;

/*import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";

const SignUp = () => {
  const { signUp, loadingAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação do campo de nome
    if (name === "") {
      setNameError("O campo de nome é obrigatório.");
      return;
    } else {
      setNameError("");
    }

    // Validação do campo de e-mail
    if (email === "") {
      setEmailError("O campo de e-mail é obrigatório.");
      return;
    } else if (!isValidEmail(email)) {
      setEmailError("Digite um e-mail válido.");
      return;
    } else {
      setEmailError("");
    }

    // Validação do campo de senha
    if (password === "") {
      setPasswordError("O campo de senha é obrigatório.");
      return;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      return;
    } else {
      setPasswordError("");
    }
    signUp(email, password, name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        {nameError && <p className="error-text">{nameError}</p>}
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        {emailError && <p className="error-text">{emailError}</p>}
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        {passwordError && <p className="error-text">{passwordError}</p>}
      </div>

      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          onSubmitCapture={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          {loadingAuth ? "Carregando..." : "Cadastrar"}
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  );
};

export default SignUp;
*/
