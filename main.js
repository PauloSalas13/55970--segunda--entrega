// Menú del restaurante
//aplicando arreglo donde almacenamos productos


//por eso lo hice asi
const menu = {
    "1": { nombre: "PERLAS DE MAR", precio: 25000 },
    "2": { nombre: "CROSTINIS DE JAMÓN IBÉRICO", precio: 26000 },
    "3": { nombre: "BRAVAS DE LUJO", precio: 30000 },
    "4": { nombre: "ENSALADA DE PULPO A LA GALLEGA", precio: 40000 },
    "5": { nombre: "CARPACCIO DE ATÚN ROJO", precio: 20000 }
};


let pedido = [];



    // Agrega el evento click al botón
    document.getElementById('btnAgregarPlato').addEventListener("click", agregarPlato);

    document.getElementById('btnLimpiarPedido').addEventListener("click", limpiarPedido);

    document.getElementById('btnMostrarPedido').addEventListener("click", mostrarPedido);

    document.getElementById('btnQuitarPlato').addEventListener("click", quitarPlato);

    // Cargar platos en el combo box
    cargarPlatosEnComboBox();
    cargarCantidadesEnComboBox();


function cargarPlatosEnComboBox() {
    const platoSelect = document.getElementById('platoSelect');

    for (const key in menu) {
        const option = document.createElement('option');
        option.value = key;
        option.text = `${menu[key].nombre} - $${menu[key].precio}`;
        platoSelect.add(option);
    }
}

function cargarCantidadesEnComboBox() {
    const cantidadSelect = document.getElementById('cantidadSelect');

    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        cantidadSelect.add(option);
    }
}

function quitarPlato() {
    const platoSelect = document.getElementById('platoSelect');
    const cantidadSelect = document.getElementById('cantidadSelect');

    // Obtén el índice seleccionado
    const selectedIndex = platoSelect.selectedIndex;
   
    const opcion = platoSelect.value;

    // Verifica si se ha seleccionado un índice válido
    if (selectedIndex !== -1) {

        console.log("existe el elemento vamos a borrar");

        // Obtiene el nombre del plato desde el arreglo de opciones usando el índice
        const nombrePlatoQuitar = platoSelect.options[selectedIndex].text;
        const cantidadPlatoQuitar = parseInt(cantidadSelect.value);

        if (!isNaN(cantidadPlatoQuitar) && cantidadPlatoQuitar > 0) {
            // Verifica si el plato está en el pedido
            const index = pedido.findIndex(item => item.opcion === opcion);

            if (index !== -1) {
                // Si el plato está en el pedido, reduce la cantidad o elimina el elemento si es necesario
                if (pedido[index].cantidad > cantidadPlatoQuitar) {
                    pedido[index].cantidad -= cantidadPlatoQuitar;
                } else {
                    pedido.splice(index, 1); // Elimina el elemento del pedido si la cantidad a quitar es igual o mayor
                    limpiarPedido();
                }

                // Actualiza la tabla y el resumen del pedido
                actualizarTablaPedido();
                actualizarResumenPedido();
            } else {
                alert("El plato especificado no se encuentra en el pedido.");
            }
        } else {
            alert("Cantidad no válida. Por favor, elige una cantidad entre 1 y 10.");
        }
    } else {
        alert("Por favor, selecciona un plato.");
    }
}

// Función para agregar un plato al pedido
function agregarPlato() {
    const platoSelect = document.getElementById('platoSelect');
    const cantidadSelect = document.getElementById('cantidadSelect');
    const opcion = platoSelect.value;
    const cantidad = parseInt(cantidadSelect.value);

    if (!isNaN(cantidad) && cantidad > 0) {
        // Verifica si el plato ya está en el pedido
        const platoExistente = pedido.find(item => item.opcion === opcion);

        if (platoExistente) {
            // Si existe, aumenta la cantidad
            platoExistente.cantidad += cantidad;
        } else {
            // Si no existe, agrega un nuevo elemento al pedido
            pedido.push({ opcion, cantidad });
        }

    // Guardar el pedido en localStorage
    localStorage.setItem('pedido', JSON.stringify(pedido));

        // Actualiza la tabla y el resumen del pedido
        actualizarTablaPedido();
        actualizarResumenPedido();

    } else {
        alert("Cantidad no válida. Por favor, elige una cantidad entre 1 y 10.");
    }
}

// Función para cargar el pedido desde localStorage
function cargarPedidoDesdeLocalStorage() {
    const pedidoGuardado = localStorage.getItem('pedido');
    if (pedidoGuardado) {
        pedido = JSON.parse(pedidoGuardado);
        actualizarTablaPedido();
        actualizarResumenPedido();
    }
}

// En la inicialización de la página, cargar el pedido desde localStorage
window.onload = function() {
    cargarPedidoDesdeLocalStorage();
};

// Función para agregar un plato al arreglo de pedido
function agregarAlPedido(opcion, cantidad) {
    const cuerpoTablaPedido = document.getElementById('cuerpoTablaPedido');
    const resumenPedido = document.getElementById('resumenPedido');

    const fila = document.createElement('tr');

    const nombrePlato = menu[opcion].nombre;
    const precioUnitario = menu[opcion].precio;
    const total = precioUnitario * cantidad;

    const celdaPlato = document.createElement('td');
    celdaPlato.textContent = nombrePlato;
    fila.appendChild(celdaPlato);

    const celdaPrecioUnitario = document.createElement('td');
    celdaPrecioUnitario.textContent = `$${precioUnitario}`;
    fila.appendChild(celdaPrecioUnitario);

    const celdaCantidad = document.createElement('td');
    celdaCantidad.textContent = cantidad;
    fila.appendChild(celdaCantidad);

    const celdaTotal = document.createElement('td');
    celdaTotal.textContent = `$${total}`;
    fila.appendChild(celdaTotal);

    cuerpoTablaPedido.appendChild(fila);

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${cantidad}x</span>${nombrePlato} - $${total}`;
    resumenPedido.appendChild(listItem);

}

function actualizarTablaPedido() {
    const cuerpoTablaPedido = document.getElementById('cuerpoTablaPedido');
    cuerpoTablaPedido.innerHTML = ""; // Limpia la tabla antes de actualizar

        pedido.forEach(item => {
        const fila = document.createElement('tr');

        const nombrePlato = menu[item.opcion].nombre;
        const precioUnitario = menu[item.opcion].precio;
        const total = precioUnitario * item.cantidad;

        const celdaPlato = document.createElement('td');
        celdaPlato.textContent = nombrePlato;
        fila.appendChild(celdaPlato);

        const celdaPrecioUnitario = document.createElement('td');
        celdaPrecioUnitario.textContent = `$${precioUnitario}`;
        fila.appendChild(celdaPrecioUnitario);

        const celdaCantidad = document.createElement('td');
        celdaCantidad.textContent = item.cantidad;
        fila.appendChild(celdaCantidad);

        const celdaTotal = document.createElement('td');
        celdaTotal.textContent = `$${total}`;
        fila.appendChild(celdaTotal);

        cuerpoTablaPedido.appendChild(fila);

         });

}


function actualizarResumenPedido() {
    const resumenPedido = document.getElementById('resumenPedido');
    resumenPedido.innerHTML = ""; // Limpia el resumen antes de actualizar

        pedido.forEach(item => {

        const nombrePlato = menu[item.opcion].nombre;
        const precioUnitario = menu[item.opcion].precio;
        const total = precioUnitario * item.cantidad;

        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${item.cantidad}x</span>${nombrePlato} - $${total}`;
        resumenPedido.appendChild(listItem);
        });

}


// Función para limpiar el pedido
function limpiarPedido() {
    const cuerpoTablaPedido = document.getElementById('cuerpoTablaPedido');

    // Limpia la tabla y oculta nuevamente
    cuerpoTablaPedido.innerHTML = "";
    document.getElementById('tablaPedido').style.display = 'none';

    // Recarga la página para volver al estado inicial
    window.location.reload();

}

// Función para mostrar el pedido
function mostrarPedido() {
    const tablaPedido = document.getElementById('tablaPedido');

    // Cambia la propiedad de visualización a 'table' (muestra la tabla)
    tablaPedido.style.display = 'table';

    // Aquí puedes realizar acciones adicionales si es necesario
    alert("Pedido listo. ¡Gracias por tu pedido! Te esperamos pronto.");
}

