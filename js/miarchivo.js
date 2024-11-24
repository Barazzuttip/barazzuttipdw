//declaracion de constantes, variables, clases y funciones
const precioDiseno = 50;
const precioLP = 140;
const precioSWI = 200;
const precioEcomm = 300;
const mantenimiento = 20;

//getElementbyID
const btnInfo = document.getElementById("btn-info");
const btnLP = document.getElementById("btn-lp");
const btnSWI = document.getElementById("btn-swi");
const btnEcomm = document.getElementById("btn-ecomm");
const btnCoutas = document.getElementById("btn-cuotas");
const btnPers = document.getElementById("btn-pers");
const btnCarr = document.getElementById("btn-verCarr");
const divSvc = document.getElementById("svc-display-div");
//const svcCard = document.getElementById("svc-card");
//const svcList = document.getElementById("svc-list");

let carrito = [];
let servicios = [];
localStorage.setItem("servicios", JSON.stringify(servicios));
localStorage.setItem("carrito", JSON.stringify(carrito));
let quiereCuotas;
let precioAcumulado = 0;

class Servicio {
    constructor(nom, id, cantPag, hayManten, precio) {
        this.Nombre = nom;
        this.id = id;
        this.Paginas = cantPag;
        this.Mantenimiento = hayManten;
        this.Precio = precio;
    }
}
const agregarServicio = (nom, id, cantPag, hayManten, precio) => {
    const aux = JSON.parse(localStorage.getItem("servicios"));
    //me aseguro que siempre se guarde en el local un array con los 3 servicios basicos mas el que guarda el usuario.
    if (aux.length > 3)
        aux.pop();
    aux.push(new Servicio(nom, id, cantPag, hayManten, precio));
    localStorage.setItem("servicios", JSON.stringify(aux));
}

agregarServicio('Landing Page', 1, 1, true, precioLP);
agregarServicio('Sitio Web Institucional', 2, 5, true, precioSWI);
agregarServicio('E-commerce', 3, 9, true, precioEcomm);

//cargo los servicios al localStorage


//funcion para ver las propiedades de un servicio

function verPropiedades(tit) {
    // Vaciar el container de las cards
    divSvc.innerHTML = "";

    // Título
    const titleInfo = document.createElement("h2");
    titleInfo.innerHTML = tit;
    titleInfo.className = "h2-main";
    divSvc.append(titleInfo);

    // Fetch para obtener los productos desde JSON
    fetch("../js/productos.json")
        // .then((res) => res.json())
        .then((res) => {
            if (!res.ok) {
                console.log('errorrrr');
            }
            return res.json();
        })
        .then((data) => {
            data.forEach(producto => {
                // Crear una tarjeta para cada producto
                const svcCard = document.createElement("div");
                svcCard.className = "svc-cardstyle animate__animated animate__zoomIn";
                svcCard.id = `svc-card-${producto.id}`;

                const svcItem = document.createElement("ul");

                // Recorrer las propiedades del producto
                for (const propiedad in producto) {
                    const prop = document.createElement("li");
                    if (typeof (producto[propiedad]) === "boolean") {
                        producto[propiedad] ?
                            prop.textContent = propiedad + ` : Sí` :
                            prop.textContent = propiedad + ` : No`;
                    } else {
                        prop.textContent = propiedad + ` : ${producto[propiedad]}`;
                    }
                    // Agregar clase a los elementos <li>
                    prop.className = "just-text";
                    svcItem.append(prop);
                }

                // Agregar botón de eliminar si corresponde
                if (producto.cantidad) {
                    console.log("ok");
                    const btnEliminarProd = document.createElement("button");
                    btnEliminarProd.textContent = "Eliminar del carrito";
                    btnEliminarProd.className = "btn-card";
                    btnEliminarProd.addEventListener("click", () => eliminarDelCarrito(producto.id));
                    svcCard.append(btnEliminarProd);
                }else {
                    console.log("ouch");
                }

                // Agregar los elementos al contenedor de la tarjeta
                svcCard.append(svcItem);
                divSvc.append(svcCard); // Agregar cada tarjeta al contenedor principal
            });
        })
}

// Evento para mostrar las propiedades al hacer clic en el botón
btnInfo.addEventListener('click', () => verPropiedades("Tipos de páginas"));



//para ver cada card


const verCard = (n) => {
    divSvc.innerHTML = "";

    const svc = JSON.parse(localStorage.getItem("servicios"));
    selectedSVC = svc[n - 1];

    const card = document.createElement("div");
    card.className = "svc-cardstyle animate__animated animate__zoomIn svc-preset";

    const titulo = document.createElement("h2");
    titulo.className = "h2-main";

    titulo.innerHTML = `${selectedSVC.Nombre}`;
    let idaux;
    const datos = document.createElement("ul");
    for (const propiedad in selectedSVC) {
        if (propiedad != `Nombre`) {
            const prop = document.createElement("li");
            prop.className = "just-text"
            if (typeof selectedSVC[propiedad] !== "boolean") {
                prop.textContent = propiedad + `: ${selectedSVC[propiedad]}`;
            } else {
                if (selectedSVC[propiedad] == true) {
                    prop.textContent = propiedad + `: Si`;
                }
                else {
                    prop.textContent = propiedad + `: No`;
                }
            }
            if (propiedad == 'id')
                idaux = selectedSVC[propiedad];
            datos.append(prop);
        }
    }

    const carritoLocal = JSON.parse(localStorage.getItem("carrito"));
    const btn = document.createElement("button");
    btn.textContent = "Agregar al carrito"
    btn.className = "btn-card";
    btn.addEventListener("click", () => agregarACarrito(idaux));

    const btnElim = document.createElement("button");
    btnElim.textContent = "Vaciar carrito"
    btnElim.className = "btn-card";
    btnElim.addEventListener("click", () => vaciarCarrito());


    card.append(btn);
    card.append(btnElim);
    divSvc.append(titulo);
    card.append(datos);
    divSvc.append(card);
}

//botones de ver card
btnLP.addEventListener("click", () => verCard(1));
btnSWI.addEventListener("click", () => verCard(2));
btnEcomm.addEventListener("click", () => verCard(3));



// const nuevoServicio = () => {
//     //las preguntas se reemplazan por divs con formularios o checkbox para que el usuario elija su servicio personalizado
//     divSvc.innerHTML = "";

//     //primer pregunta

//     const formulario = document.createElement("form");
//     formulario.className = "svc-formstyle animate__animated animate__flipInX"
//     //pregunta 1
//     const preg1 = document.createElement("label");

//     preg1.innerHTML = "Qué estilo de página necesitás?";
//     preg1.className = "just-text";


//     //select 1

//     const sel1 = document.createElement("select");
//     //sel1.className = "form-select"
//     //opciones 
//     const opcion1 = document.createElement("option");
//     const opcion2 = document.createElement("option");
//     const opcion3 = document.createElement("option");

//     opcion1.textContent = "Landing Page (1 página)";
//     opcion2.textContent = "Sitio Web Institucional (5 páginas)";
//     opcion3.textContent = "E-commerce (9 páginas)";

//     opcion1.className = "just-text2";
//     opcion2.className = "just-text2";
//     opcion3.className = "just-text2";

//     opcion1.value = "1";
//     opcion2.value = "5";
//     opcion3.value = "9";

//     //pregunta 2
//     const preg2 = document.createElement("label");

//     preg2.innerHTML = "Necesitás mantenimiento?";
//     preg2.className = "just-text";

//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";

//     //pregunta 3

//     const preg3 = document.createElement("label");

//     preg3.innerHTML = "Vas a optar por uno de mis mockups? (podes verlos en la seccion Barazzutti)";
//     preg3.className = "just-text";

//     const checkbox2 = document.createElement("input");
//     checkbox2.type = "checkbox";

//     //boton submit
//     const submitBtn = document.createElement("button");

//     submitBtn.type = "submit";
//     submitBtn.className = "main-btn";
//     submitBtn.textContent = "Enviar"


//     sel1.append(opcion1, opcion2, opcion3);



//     formulario.append(preg1);
//     formulario.append(sel1);
//     formulario.append(preg2);
//     formulario.append(checkbox);
//     formulario.append(preg3);
//     formulario.append(checkbox2);
//     formulario.append(submitBtn);



//     divSvc.append(formulario);

//     formulario.addEventListener("submit", (e) => {
//         e.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

//         const pags = parseInt(sel1.value); // Obtener el valor seleccionado en el select
//         const mant = checkbox.checked;
//         pags == 1 ? valor = precioLP : pags == 5 ? valor = precioSWI : valor = precioEcomm;
//         const mockupSelected = checkbox2.checked;
//         if (mockupSelected)
//             valor -= 20;
//         if (!mant)
//             valor += 10;
//         agregarServicio('Tu sitio personalizado', 4, pags, mant, valor);
//         //alert(`Tu servicio personalizado costara un total de ` + valor + ` USD. Podés consultar por las cuotas en la sección correspondiente`);
//         verCard(4);
//     });


// }


// btnPers.addEventListener("click", () => nuevoServicio());



//const cuotas

const valorCuotas = (total, cant) => {
    let interes;
    switch (cant) {
        case 2:
            interes = 2 / 100;
            break
        case 3:
            interes = 4 / 100;
            break
        case 6:
            interes = 8 / 100;
            break
        default:
            alert('No disponible, actualizá la página y comenzá de nuevo');
            break
    }
    let aux = total * interes;
    let totalCuotas = total + aux;
    let cuota = totalCuotas / cant;
    return cuota;
}

const calcularCuotas = () => {
    divSvc.innerHTML = "";

    //html dinamico, creo el form, label, select, options, submit
    const formulario = document.createElement("form");
    const preg = document.createElement("label");
    formulario.className = "svc-formstyle animate__animated animate__flipInY"

    preg.innerHTML = "Cantidad de cuotas:";
    preg.className = "just-text";

    const select = document.createElement("select");

    const opcion1 = document.createElement("option");
    const opcion2 = document.createElement("option");
    const opcion3 = document.createElement("option");

    opcion1.textContent = "2";
    opcion2.textContent = "3";
    opcion3.textContent = "6";

    opcion1.className = "just-text2";
    opcion2.className = "just-text2";
    opcion3.className = "just-text2";

    opcion1.value = "2";
    opcion2.value = "3";
    opcion3.value = "6";



    const preg2 = document.createElement("label");

    preg2.innerHTML = "Tipo de pag:";
    preg2.className = "just-text";

    const select2 = document.createElement("select");

    //opciones 
    const opcion4 = document.createElement("option");
    const opcion5 = document.createElement("option");
    const opcion6 = document.createElement("option");
    const opcion7 = document.createElement("option");

    opcion4.textContent = "Landing Page (1 página)";
    opcion5.textContent = "Sitio Web Institucional (5 páginas)";
    opcion6.textContent = "E-commerce (9 páginas)";
    opcion7.textContent = "Tu sitio personalizado"; //tengo que checkear si el usuario armo su sitio


    opcion4.className = "just-text2";
    opcion5.className = "just-text2";
    opcion6.className = "just-text2";
    opcion7.className = "just-text2";

    opcion4.value = "0";
    opcion5.value = "1";
    opcion6.value = "2";
    opcion7.value = "3";


    const submitBtn = document.createElement("button");

    submitBtn.type = "submit";
    submitBtn.className = "main-btn"
    submitBtn.textContent = "Enviar"

    select.append(opcion1);
    select.append(opcion2);
    select.append(opcion3);

    select2.append(opcion4);
    select2.append(opcion5);
    select2.append(opcion6);
    select2.append(opcion7);

    formulario.append(preg);
    formulario.append(select);
    formulario.append(preg2);
    formulario.append(select2);
    formulario.append(submitBtn);

    divSvc.append(formulario);

    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

        const cant = parseInt(select.value);
        const aux2 = parseInt(select2.value);
        const serv = JSON.parse(localStorage.getItem("servicios"));
        const total = serv[aux2].Precio;
        const totalCuota = valorCuotas(total, cant);
        alert(`Cada cuota sera de: ` + totalCuota + `USD`);
    });
}
btnCoutas.addEventListener("click", () => calcularCuotas())


//Manejo del carrito
const prodAgregado = () => {

    Swal.fire({
        // title: '¡Éxito!',
        text: 'Producto agregado satisfactoriamente.',
        icon: 'success'
    });
}
const agregarACarrito = (id) => {
    // Obtener el carrito del localStorage o inicializarlo si no existe
    let carritoLocal = JSON.parse(localStorage.getItem("carrito"));

    // Verificar si el producto ya está en el carrito
    const existeEnCarrito = carritoLocal.find((itemC) => itemC.id === id);

    // Obtener los productos desde el JSON
    fetch("../js/productos.json")
        .then((res) => {
            if (!res.ok) {
                console.log("Error cargando los productos");
                throw new Error("No se pudo cargar el archivo JSON");
            }
            return res.json();
        })
        .then((data) => {
            // Encontrar el producto seleccionado
            const itemElegido = data.find((item) => item.id === id);

            // Si el producto ya está en el carrito, incrementar la cantidad
            if (existeEnCarrito) {
                carritoLocal = carritoLocal.map((itemMap) =>
                    itemMap.id === itemElegido.id
                        ? { ...itemMap, cantidad: itemMap.cantidad + 1 }
                        : itemMap
                );
            } else {
                // Si no está en el carrito, agregarlo con cantidad 1
                carritoLocal.push({ ...itemElegido, cantidad: 1 });
            }

            // Actualizar el localStorage y llamar a prodAgregado
            localStorage.setItem("carrito", JSON.stringify(carritoLocal));
            prodAgregado();
        })
        .catch((error) => console.error("Error al agregar al carrito:", error));
};

const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    const nuevoCarrito = [];
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
}
const eliminarDelCarrito = (id) => {
    let carritoLocal = JSON.parse(localStorage.getItem("carrito"));
    const prodElim = carritoLocal.findIndex((item) => item.id === id);
    if (prodElim != -1) {
        carritoLocal.splice(prodElim, 1);
    }
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carritoLocal));
    verPropiedadesCarrito("Mi Carrito", carritoLocal);
}


const cargarCarrito = () => {
    return new Promise((resolve, reject) => {
        const carrito = JSON.parse(localStorage.getItem("carrito"));

        if (carrito) {
            resolve(carrito); // Si todo va bien, devolvemos el carrito
        } else {
            reject("No se encontraron productos en el carrito"); // Si no hay productos, se rechaza
        }
    });
}


function verPropiedadesCarrito(tit, array) {
    //extraigo del localStorage el array de Servicios
    const svc = array;

    //vacio el container de las cards
    divSvc.innerHTML = "";

    //genero el div, le agrego clase e id
    const svcCard = document.createElement("div");
    svcCard.className = "svc-cardstyle animate__animated animate__zoomIn";
    svcCard.id = "svc-card";

    //titulo
    titleInfo = document.createElement("h2");
    titleInfo.innerHTML = tit;
    titleInfo.className = "h2-main";

    divSvc.append(titleInfo);
    divSvc.append(svcCard);
    //se verifica el tipo de dato para que en los valores booleanos no devuelva 'true' o 'false' como texto.
    for (i = 0; i < svc.length; i++) {
        const svcItem = document.createElement("ul");
        let idaux = svc[i].id
        //un for para recorrer cada propiedad de los objetos, dentro de un for para recorrer el array de objetos
        for (const propiedad in svc[i]) {
            const prop = document.createElement("li");
            if (typeof (svc[i][propiedad]) !== "boolean") {
                // si no es boolean, muestra propiedad y nombre
                prop.textContent = propiedad + ` : ${svc[i][propiedad]}`;
            }
            else if (typeof (svc[i][propiedad]) == "boolean") {
                svc[i][propiedad] == true ? (
                    //    caso boolean verdadero
                    prop.textContent = propiedad + ` : Si`
                ) :
                (    //caso boolean falso
                    prop.textContent = propiedad + ` : No`
                );  
            }
            //agrego clase a los li
            prop.className = "just-text";
            svcItem.append(prop);

        }
        if (svc[i].cantidad) {
            const btnEliminarProd = document.createElement("button");
            btnEliminarProd.textContent = "Eliminar del carrito";
            btnEliminarProd.className = "btn-card";
      btnEliminarProd.addEventListener("click", () =>
        eliminarDelCarrito(idaux),
      );
      svcCard.append(btnEliminarProd);
    }
    svcCard.append(svcItem);
  }
}


btnCarr.addEventListener("click", () => {
    cargarCarrito()
        .then(() => {
            verPropiedadesCarrito("Mi Carrito", JSON.parse(localStorage.getItem("carrito")));
        })
        .catch(error => {
            console.error("Carrito vacío", error);
        })
});

