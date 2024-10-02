const precioMM = 80;
const precioDiseno = 50;
const precioLP = 110;
const precioSWI = 150;
const precioEcomm = 250;
const mantenimiento = 20;


let precioAcumulado = 0;

//la funcion tendra opciones numericas
//si el usuario ingresa un numero no valido, o algun otro caracter, se le pedira que responda correctamente.

function preguntas(text, precio) {
    let aux = parseInt(prompt(text));
    let precioAcumuladoAux = precioAcumulado; //asi se evita modificar el valor del precio acumulado dentro de la funcion
    while (typeof (aux) != Number && aux !== 1 && aux !== 2) {
        aux = parseInt(prompt('Por favor respondé con un número válido\n' + text));
    }
    if (aux === 2) {
        precioAcumuladoAux = precioAcumuladoAux + precio;
    }
    return precioAcumuladoAux;
}

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
    console.log(aux);
    console.log(total);
    let totalCuotas = total + aux;
    console.log(totalCuotas);
    let cuota = totalCuotas / cant;
    console.log(cuota);
    return cuota;
}

let respuesta = parseInt(prompt('Seleccione la consulta que desea realizar \n1-Cotizar mi servicio.\n2-Consultar cuotas\n3-Salir'));

while (typeof (respuesta) != Number && respuesta !== 1 && respuesta !== 2 && respuesta !== 3) {
    respuesta = parseInt(prompt('Por favor, ingrese el numero de la consulta que desea realizar \n1-Cotizar mi servicio.\n2-Consultar cuotas\n3-Salir'));
}
switch (respuesta) {
    case 1:
        precioAcumulado = preguntas('Tenés tu manual de marca?\n1-Si\n2-No', precioMM);
        console.log(precioAcumulado); //solo necesario para chequear la correcta suma de precios

        precioAcumulado = preguntas('Tenés el diseño del sitio?\n1-Si\n2-No', precioDiseno);
        console.log(precioAcumulado);

        precioAcumulado = preguntas('Tu pagina requiere de mantenimiento/actualizacion de contenido?\n1-No\n2-Si', mantenimiento);
        console.log(precioAcumulado);

        let resp = parseInt(prompt('Qué servicio te interesa?\n1-Landing Page (1 página).\n2-Sitio Web Institucional (5 páginas)\n3-E-commerce *(5 páginas + tienda)'));

        if (resp == 1) {
            precioAcumulado = precioAcumulado + precioLP;
        } else if (resp == 2) {
            precioAcumulado = precioAcumulado + precioSWI;
        } else if (resp == 3) {
            precioAcumulado = precioAcumulado + precioEcomm;
        } else {
            alert('Respuesta no válida, actualizá y volvé a intentar');
        }
        alert('El precio total por el servicio será de ' + precioAcumulado + ' USD');
        break
    case 2:
        let costo = parseFloat(prompt('Ingresá el costo del servicio que calculaste'));
        let resp2 = prompt('Ingresá en cuántas cuotas te gustaría pagar\n1-2 cuotas\n2-3 cuotas\n3-6 cuotas\n4-12 cuotas');
        if (resp2 == 1) {
            valorTotal = cuotas(costo,2);
        } else if (resp2 == 2) {
            valorTotal = cuotas(costo,3);
        } else if (resp2 == 3) {
            valorTotal = cuotas(costo,6);
        } else if (resp2 == 4) {
            valorTotal = cuotas(costo,12);
        } else {
            alert('Respuesta no válida, actualizá y volvé a intentar');
        }
        alert('El precio de cada cuota será de ' + valorTotal + ' USD');
        break
    case 3:
        break
    default:
        alert('Por favor responde con el numero de la opcion');
        break
}


