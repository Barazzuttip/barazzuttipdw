//declaracion de constantes, variables, clases y funciones
const precioDiseno = 50;
const precioLP = 140;
const precioSWI = 200;
const precioEcomm = 300;
const mantenimiento = 20;

let servicios = [];

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

//cargo los servicios al localStorage
localStorage.setItem("servicios", JSON.stringify(servicios));



//funciones
const verPropiedades = () => {
    //i = i - 1;
    const svc = JSON.parse(localStorage.getItem("servicios"));
    let mensaje = (`\n`);
    //se verifica el tipo de dato para que en los valores booleanos no devuelva 'true' o 'false' como texto.
    for (i = 0; i < svc.length; i++) {
        const svcItem = document.createElement("ul");
        for (const propiedad in svc[i]) {
            const prop = document.createElement("li");
            if (typeof (svc[i][propiedad]) !== "boolean") {
                // mensaje += '- ' + propiedad + ': ' + svc[i][propiedad] + '\n';
                prop.textContent = propiedad + `| ${svc[i][propiedad]}`;
            }
            else if (typeof (svc[i][propiedad]) == "boolean") {
                if (svc[i][propiedad] == true) {
                    //    mensaje += '- ' + propiedad + ': Si\n';
                    prop.textContent = propiedad + `| Si`;
                }
                else {
                    //mensaje += '- ' + propiedad + ': No\n';
                    prop.textContent = propiedad + `| No`;
                }
            }
            svcItem.append(prop);
        }
        svcCard.append(svcItem);
    }
    // alert(mensaje + '(precio en USD)');
}