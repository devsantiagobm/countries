import { consultas } from "./consultas.js";
import { ui } from "./ui.js";

export default function busqueda(){
    const form = document.querySelector('.form')

    form.addEventListener('submit', e => validarSubmit(e))

    function validarSubmit(e){
        e.preventDefault();
        
        country.value ? consultas.busqueda(country.value) : ui.campoVacio()
    }
}