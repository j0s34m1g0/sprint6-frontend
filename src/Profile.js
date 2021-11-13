import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ReactDOM from "react-dom";
import Admin from "./Admin";
import Vendedor from "./Vendedor";
import { LogoutButton } from "./Logout";

let usuarios;
let correo;
let estado2;

export { correo };
export { estado2 };

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
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
          }
        }
      });
  }, []);

  const adminn = () => {
    return ReactDOM.render(<Admin />, document.getElementById("root"));
  };

  const vendedor = () => {
    return ReactDOM.render(<Vendedor />, document.getElementById("root"));
  };

  if (estado === "admin") {
    estado2 = "admin";
    return (
      isAuthenticated && (
        <div className="container">
          <div className="row">
            <div className="col s11">
              <div className="card">
                <div className="card-content">
                  <img src={user.picture} alt={user.name} />
                  <h2>{user.name}</h2>
                  <h4>Email: {(correo = user.email)}</h4>
                  <h4>Perfil: Administrador</h4>
                  <div>
                    <table>
                      <thead>
                        <th>
                          <button
                            class="waves-effect deep-purple darken-1 btn"
                            onClick={() => adminn()}
                          >
                            Modulos Admin
                          </button>
                        </th>
                        <LogoutButton />
                        <th></th>
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
  } else if (estado === "vendedor") {
    estado2 = "vendedor";
    return (
      isAuthenticated && (
        <div className="container">
          <div className="row">
            <div className="col s9">
              <div className="card">
                <div className="card-content">
                  <img src={user.picture} alt={user.name} />
                  <h2>{user.name}</h2>
                  <h4>Email: {(correo = user.email)}</h4>
                  <h4>Perfil: {estado}</h4>
                  <div>
                    <table>
                      <thead>
                        <th>
                          <button
                            class="waves-effect deep-purple darken-1 btn"
                            onClick={() => vendedor()}
                          >
                            Modulos Vendedor
                          </button>
                        </th>
                        <LogoutButton />
                        <th></th>
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
  } else {
    return (
      isAuthenticated && (
        <div className="container">
          <div className="row">
            <div className="col s9">
              <div className="card">
                <div className="card-content">
                  <img src={user.picture} alt={user.name} />
                  <h2>{user.name}</h2>
                  <h4>Email: {(correo = user.email)}</h4>
                  <h4>
                    Perfil: Pendiente por definir, comuniquese con el área
                    encargada
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
};

export default Profile;
