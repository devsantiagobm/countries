import { consultas } from "./consultas.js";
export default function countries(){
    window.addEventListener('load', () => consultas.consultarPaises())
}