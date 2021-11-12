import React from "react";
import {correo} from "./Profile";

let carrito = [];
let subtot;
let ventas;
let fecha = new Date();

const RealizarVenta = () => {
  const [productos, setProductos] = React.useState([]);
  const [productosCarrito, setProductosCarrito] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    fetch("https://sprint6backend.herokuapp.com/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        console.log(correo);
      });
  }, []);

  const addProductoCart = (id) => {
    let cant = prompt("Cantidad");
    if (cant === null || cant === "" || cant === "0") {
      alert("Ingrese la cantidad en numeros");
    } else {
      for (let i in productos) {
        for (let j in productos[i]) {
          if (productos[i][j] === id) {
            subtot = Number(cant) * productos[i].precio;
            if (isNaN(subtot)) {
              alert("Ingrese la cantidad en numeros");
            } else {
              carrito.push({
                _id: productos[i]._id,
                nombre: productos[i].descripcion,
                precio: productos[i].precio,
                cantidad: Number(cant),
                subtotal: subtot,
              });
              setProductosCarrito(carrito);
              setTotal(total + subtot);
              break;
            }
          }
        }
      }
    }
  };

  const delProductoCarrito = (id) => {
    console.log(id);
    if (productosCarrito.length === 1) {
      let sub = productosCarrito[0].subtotal;
      carrito.splice(0, 1);
      setTotal(total - sub);
    } else if (productosCarrito.length > 1) {
      for (let i in productosCarrito) {
        for (let j in productosCarrito[i]) {
          if (productosCarrito[i][j] === id) {
            let sub = productosCarrito[i].subtotal;
            carrito.splice(i, 1);
            setTotal(total - sub);
            break;
          }
        }
      }
    }
  };

  const addVenta = () => {
    let nombre = prompt("Nombre del cliente");
    if (nombre === null || nombre === "") {
      alert("Ingrese un nombre valido");
    }
    let cedula = prompt("Cedula del client");
    if (cedula === null || cedula === "") {
      alert("Ingrese una cedula valida");
    }
    ventas = {
      nombreCliente: nombre, 
      cedulaCliente: cedula,
      nombreVendedor: correo, 
      estadoVenta: "En proceso", 
      fechaVenta: fecha, 
      valorVenta: total,
      descripcionVenta: carrito
    };
    fetch("https://sprint6backend.herokuapp.com/ventas", {
      method: "POST",
      body: JSON.stringify(ventas),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        carrito = [];
        subtot = 0;
        ventas = [];
        setProductosCarrito([]);
        setTotal(0);
        alert('La venta se ha realizado exitosamente');
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>
        <nav class="light-green darken-1">
          <h3>REALIZAR VENTA</h3>
        </nav>
        <div class="red" className="row">
          <a href="/">
            <h3>Atrás</h3>
          </a>
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col s5">
            <div className="card">
              <div className="card-content">
                <td>
                  <button
                    className="btn green darken-3"
                    onClick={() => addVenta()}
                  >
                    REALIZAR VENTA
                  </button>
                </td>
                <hr />
                <h5>TOTAL</h5>
                <hr />
                <h4>{total}</h4>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </thead>
                <tbody>
                  {productosCarrito.map((productosCarrito) => {
                    return (
                      <tr key={productosCarrito._id}>
                        <td>{productosCarrito.nombre}</td>
                        <td>{productosCarrito.precio}</td>
                        <td>{productosCarrito.cantidad}</td>
                        <td>{productosCarrito.subtotal}</td>
                        <td>
                          <button
                            className="btn red"
                            onClick={() =>
                              delProductoCarrito(productosCarrito._id)
                            }
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <></>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col s7">
            <table>
              <thead>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Estado</th>
              </thead>
              <tbody>
                {productos.map((productos) => {
                  return (
                    <tr key={productos._id}>
                      <td>{productos.descripcion}</td>
                      <td>{productos.precio}</td>
                      <td>{productos.estado}</td>
                      <td>
                        <button
                          className="btn blue"
                          onClick={() => addProductoCart(productos._id)}
                        >
                          <i className="material-icons">shopping_cart</i>
                        </button>
                        <></>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RealizarVenta;
