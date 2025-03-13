import Typed from 'typed.js';
import { Paragraph } from './paragraph';
import contents from './contents';

// must check if fetch is available and DOM is ready
let content_paragraphs: Promise<Paragraph[]> | null = null;

window.addEventListener('resize', onWindowResize);
document.addEventListener("DOMContentLoaded", function () {
    const splash_block = document.querySelector(".splash") as HTMLElement;

    let image_index = 0;
    const profile_image = document.querySelector("#banner>img") as HTMLImageElement;
    const images_set: {uri:string, loaded:boolean}[] = [{uri:"me.jpg", loaded:false},{uri:"me.png", loaded:false},{uri:"me2.jpg", loaded:false},{uri:"me30.png", loaded:false},{uri:"me4.jpg", loaded:false}]
    images_set.map( (img: {uri:string, loaded:boolean}) => {
        const el = document.createElement("img") as HTMLImageElement  // new Image()
        el.src = "app/assets/images/".concat(img.uri)
        el.onload = ()=>{
            img.loaded = true
        }
    })
    profile_image.addEventListener('transitionend', function handler(event) {
        if (!(event.target as HTMLElement).classList.contains("fade-out")) return
        const available_images = images_set.filter( img => img.loaded )
        profile_image.src = "app/assets/images/".concat( available_images[image_index%available_images.length].uri )
        image_index++;
        profile_image.classList.remove('fade-out');
    });

    const main_content = document.querySelector(".main") as HTMLDivElement;
    content_paragraphs = new Promise((resolve, _) => resolve( contents.map(
        block => new Paragraph(block, main_content)
    )))

    new Typed("#splash-text", {
        strings: ["$ hexdump ~/fedele.profile"],
        typeSpeed: 35,
        onComplete: function (self: Typed) {
            setTimeout(function () {
                if (splash_block.classList.contains("move-up")) return;
                splash_block.classList.add("move-up");
                let animated = false
                splash_block.addEventListener('transitionend', (event) => {
                    if (!animated) animated=true
                    else return
                    const header_height = splash_block.getBoundingClientRect().bottom;
                    document.querySelector<HTMLDivElement>(".content")!.style.marginTop = header_height.toString().concat("px")
                    animate_page();
                })
                new Typed("#subtitle", {
                    strings: [
                        "I am a Software Engineer &#x1F4BB;",
                        "I am graduated in Solo-Travelling &#x1F30D; &#x1F3F3;&#xFE0F;&#x200D;&#x1F308;",
                        "I am a broadcasting enthusiast &#x1F4FA;",
                        "I am a System Integrator &#x1F50C;",
                        "I am an airplanes lover &#x1F6EB;",
                        "I am proudly italian &#x1F1EE;&#x1F1F9; &#x1F1EA;&#x1F1FA;"
                    ],
                    loop: true,
                    smartBackspace: true,
                    backDelay: 1500,
                    typeSpeed: 35,
                    onStringTyped: ()=>{
                        if ( images_set.filter( img => img.loaded ).length < 2) return
                        profile_image.classList.add('fade-out');
                    }
                })
                new Typed("#profiles", {
                    strings: ["<p><a target=_blank href='https://linkedin.com/in/fedele-cavaliere'>LinkedIn</a></p><p><a target=_blank href='https://github.com/feddynventor'>GitHub</a></p><p><a target=_blank href='https://t.me/feddynventor'>Telegram</a></p><p>&#x1F4E7; <a target=_blank href='mailto:cavaliere12.web@gmail.com'>Email</a></p>"],
                    typeSpeed: 35,
                    showCursor: false
                })
            }, 250);
        },
    })

});

// ======
// Event handlers

function onWindowResize() {

    // WIP: this is a draft of the address highlighting feature
    document.querySelectorAll(".address").forEach( address => (address as HTMLElement).style.animationName = 'fadeIn' );
    // const top = (document.querySelector(".main")!.getBoundingClientRect() as DOMRect).y;
    // content_paragraphs?.then( content => content.forEach( block => {
    //     const index_address = document.querySelector("#addr".concat(  (Math.floor((top-block.getY())/32)*(-1)).toString()  )) as HTMLDivElement
    //     if (index_address) index_address.style.animationName = 'fadeInClear';
    // }))
}

// ======
// Entry functions

async function animate_page() {

    if (!content_paragraphs) return;
    let row_index = 0;

    for (const block of await content_paragraphs) {
        row_index += await block.render( row_index );
    }

    const addressItem = document.createElement('div');
    addressItem.textContent = "EOF";
    addressItem.className = 'address';
    addressItem.id = "addr".concat((row_index+1).toString());
    addressItem.style.animationName = 'fadeInClear';
    document.querySelector('.addresses')!.appendChild(addressItem);

}

