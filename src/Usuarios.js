import React, { Component } from "react";
import { correo } from "./Profile";
import ReactDOM from "react-dom";
import { estado2 } from "./Profile";
import Admin from "./Admin";
import Vendedor from "./Vendedor";

class Usuarios extends Component {
  constructor() {
    super();
    this.state = {
      correo: "",
      nombre: "",
      cargo: "",
      addTo: correo,
      usuarios: [],
      _id: "",
      usuariosBackup: "",
      textBuscar: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addUsuario = this.addUsuario.bind(this);
  }

  addUsuario(e) {
    if (this.state._id) {
      fetch("https://sprint6backend.herokuapp.com/usuarios/" + this.state._id, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setState({ correo: "", nombre: "", cargo: "" });
          this.obtenerUsuarios();
        });
    } else {
      fetch("https://sprint6backend.herokuapp.com/usuarios", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setState({ correo: "", nombre: "", cargo: "" });
          this.obtenerUsuarios();
        })
        .catch((err) => console.error(err));
    }
    e.preventDefault();
  }

  componentDidMount() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    fetch("https://sprint6backend.herokuapp.com/usuarios")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ usuarios: data, usuariosBackup: data });
      });
  }

  deleteUsuario(id) {
    fetch("https://sprint6backend.herokuapp.com/usuarios/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.obtenerUsuarios();
      });
  }

  editUsuario(id) {
    fetch("https://sprint6backend.herokuapp.com/usuarios/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          correo: data.correo,
          nombre: data.nombre,
          cargo: data.cargo,
          _id: data._id,
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  filter(event) {
    var text = event.target.value;
    const data = this.state.usuariosBackup;
    const newData = data.filter(function (item) {
      const itemData1 = item.nombre.toUpperCase();
      const itemData2 = item.cargo.toUpperCase();
      const itemData = itemData1 + "" + itemData2;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      usuarios: newData,
      text: text,
    });
  }

  atras() {
    if (estado2 === "admin") {
      return ReactDOM.render(<Admin />, document.getElementById("root"));
    } else if (estado2 === "vendedor") {
      return ReactDOM.render(<Vendedor />, document.getElementById("root"));
    }
  }

  render() {
    return (
      <div>
        <nav class="cyan darken-1">
          <table>
            <thead size="large">
              <h4>GESTIONAR USUARIOS</h4>
            </thead>
          </table>
        </nav>
        <nav class="cyan darken-2">
          <table>
            <thead>
              <button
                class="waves-effect  green darken-1 btn"
                onClick={() => this.atras()}
              >
                Atrás
              </button>
            </thead>
          </table>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addUsuario}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          value={this.state.nombre}
                          name="nombre"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Nombre del usuario"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          value={this.state.correo}
                          name="correo"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Correo del usuario"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          value={this.state.cargo}
                          name="cargo"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="admin o vendedor"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn green darken-3">
                      Registrar Usuario
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <input
                placeholder="Buscar usuario por nombre y cargo"
                class="form-control"
                value={this.state.text}
                onChange={(text) => this.filter(text)}
              />
              <table>
                <thead>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Cargo</th>
                  <th>Creado/Editado por:</th>
                </thead>
                <tbody>
                  {this.state.usuarios.map((usuarios) => {
                    return (
                      <tr key={usuarios._id}>
                        <td>{usuarios.nombre}</td>
                        <td>{usuarios.correo}</td>
                        <td>{usuarios.cargo}</td>
                        <td>{usuarios.addTo}</td>
                        <td>
                          <button
                            className="btn red"
                            onClick={() => this.deleteUsuario(usuarios._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <></>
                          <button
                            className="btn yellow darken-3"
                            onClick={() => this.editUsuario(usuarios._id)}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Usuarios;
