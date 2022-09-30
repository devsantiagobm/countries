import { consultas } from "./consultas.js";
import { ui } from "./ui.js";

export default function busqueda() {
    const url = new URL(location.href)
    const parametros = [...url.searchParams.entries()]
    const validacion = parametros.length == 1 && parametros[0][0] == "country" && Boolean(parametros[0][1]) 
    validacion ? consultas.buscarPais(parametros[0][1]) : location.href = "../";
}