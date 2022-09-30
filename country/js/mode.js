import { ui } from "./ui.js";

export default function mode(){
    const button = document.querySelector('.header__mode')

    button.addEventListener('click', e => ui.cambiarModo())

    document.addEventListener('DOMContentLoaded', () =>{
        const mode = localStorage.getItem('mode');
        mode ? ui.cambiarColores(mode) : ui.cambiarColores("--dark")
    })
}