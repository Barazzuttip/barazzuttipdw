//declaracion de constantes, variables, clases y funciones
const precioDiseno = 50;
const precioLP = 140;
const precioSWI = 200;
const precioEcomm = 300;
const mantenimiento = 20;


let precioAcumulado = 0;


let servicios = [];
let quiereCuotas;

class Servicio {
    constructor(nom, cantPag, hayManten, hayMockup, precio) {
        this.nombre = nom;
        this.Paginas = cantPag;
        this.Mantenimiento = hayManten;
        this.Mockup = hayMockup;
        this.precio = precio;
    }
}
const agregarServicio = (nom, cantPag, hayManten, hayMockup, precio) => {
    servicios.push(new Servicio(nom, cantPag, hayManten, hayMockup, precio));
}

agregarServicio('Landing Page', 1, true, true, precioLP);
agregarServicio('Sitio Web Institucional', 5, true, true, precioSWI);
agregarServicio('E-commerce', 9, true, true, precioEcomm);

//funcion para ver las propiedades de un servicio

function verPropiedades(i) {
    i = i - 1;
    let mensaje = (`${servicios[i].nombre}: \n`);
    //se verifica el tipo de dato para que en los valores booleanos no devuelva 'true' o 'false' como texto.
    for (const propiedad in servicios[i]) {
        if (typeof (servicios[i][propiedad]) !== "boolean") {
            mensaje += '- ' + propiedad + ': ' + servicios[i][propiedad] + '\n';
        }
        else if (typeof (servicios[i][propiedad]) == "boolean") {
            if (servicios[i][propiedad] == true) {
                mensaje += '- ' + propiedad + ': Si\n';
            }
            else {
                mensaje += '- ' + propiedad + ': No\n';
            }
        }
    }
    alert(mensaje + '(precio en USD)');
}

//funcion si el usuario decide comrpar.
const servicioElegido = (tipoDeServicio) => {
    alert(`usted ha seleccionado ${servicios[tipoDeServicio].nombre}, cuyo valor es de ${servicios[tipoDeServicio].precio} USD\nPara continuar, contactate a barazzuttip@gmail.com o por Whats App al +5492804637812`);
    quiereCuotas = confirm('Desea abonar en cuotas?');
}


//Sección de preguntas, para la opción 4
//la funcion tendra opciones numericas
//si el usuario ingresa un numero no valido, o algun otro caracter, se le pedira que responda correctamente.

function preguntas(text, precio) {
    let aux = parseInt(prompt(text));
    let decision = false;
    let precioAcumuladoAux = precioAcumulado; //asi se evita modificar el valor del precio acumulado dentro de la funcion, y mantiene el valor actualizado pregunta a pregunta.
    while (typeof (aux) != Number && aux !== 1 && aux !== 2) {
        aux = parseInt(prompt('Por favor respondé con un número válido\n' + text));
    }
    if (aux === 2) {
        precioAcumuladoAux = precioAcumuladoAux + precio;
        decision = true;
    }
    return {
        acumulado: precioAcumuladoAux, //ahora la funcion debe retornar un objeto para poder guardar qué contestó, y el precio acumulado
        necesita: decision
    };
}
//pregunta sobre el tipo de servicio personalizaod, para abstraer las preguntas en una funcion de orden superior

const servPersPreg = (preg, acum) => {
    let resp = parseInt(prompt(preg));
    let precioAcumuladoAux;
    if (resp == 1 || resp == 2 || resp == 3) {
        precioAcumuladoAux = acum + servicios[resp - 1].precio;
        console.log(precioAcumuladoAux);
    } else {
        alert('Respuesta no válida, actualizá y volvé a intentar');
    }
    return {
        acumulado: precioAcumuladoAux, //ahora la funcion debe retornar un objeto para poder guardar qué contestó, y el precio acumulado
        respuesta: resp
    };
}

const gestorDePreguntas = (preg, func, precio) => {
    return func(preg, precio);
}


//calcular cuotas
function cuotas(total, cant) {
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
        case 12:
            interes = 15 / 100;
            break
        default:
            alert('No disponible, actualizá la página y comenzá de nuevo');
    }
    let aux = total * interes;
    let totalCuotas = total + aux;
    let cuota = totalCuotas / cant;
    return cuota;
}




//FUNCIÓN DE ORDEN SUPERIOR
const modificarPrecio = (i, nuevoValor) => {
    if (i >= 1 && i <= servicios.length)
        servicios[i - 1].precio = nuevoValor;
    else alert('indice fuera de rango');
}
const modificarMockup = (i, valorMockup) => {
    if (i >= 1 && i <= servicios.length) {
        if (valorMockup === servicios[i - 1].Mockup && valorMockup)
            alert('Ya hay mockups disponibles');
        else if (valorMockup === servicios[i - 1].Mockup && !valorMockup)
            alert('No había mockups disponibles');
        else
            servicios[i - 1].Mockup = valorMockup;
    }
}

const modificarPropiedad = (i, actualizacion, funcion) => {
    funcion(i, actualizacion);
}

//esta seccion puede usarse para probar la funcion de orden superior modificarPropiedad
/*
console.log(servicios[2].precio);
console.log(servicios[2].Mockup);
servicios[2].Mockup=modificarPropiedad(3,false, modificarMockup);
servicios[2].Precio=modificarPropiedad(3,500, modificarPrecio);
console.log(servicios[2].precio);
console.log(servicios[2].Mockup);
modificarPropiedad(3,false, modificarMockup);
*/

//interacciones

//primer pregunta
let seleccion = parseInt(prompt('Seleccione el numero del tipo de sitio que desea comprar\n1-Landing Page\n2- Sitio Web Institucional\n3-E-commerce\n4-Sitio Personalizado\n5-Consultas sobre los sitios\n6-Salir'));
while (typeof (seleccion) != Number && seleccion !== 1 && seleccion !== 2 && seleccion !== 3 && seleccion !== 4 && seleccion !== 5 && seleccion !== 6) {
    seleccion = parseInt(prompt('Por favor, ingrese el numero de la consulta que desea realizar \n1-Landing Page\n2- Sitio Web Institucional\n3-E-commerce\n4-Sitio Personalizado\n5-Consultas sobre los sitios\n6-Salir'));
}

// primer respuesta
let tipoDeServicio = seleccion - 1;
switch (seleccion) { //en el caso de comprar un producto, se podria agregar a una variable miCompra, pero considero mas logico y real que al momento de vender un sitio web no se pague hasta haber charlado con el desarrollador.
    case 1:

    case 2:

    case 3:
        servicioElegido(tipoDeServicio);
        break
    case 4: {
        //se calcula el precio del sitio personalizado
        // las funciones actualizan una variable auxiliar interna con el valor de precioAcumulado
        //precioAcumulado se actualiza con la variable auxiliar acumuladoAux, que es otra variable auxiliar, dentro del switch
        let acumuladoAux;
        //paso 1
        acumuladoAux = gestorDePreguntas('Tenés el diseño del sitio?\n1-Si\n2-No', preguntas, precioDiseno);
        console.log(acumuladoAux.acumulado);
        necesitaDiseno = acumuladoAux.necesita;

        precioAcumulado += acumuladoAux.acumulado;
        console.log(precioAcumulado);

        //paso 2
        acumuladoAux = gestorDePreguntas('Tu pagina requiere de mantenimiento/actualizacion de contenido?\n1-No\n2-Si', preguntas, mantenimiento);
        necesitaMant = acumuladoAux.necesita;
        console.log(acumuladoAux.acumulado);

        precioAcumulado = acumuladoAux.acumulado;
        console.log(precioAcumulado);

        //paso 3
        acumuladoAux = gestorDePreguntas('Qué servicio te interesa?\n1-Landing Page (1 página).\n2-Sitio Web Institucional (5 páginas)\n3-E-commerce *(5 páginas + tienda)', servPersPreg, acumuladoAux.acumulado);

        precioAcumulado = acumuladoAux.acumulado;
        console.log(precioAcumulado);
        resp = acumuladoAux.respuesta;
        //ahora agrego el servicio creaddo por el cliente al array, para mantener la misma organizacion que los demas servicios
        agregarServicio(servicios[resp - 1].nombre, servicios[resp - 1].Paginas, necesitaMant, necesitaDiseno, precioAcumulado);
        servicioElegido(tipoDeServicio);
        console.log(servicios);
        break
    }
    case 5:
        //no es necesario chequear que el numero no sea entero porque parseInt lo convierte
        let consulta = parseInt(prompt('Seleccione el sitio sobre el que desea consultar\n1-Landing Page\n2- Sitio Web Institucional\n3-E-commerce\n4-salir'));

        if (consulta <= 3 && consulta >= 1) {
            verPropiedades(consulta);
        }
        else if (consulta == 4) {
            alert('Gracias por su visita');
        }
        else {
            alert('Respuesta inválida');
        }
        break
    case 6:
        break
    default:
        alert('ponele voluntad...');
        break;
}
if (quiereCuotas) {
    let costo = servicios[tipoDeServicio].precio;
    let resp2 = prompt('Ingresá en cuántas cuotas te gustaría pagar\n1-2 cuotas\n2-3 cuotas\n3-6 cuotas\n4-12 cuotas');
    if (resp2 == 1) {
        valorTotal = Math.ceil(cuotas(costo, 2));
    } else if (resp2 == 2) {
        valorTotal = Math.ceil(cuotas(costo, 3));
    } else if (resp2 == 3) {
        valorTotal = Math.ceil(cuotas(costo, 6));
    } else if (resp2 == 4) {
        valorTotal = Math.ceil(cuotas(costo, 12));
    } else {
        alert('Respuesta no válida, actualizá y volvé a intentar');
    }
    alert('El precio de cada cuota será de ' + valorTotal + ' USD');
}
