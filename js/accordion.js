import { consultas } from "./consultas.js";
import { ui } from "./ui.js";
export default function accordion(){
    const acordeon = document.querySelector('.form__accordion')
    const continentes = document.querySelector('.form__list')
    acordeon.addEventListener('click', () => ui.acordeon())
    
    continentes.addEventListener('click', e => {

        if(e.target.classList.contains('form__item')){
            consultas.filtrar(e.target.textContent)
            ui.acordeon();
        }
    })
}