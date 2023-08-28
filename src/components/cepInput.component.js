/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

function CepInput({ onAddressChange }) {
  const [cep, setCep] = useState("");

  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const handleCepChange = async (event) => {
    const newCep = event.target.value;
    setCep(newCep);

    if (newCep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${newCep}/json/`
        );
        const { logradouro, bairro, localidade, uf } = response.data;
        setAddress({
          street: logradouro,
          neighborhood: bairro,
          city: localidade,
          state: uf,
        });

        onAddressChange({
          street: logradouro,
          neighborhood: bairro,
          city: localidade,
          state: uf,
        });
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  return {
    /**
    <div className="form-group">
      <label>CEP</label>
      <input
        type="text"
        className="form-control"
        //value={cep}
        onChange={handleCepChange}
        maxLength="8"
      />

      <p>Endereço: {address.street}</p>
      <p>Bairro: {address.neighborhood}</p>
      <p>Cidade: {address.city}</p>
      <p>Estado: {address.state}</p>

    </div>*/
  };
}
export default CepInput;
