import React, { Component } from "react";

class Productos extends Component {
  constructor() {
    super();
    this.state = {
      descripcion: "",
      precio: "",
      estado: "",
      productos: [],
      _id: "",
      productoBackup: "",
      textBuscar: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addProducto = this.addProducto.bind(this);
  }

  addProducto(e) {
    if (this.state._id) {
      fetch(
        "https://sprint6backend.herokuapp.com/productos/" + this.state._id,
        {
          method: "PUT",
          body: JSON.stringify(this.state),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          this.setState({ nombre: "", descripcion: "", precio: "" });
          this.obtenerProductos();
        });
    } else {
      fetch("https://sprint6backend.herokuapp.com/productos", {
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

          this.setState({ estado: "", descripcion: "", precio: "" });
          this.obtenerProductos();
        })
        .catch((err) => console.error(err));
    }
    e.preventDefault();
  }

  componentDidMount() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    fetch("https://sprint6backend.herokuapp.com/productos")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ productos: data, productoBackup: data });
      });
  }

  deleteProducto(id) {
    fetch("https://sprint6backend.herokuapp.com/productos/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.obtenerProductos();
      });
  }

  editProducto(id) {
    fetch("https://sprint6backend.herokuapp.com/productos/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          descripcion: data.descripcion,
          precio: data.precio,
          estado: data.estado,
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
    const data = this.state.productoBackup;
    const newData = data.filter(function (item) {
      const itemData1 = item.descripcion.toUpperCase();
      const itemData2 = item.estado.toUpperCase();
      const itemData = itemData1 + "" + itemData2;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      productos: newData,
      text: text,
    });
  }

  render() {
    return (
      <div>
        <nav class="light-green darken-1">          
          <h3>PRODUCTOS</h3>
        </nav>
        <div class = "red" className="row">
          <a href="/"> 
          <h3>Atrás</h3>         
          </a>
        </div>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addProducto}>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          value={this.state.descripcion}
                          name="descripcion"
                          onChange={this.handleChange}
                          placeholder="Descripcion del producto"
                          className="materialize-textarea"
                        ></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          value={this.state.precio}
                          name="precio"
                          onChange={this.handleChange}
                          type="number"
                          placeholder="Precio del producto"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          value={this.state.estado}
                          name="estado"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Estado del producto"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn green darken-3">
                      Registrar Producto
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <input
                placeholder="Buscar producto por nombre"
                class="form-control"
                value={this.state.text}
                onChange={(text) => this.filter(text)}
              />
              <table>
                <thead>
                  <th>Descripcion producto</th>
                  <th>Precio producto</th>
                  <th>Estado producto</th>
                </thead>
                <tbody>
                  {this.state.productos.map((productos) => {
                    return (
                      <tr key={productos._id}>
                        <td>{productos.descripcion}</td>
                        <td>{productos.precio}</td>
                        <td>{productos.estado}</td>
                        <td>
                          <button
                            className="btn red"
                            onClick={() => this.deleteProducto(productos._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <></>
                          <button
                            className="btn yellow darken-3"
                            onClick={() => this.editProducto(productos._id)}
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

export default Productos;
