document.addEventListener('DOMContentLoaded', () => {

    let viewports = document.querySelectorAll('.viewport');
    if (viewports) {
        viewports.forEach(viewport => {
            
            loadViewportImages(viewport);

            viewport.querySelector('.js-compare').addEventListener('click', handleActiveCompare, false);

            let compares = viewport.querySelectorAll('.js-img-compare');
            compares.forEach(compare => {
                compare.addEventListener( "click", handleCompare, false );
            });
        });
    }
    
});

const handleCompare = event => {
    const currentViewport = event.target.closest('.viewport');
    const src = event.target.getAttribute('src');
    currentViewport.querySelector('.js-active-comparator').style.backgroundImage = `url(${src})`;
}
const handleActiveCompare = event => {
    const currentViewport = event.target.closest('.viewport');
    const lightbox = currentViewport.querySelector('.viewport__lightbox');
    const comparator = currentViewport.querySelector('.js-active-comparator');
    if (comparator) {
        comparator.querySelector('.comparator').style.width = '0px';
        comparator.removeEventListener( "mousemove", handleMove, false );
        lightbox.classList.remove('js-active-comparator');
    } else {
        lightbox.classList.add('js-active-comparator');
        currentViewport.querySelector('.js-active-comparator .comparator').style.width = '0px';
        currentViewport.querySelector('.js-active-comparator').addEventListener( "mousemove", handleMove, false );
    }
}
const handleMove = event => {
    const currentViewport = event.target.closest('.viewport');

    let viewportX = event.clientX;
    let boxRectangle = event.target.getBoundingClientRect();
    let localX = viewportX - boxRectangle.left;
    let borderWidth = parseInt( window.getComputedStyle( event.target ).borderTopWidth, 10 );
    localX -= borderWidth;

    currentViewport.querySelector( ".js-active-comparator .comparator" ).style.width = localX + "px";
}
const loadViewportImages = viewport => {
    const lightbox = viewport.querySelector('.viewport__lightbox');
    const imageData = lightbox.getAttribute('data-img').split(',');
    const ratio = ( imageData[1] / imageData[0] ) * 100;

    const imagesGallery = viewport.querySelectorAll('.viewport__gallery .js-img-compare');
    for (let index = 0; index < imagesGallery.length; index++) {
        const img = imagesGallery[index];
        const src = img.getAttribute('src');
        if (index == 0) {
            lightbox.style.paddingTop = `${ratio}%`;
            lightbox.style.backgroundImage = `url(${src})`;
            createMediaQuerie(imageData);
        } else if (index == 1) {
            lightbox.querySelector('.comparator').style.backgroundImage = `url(${src})`;
        } else {
            break;
        }
    }
}
const createMediaQuerie = img => {
    let css = 
    `@media screen and (max-width:${img[0]}px) {
        .viewport__lightbox .comparator {
            background-position-x: calc(calc(calc(100vw - 20px) / 2) - ${img[0]/2}px);
        }
    }`
    let head = document.head || document.getElementsByTagName('head')[0];
    let style = document.createElement('style');

    head.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
}