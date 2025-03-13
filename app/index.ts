import Typed from 'typed.js';
import { Paragraph } from './paragraph';
import contents from './contents';

// must check if fetch is available and DOM is ready
let content_paragraphs: Promise<Paragraph[]> | null = null;
let title: {
    text_element: HTMLElement,
    animation: Typed,
    height?: number
}

window.addEventListener('resize', onWindowResize);
document.addEventListener("DOMContentLoaded", function () {
    const splash_block = document.querySelector(".splash") as HTMLElement;

    const main_content = document.querySelector(".main") as HTMLDivElement;
    content_paragraphs = new Promise((resolve, _) => resolve( contents.map(
        block => new Paragraph(block, main_content)
    )))

    title = {
        text_element: document.querySelector(".splash-text") as HTMLElement,
        animation: new Typed(".splash-text", {
            strings: ["$ hexdump ~/fedele.profile"],
            typeSpeed: 35,
            onComplete: function (self: Typed) {
                setTimeout(function () {
                    if (splash_block.classList.contains("move-up")) return;
                    splash_block.classList.add("move-up");
                    title.height = title.text_element.offsetHeight;
                    animate_page();
                }, 250);
            },
        })
    };

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

