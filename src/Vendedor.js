import ReactDOM from "react-dom";
import RealizarVenta from "./RealizarVenta";
import Ventas from "./Ventas";
import React from "react";

const Vendedor = () => {
  const vender = () => {
    return ReactDOM.render(<RealizarVenta />, document.getElementById("root"));
  };

  const ventass = () => {
    return ReactDOM.render(<Ventas />, document.getElementById("root"));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s11">
          <div className="card">
            <div className="card-content">
              <div>
                <table>
                  <thead>
                    <th>
                      <button
                        class="waves-effect deep-purple darken-1 btn"
                        onClick={() => vender()}
                      >
                        Realizar Venta
                      </button>
                    </th>
                    <th>
                      <button
                        class="waves-effect deep-purple darken-1 btn"
                        onClick={() => ventass()}
                      >
                        Actualizar Ventas
                      </button>
                    </th>
                  </thead>
                  <thead><th></th><th></th></thead>
                  <thead>
                      <a href="/">Atrás</a>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendedor;
