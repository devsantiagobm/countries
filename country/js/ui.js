import {consultas}  from "./consultas.js";
class UI {
    error(error) {
        location.href = "../"
    }

    mostrarDatos(datos) {
        if(!datos) {
            return
        }
        const caja = document.querySelector('.content')
        const html = this.generarHTML(datos[0]);
        caja.innerHTML = html;
    }

    generarHTML(datos) {

        const {name: { common }, population, region, subregion, capital, tld, currencies, languages, flags:{png}, name: {official}, borders} = datos;
        const poblacion = this.formatearPoblacion(population)
        this.generarBordes(borders)
        return `
        <div class="content__box">
            <div class="content__image">
                <picture class="content__flag"> 
                <img src=${png} alt="flag picture"></picture>
            </div>
            <div class="content__data">
                <h2 class="content__title">${common} </h2>
                <div class="content__columns">
                    <div class="content__info">
                        <div class="content__line">Native nave: 
                            <span class="content__name content__regular">${official || "Not found"}</span>
                        </div>
                        <div class="content__line">Population: 
                            <span class="content__population content__regular">${poblacion || "Not found"}</span>
                        </div>
                        <div class="content__line">Region: 
                            <span class="content__region content__regular">${region || "Not found"}</span>
                        </div>
                        <div class="content__line">Sub Region: 
                            <span class="content__sub-region content__regular">${subregion || "Not found"}</span>
                        </div>
                        <div class="content__line">Capital: 
                            <span class="content__capital content__regular">${capital || "Not found"}</span>
                        </div>
                    </div>
                    <div class="content__currencie">
                        <div class="content__line">Top Level Domain: 
                            <span class="content__domain content__regular">${tld || "Not found"}</span>
                        </div>
                        <div class="content__line">Currencies:
                            <span class="content__currencies content__regular">${Object.values(currencies)[0].name || "Not found"}</span>
                        </div>
                        <div class="content__line">Languages:
                            <span class="content__language content__regular">${this.generarLenguajes(Object.values(languages)) || "Not found"}</span>
                        </div>
                    </div>
                </div>
            <div class="content__border">
                Border Countries:
                <div class="content__list">
                    
                </div>
            </div>
        </div>
        </div>
        `;
    }

    generarBordes(bordes){
        let parametros = "";
        if(bordes) {
            bordes.forEach(borde => parametros = `${parametros}${borde},`)
            const url = `https://restcountries.com/v3.1/alpha?codes=${parametros}`
            consultas.buscarBordes(url)
        }
    }

    mostrarBordes(datos){
        const boxPadre = document.querySelector('.content__list')
        datos.forEach(pais => {
            const nombre = pais.name.common;
            const box = document.createElement('a')
            const span = document.createElement("span")
            box.href = `../country/?country=${nombre}?fullText=true`
            box.classList.add("content__item")
            span.textContent = nombre;
            box.appendChild(span)
            boxPadre.appendChild(box)
        })
    }

    generarLenguajes(lenguajes){
        let texto = "";
        lenguajes.forEach(lenguaje => texto = `${texto}${lenguaje}, `)
        return texto.slice(0, -2)
    }

    revisarPais(datos) {
        if (datos.status === 404) {
            this.paisNoEncontrado()
            this.ocultarLoader();
            return;
        }

        this.mostrarDatos(datos)
    }

    ocultarModal() {
        const modal = document.querySelector('.modal')
        if (!modal.classList.contains('modal--hidden')) modal.classList.add('modal--hidden')

    }

    paisNoEncontrado() {
        const mensaje = document.querySelector('.mensaje')
        mensaje.classList.add('mensaje--active')
    }

    ocultarPaisNoEncontrado() {
        const mensaje = document.querySelector('.mensaje')
        mensaje.classList.remove('mensaje--active')
    }

    generarElemento(item) {
        const contenido = document.querySelector('.content__box')
        const box = document.createElement('a')
        box.href = "https://www.google.com";
        box.target = "_blank";
        box.classList.add('content__country', 'country')
        box.innerHTML = this.generarHTML(item)

        contenido.appendChild(box);
    }

   

    formatearPoblacion(item) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        })

        return formatter.format(item).slice(1);
    }

    campoVacio() {
        const label = document.querySelector('.form__label')
        label.classList.add('form__label--vacio')

        setTimeout(() => label.classList.remove('form__label--vacio'), 500);
    }

    limpiarHTML() {
        const contenido = document.querySelector('.content__box')

        while (contenido.firstChild) {
            contenido.removeChild(contenido.firstChild)
        }
    }

    acordeon() {
        const lista = document.querySelector('.form__options')
        const arrow = document.querySelector('.form__arrow')

        lista.classList.toggle('form__options--active')

        lista.classList.contains('form__options--active')
            ? arrow.style.rotate = "180deg"
            : arrow.style.rotate = "0deg"
    }

    loader(word) {
        const loader = document.querySelector(`.form__loader${word}`)
        loader.classList.add('form__loader--active')
    }

    ocultarLoader() {
        const loaderSearch = document.querySelector(`.form__loader--search`)
        const loaderFilter = document.querySelector(`.form__loader--filter`)
        if (loaderSearch.classList.contains('form__loader--active')) {
            loaderSearch.classList.remove('form__loader--active')
            return;
        }
        loaderFilter.classList.remove('form__loader--active')
    }

    cambiarModo() {
        const getStyles = getComputedStyle(document.documentElement)
        const colorDeTexto = getStyles.getPropertyValue('--text');

        if (colorDeTexto.trim() === "#ffffff") {
            this.cambiarColores("--light")
            return;
        }
        this.cambiarColores("--dark");
    }

    cambiarColores(mode) {
        const setStyles = document.documentElement.style;
        const getStyles = getComputedStyle(document.documentElement);
        const vars = [`--background`, `--text`, `--elements`]
        const varsMode = vars.map(item => `${mode}${item.slice(1)}`)
        const valores = varsMode.map(item => getStyles.getPropertyValue(item))

        valores.forEach((item, index) => setStyles.setProperty(vars[index], item))

        this.sincronizarStorage(mode)
        this.cambiarHTML(mode);
    }

    sincronizarStorage(mode) {
        localStorage.setItem('mode', mode);
    };

    cambiarHTML(mode) {
        const texto = document.querySelector('.header__mode-text')
        const imagen = document.querySelector('.header__icon')
        const modoFormateado = mode.slice(2)
        texto.textContent = `${modoFormateado} mode`;
        imagen.src = `assets/${modoFormateado}.svg`;
    }

}

export const ui = new UI();
