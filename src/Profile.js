import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./Logout";
import Productos from "./Productos";
import ReactDOM from "react-dom";
import RealizarVenta from "./RealizarVenta";

let usuarios;
let correo;

export {correo};

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [estado, setEstado] = React.useState();

  React.useEffect(() => {
    fetch("https://sprint6backend.herokuapp.com/usuarios")
      .then((res) => res.json())
      .then((data) => {
        usuarios = data;
        for (let i = 0; i < usuarios.length; i++) {
          if (usuarios[i].correo === correo) {
            console.log(usuarios[i].correo, usuarios[i].cargo);
            setEstado(usuarios[i].cargo);
            console.log(correo);
          }
        }
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const productos = () => {
    return ReactDOM.render(<Productos />, document.getElementById("root"));
  };

  const vender = () => {
    return ReactDOM.render(<RealizarVenta/>, document.getElementById("root"));
  };

  if (estado === "admin") {
    return (
      isAuthenticated && (
        <div className="container">
          <div className="row">
            <div className="col s9">
              <div className="card">
                <div className="card-content">
                  <img src={user.picture} alt={user.name} />
                  <h2>Bienvenido {user.name}</h2>
                  <h4>Email: {(correo = user.email)}</h4>
                  <LogoutButton />
                  <h4>Perfil: Administrador</h4>
                  <div className="container">
                    <table>
                      <thead>
                        <th>
                      <button
                        class="waves-effect waves-light btn"
                        onClick={() => productos()}
                      >
                        Productos
                      </button>
                      </th>
                      <th>
                      <button
                        class="waves-effect waves-light btn"
                        onClick={() => vender()}
                      >
                        Realizar Venta
                      </button>
                      </th>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }

  if (estado === "vendedor") {
    return (
      isAuthenticated && (
        <div className="container">
          <div className="row">
            <div className="col s9">
              <div className="card">
                <div className="card-content">
                  <img src={user.picture} alt={user.name} />
                  <h2>Bienvenido {user.name}</h2>
                  <h4>Email: {(correo = user.email)}</h4>
                  <LogoutButton />
                  <h4>Perfil: {estado}</h4>               
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }

  return (
    isAuthenticated && (
      <div className="container">
        <div className="row">
          <div className="col s9">
            <div className="card">
              <div className="card-content">
                <img src={user.picture} alt={user.name} />
                <h2>Bienvenido {user.name}</h2>
                <h4>Email: {(correo = user.email)}</h4>
                <LogoutButton />
                <h4>Perfil: {estado}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
