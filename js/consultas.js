import { ui } from "./ui.js"; 
class Consultas{
    consultarPaises(){
        const url = "https://restcountries.com/v3.1/all";
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => ui.mostrarDatos(datos))
            .catch(error => ui.error(error))
    }

    busqueda(pais){
        const url = `https://restcountries.com/v3.1/name/${pais}`;
        ui.loader("--search")
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => ui.revisarPais(datos))
            .catch(error => ui.error(error))
    }

    filtrar(region){
        const url = `https://restcountries.com/v3.1/region/${region}`
        ui.loader("--filter")
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => ui.mostrarDatos(datos))
            .catch(error => ui.error(error))
    }
}

export const consultas = new Consultas()