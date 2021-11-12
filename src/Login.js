import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col s9">
            <div className="card">
              <div className="card-content" background-image= "../images/">
                <h3>SOFTDANA</h3>
                <hr/>
                <button
                  class="waves-effect waves-light btn"
                  onClick={() => loginWithPopup()}
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};