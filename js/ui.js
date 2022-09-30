class UI {
    error(error) {
        alert(error)
    }

    mostrarDatos(datos) {
        this.limpiarHTML()
        this.ocultarPaisNoEncontrado()
        for (let i = 0; i < datos.length; i++) {
            this.generarElemento(datos[i])
        }
        
        this.ocultarLoader();
        this.ocultarModal();
    }
    
    revisarPais(datos){
        if(datos.status === 404){
            this.paisNoEncontrado()
            this.ocultarLoader();
            return;
        }

        this.mostrarDatos(datos)
    }

    ocultarModal(){
        const modal = document.querySelector('.modal')
        if(!modal.classList.contains('modal--hidden')) modal.classList.add('modal--hidden')

    }

    paisNoEncontrado(){
        const mensaje = document.querySelector('.mensaje')
        mensaje.classList.add('mensaje--active')
    }

    ocultarPaisNoEncontrado(){
        const mensaje = document.querySelector('.mensaje')
        mensaje.classList.remove('mensaje--active')
    }

    generarElemento(item) {
        const contenido = document.querySelector('.content__box')
        const box = document.createElement('a')
        box.href = `./country/?country=${item.name.common}?fullText=true`;
        box.classList.add('content__country', 'country')
        box.innerHTML = this.generarHTML(item)

        contenido.appendChild(box);
        this.agregarIntersectionObserver(box)
    }

    agregarIntersectionObserver(item){
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                setTimeout(() => {
                    entries[0].target.classList.add('opacity')
                }, 300);
            }
        })

        observer.observe(item)
    }

    generarHTML(item) {
        return `
            <picture class="country__picture">
                <img class="country__flag" src="${item.flags.png}" alt="country flag">
            </picture>
            <div class="country__data"> 
                <div class="country__name">${item.name.common} </div>
                <div class="country__item">
                    Population:
                    <span class="country__info country__info--population">${this.formatearPoblacion(item.population)}</span>
                </div>
                <div class="country__item">
                    Region:
                    <span class="country__info country__info--region">${item.region} </span>
                </div>
                <div class="country__item">
                    Capital:
                    <span class="country__info country__info--capital">${item.capital ? item.capital[0] : "Capital not found"}</span>
                </div>
            </div>
        `;


    }

    formatearPoblacion(item) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
          })

        return formatter.format(item).slice(1);
    }

    campoVacio(){
        const label = document.querySelector('.form__label')
        label.classList.add('form__label--vacio')
        
        setTimeout(() => label.classList.remove('form__label--vacio'), 500);
    }

    limpiarHTML(){
        const contenido = document.querySelector('.content__box')

        while(contenido.firstChild){
            contenido.removeChild(contenido.firstChild)
        }
    }

    acordeon(){
        const lista = document.querySelector('.form__options')
        const arrow = document.querySelector('.form__arrow')

        lista.classList.toggle('form__options--active')
        
        lista.classList.contains('form__options--active')
        ? arrow.style.rotate = "180deg"
        : arrow.style.rotate = "0deg"
    }

    loader(word){
        const loader = document.querySelector(`.form__loader${word}`)
        loader.classList.add('form__loader--active')
    }

    ocultarLoader(){
        const loaderSearch = document.querySelector(`.form__loader--search`)
        const loaderFilter = document.querySelector(`.form__loader--filter`)
        if(loaderSearch.classList.contains('form__loader--active')){
            loaderSearch.classList.remove('form__loader--active')
            return;
        }
        loaderFilter.classList.remove('form__loader--active')
    }

    cambiarModo(){
        const getStyles = getComputedStyle(document.documentElement)
        const colorDeTexto = getStyles.getPropertyValue('--text');

        if(colorDeTexto.trim() === "#ffffff"){
            this.cambiarColores("--light")
            return;
        }
        this.cambiarColores("--dark");
    }

    cambiarColores(mode){
        const setStyles = document.documentElement.style;
        const getStyles = getComputedStyle(document.documentElement);
        const vars = [`--background`, `--text`, `--elements`]
        const varsMode = vars.map(item => `${mode}${item.slice(1)}`)
        const valores = varsMode.map(item => getStyles.getPropertyValue(item))
        
        valores.forEach((item,index) => setStyles.setProperty(vars[index], item))

        this.sincronizarStorage(mode)
        this.cambiarHTML(mode);
    }

    sincronizarStorage(mode){
        localStorage.setItem('mode', mode);
    };

    cambiarHTML(mode){
        const texto = document.querySelector('.header__mode-text')
        const imagen = document.querySelector('.header__icon')
        const modoFormateado = mode.slice(2)
        texto.textContent = `${modoFormateado} mode`;
        imagen.src = `assets/${modoFormateado}.svg`;
    }

}

export const ui = new UI();
