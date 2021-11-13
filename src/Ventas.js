import React, { Component } from "react";
import { correo } from "./Profile";
import ReactDOM from "react-dom";
import { estado2 } from "./Profile";
import Admin from "./Admin";
import Vendedor from "./Vendedor";

class Ventas extends Component {
  constructor() {
    super();
    this.state = {
      nombreCliente: "",
      cedulaCliente: "",
      nombreVendedor: "",
      estadoVenta: "",
      fechaVenta: "",
      valorVenta: "",
      descripcionVenta: "",
      updateTo: correo,
      ventas: [],
      _id: "",
      ventasBackup: "",
      textBuscar: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addVenta = this.addVenta.bind(this);
  }

  addVenta(e) {
    if (this.state._id) {
      fetch("https://sprint6backend.herokuapp.com/ventas/" + this.state._id, {
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

          this.setState({
            nombreCliente: "",
            cedulaCliente: "",
            nombreVendedor: "",
            estadoVenta: "",
            fechaVenta: "",
            valorVenta: "",
            descripcionVenta: "",
          });
          this.obtenerVentas();
        });
    }
    e.preventDefault();
  }

  componentDidMount() {
    this.obtenerVentas();
  }

  obtenerVentas() {
    fetch("https://sprint6backend.herokuapp.com/ventas")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ ventas: data, ventasBackup: data });
      });
  }

  editVenta(id) {
    fetch("https://sprint6backend.herokuapp.com/ventas/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          nombreCliente: data.nombreCliente,
          cedulaCliente: data.cedulaCliente,
          nombreVendedor: data.nombreVendedor,
          estadoVenta: data.estadoVenta,
          _id: data._id,
          fechaVenta: data.fechaVenta,
          valorVenta: data.valorVenta,
          descripcionVenta: data.descripcionVenta
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
    const data = this.state.ventasBackup;
    const newData = data.filter(function (item) {
      const itemData1 = item.nombreCliente.toUpperCase();
      const itemData2 = item.cedulaCliente.toUpperCase();
      const itemData3 = item.nombreVendedor.toUpperCase();
      const itemData4 = item.estadoVenta.toUpperCase();
      const itemData =
        itemData1 + "" + itemData2 + "" + itemData3 + "" + itemData4;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      ventas: newData,
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
              <h4>ACTUALIZAR VENTAS</h4>
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
                  <form onSubmit={this.addVenta}>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          value={this.state.nombreCliente}
                          name="nombreCliente"
                          onChange={this.handleChange}
                          placeholder="nombre del cliente"
                          className="materialize-textarea"
                        ></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          value={this.state.cedulaCliente}
                          name="cedulaCliente"
                          onChange={this.handleChange}
                          type="number"
                          placeholder="cedula del cliente"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          value={this.state.nombreVendedor}
                          name="nombreVendedor"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="vendedor"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          value={this.state.estadoVenta}
                          name="estadoVenta"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Cancelada o Entregada"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn green darken-3">
                      Actualizar Venta
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <input
                placeholder="Buscar venta"
                class="form-control"
                value={this.state.text}
                onChange={(text) => this.filter(text)}
              />
              <table>
                <thead>
                  <th>cliente</th>
                  <th>cedula</th>
                  <th>vendedor</th>
                  <th>estado venta</th>
                  <th>valor</th>
                  <th>actualizado por:</th>
                </thead>
                <tbody>
                  {this.state.ventas.map((ventas) => {
                    return (
                      <tr key={ventas._id}>
                        <td>{ventas.nombreCliente}</td>
                        <td>{ventas.cedulaCliente}</td>
                        <td>{ventas.nombreVendedor}</td>
                        <td>{ventas.estadoVenta}</td>
                        <td>{ventas.valorVenta}</td>
                        <td>{ventas.updateTo}</td>
                        <td>
                          <button
                            className="btn yellow darken-3"
                            onClick={() => this.editVenta(ventas._id)}
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

export default Ventas;
