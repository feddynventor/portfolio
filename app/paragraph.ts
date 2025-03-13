import Typed from 'typed.js'

export type ParagraphType = {
    title: string;
    size?: number; // in `em` units
    content: (string | HTMLDivElement)[];
}

export class Paragraph {
    title: string;
    block: HTMLDivElement;
    content_elements: (HTMLSpanElement | HTMLParagraphElement | HTMLDivElement)[] = [];

    private isDiv(element: unknown): element is HTMLDivElement {
        return element instanceof HTMLDivElement
    }

    constructor(body: ParagraphType, parent: HTMLDivElement) {
        this.block = document.createElement('div')

        this.title = body.title;
        const titleElement = document.createElement('span');
        titleElement.id = "title".concat(Math.random().toString(10).substring(2, 9))
        titleElement.className = 'bold-text';
        titleElement.innerHTML = this.title;
        if (body.size) titleElement.style.fontSize = body.size.toString().concat('em');

        this.content_elements.push(titleElement);

        body.content.forEach((content, index) => {
            if (!this.isDiv(content)) {
                const contentElement = document.createElement('p')
                contentElement.innerHTML = "~ ".concat(content);
                this.content_elements.push(contentElement);
            } else {
                this.content_elements.push(content);
            }
        })

        parent.appendChild(this.block);

    }

    render(starting_row: number = 0): Promise<number> {
        return new Promise((resolve) => {
            const addressList = document.querySelector('.addresses') as HTMLElement;
            this.block.style.animationName = 'fadeInClear';
            let row_index = starting_row;
            
            this.content_elements.forEach((element, content_index) => {
                element.style.animationName = 'fadeInClear';
                element.style.animationDelay = (content_index * 80).toString().concat('ms');

                this.block.appendChild(element);

                if (element.querySelector("video") !== null) {
                    const minimum_height = this.block.clientWidth*9/16;
                    if (minimum_height%32<16) element.style.height = (Math.floor(minimum_height/32)*32).toString().concat("px")
                    else element.style.height = (Math.ceil(minimum_height/32)*32).toString().concat("px")
                }

                const rows = Math.floor(element.offsetHeight / 32);
                this.generateAddresses(row_index, rows).forEach((address, sub_content_index) => {
                    const addressItem = document.createElement('div');
                    
                    addressItem.className = 'address';
                    addressItem.id = "addr".concat((row_index+sub_content_index).toString());
                    addressItem.textContent = address;
                    
                    addressList.appendChild(addressItem);

                    addressItem.style.animationDelay = (content_index * 80).toString().concat('ms');
                    if (sub_content_index==0 || content_index==0) addressItem.style.animationName = 'fadeInClear';
                    else addressItem.style.animationName = 'fadeIn';
                })
                row_index += rows;
            })

            this.content_elements.at(-1)?.addEventListener('animationend', () => {
                resolve(row_index);
            }

        )})
    }


    private generateAddresses = (start: number, count: number): string[] => {
        const addresses = [];
        for (let i = start; i < start+count; i++) {
            addresses.push("0x".concat((i * 0x30).toString(16).padStart(4, '0')));
        }
        return addresses;
    }

    getY(): number {
        return this.block.getBoundingClientRect().y;
    }

}