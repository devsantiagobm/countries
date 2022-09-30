import { ui } from "./ui.js"; 
class Consultas{
    buscarPais(pais){
        const url = `https://restcountries.com/v3.1/name/${pais}`;
        fetch(url)
            .then(resultados => resultados.json())
            .then(datos => ui.mostrarDatos(datos))
            .catch(error => ui.error(error))
    }

    buscarBordes(url){
        fetch(url)
            .then(resultados => resultados.json())
            .then(datos => ui.mostrarBordes(datos))
    }
}

export const consultas = new Consultas()