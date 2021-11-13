import Productos from "./Productos";
import ReactDOM from "react-dom";
import RealizarVenta from "./RealizarVenta";
import Usuarios from "./Usuarios";
import Ventas from "./Ventas";
import React from "react";

const Admin = () => {
  const productos = () => {
    return ReactDOM.render(<Productos />, document.getElementById("root"));
  };

  const vender = () => {
    return ReactDOM.render(<RealizarVenta />, document.getElementById("root"));
  };

  const usuarioss = () => {
    return ReactDOM.render(<Usuarios />, document.getElementById("root"));
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
                        onClick={() => productos()}
                      >
                        Gestionar Productos
                      </button>
                    </th>
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
                        onClick={() => usuarioss()}
                      >
                        Gestionar Usuarios
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

export default Admin;
