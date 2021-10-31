import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./Logout";

let usuarios;
let correo;

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const[estado, setEstado] = React.useState();

  React.useEffect(() => {
    fetch("https://sprint6backend.herokuapp.com/usuarios")
      .then((res) => res.json())
      .then((data) => {
        usuarios = data;
        for (let i=0;i<usuarios.length;i++) {
          if (usuarios[i].correo === correo){
            console.log(usuarios[i].correo, usuarios[i].cargo);
            setEstado(usuarios[i].cargo);
          }
        }
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
                <h4>Email: {correo = user.email}</h4>
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