export default function button(){
    const link = document.querySelector('.link')
    const back = document.querySelector('.back')
    link.style.maxWidth = `${back.clientWidth}px`
}