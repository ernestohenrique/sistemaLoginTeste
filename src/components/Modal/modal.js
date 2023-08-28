import "./modal.css";
//import { FiX } from "react-icons/fi";

export default function Modal({ conteudo, close }) {
  return (
    <div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalhes do Chamado</h5>
          </div>
          <div class="modal-body">
            <h5>Informações</h5>
            <div className="row">
              <span>
                Cliente: <i>{conteudo.cliente}</i>
              </span>
            </div>
            <div className="row">
              <span>
                Assunto: <i>{conteudo.assunto}</i>
              </span>
              <span>
                Cadastrado em: <i>{conteudo.createdFormat}</i>
              </span>
            </div>

            <div className="row">
              <span>
                Status:{" "}
                <i
                  className="status-badge"
                  style={{
                    color: "#fff",
                    backgroundColor:
                      conteudo.status === "Aberto" ? "#5cb85c" : "#999",
                  }}
                >
                  {conteudo.status}
                </i>
              </span>
            </div>

            {conteudo.complemento !== "" && (
              <div className="row">
                <h5>Complemento</h5>
                <p>{conteudo.complemento}</p>
              </div>
            )}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              onClick={close}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
    /*
    <div className="modal">
      <div className="container">
        <button className="close">
          <FiX size={25} color="#FFF" />
          Voltar
        </button>

        <main>
          <h2>Detalhes do chamado</h2>

          <div className="row">
            <span>
              Cliente: <i>Mercado</i>
            </span>
          </div>

          <div className="row">
            <span>
              Assunto: <i>Suporte</i>
            </span>
            <span>
              Cadastrado em: <i>22/08/2022</i>
            </span>
          </div>

          <div className="row">
            <span>
              Status: <i>Aberto</i>
            </span>
          </div>

          <>
            <h3>Complemento</h3>
            <p>
              Aqui vai todo complemento do chamado Aqui vai todo complemento do
              chamado Aqui vai todo complemento do chamado Aqui vai todo
              complemento do chamado Aqui vai todo complemento do chamado
            </p>
          </>
        </main>
      </div>
    </div>
    */
  );
}
