export class Carousel {
    images: string[];
    container: HTMLDivElement;
    index: number;
    timer: number;

    constructor(images: string[], height?: number, timer?: number) {
        this.images = images;
        this.index = 0;
        this.container = document.createElement("div");
        this.container.style.height = height?.toString().concat("px") || "192px"
        this.timer = timer || 3000;

        if (!this.container) {
            throw new Error("Container element not found.");
        }

        this.setupCarousel();
    }

    setupCarousel(): void {
        this.container.classList.add("carousel-container");

        this.images.forEach((image) => {
            const imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.classList.add("carousel-image");
            imgElement.style.transition = "transform 0.5s ease-in-out";
            // imgElement.style.width = (150/this.images.length).toString().concat("vw");
            this.container.appendChild(imgElement);
        });

        this.updateCarousel();
    }

    moveNext(): void {
        this.index = (this.index + 1) % this.images.length;
        this.updateCarousel();
    }

    movePrev(): void {
        this.index = (this.index - 1 + this.images.length) % this.images.length;
        this.updateCarousel();
    }

    start(): HTMLDivElement {
        setInterval(() => {
            this.moveNext();
        }, this.timer);
        return this.container;
    }

    updateCarousel(): void {
        const images = Array.from( this.container.getElementsByClassName("carousel-image") ) as HTMLImageElement[];
        const width_list = Array.from(images).map((img) => (img as HTMLElement).offsetWidth);

        // Array
        // .from({ length: count }, (_, i) => images[(this.index + i) % images.length])
        // .forEach( (img, i) => {
        //     img.style.transform = `translateX()`
        // })

        images.forEach( (img: HTMLImageElement, i:number) => {
            console.log(i, width_list.slice(0,((i - this.index + this.images.length) % this.images.length)))
            img.style.transform = `translateX(${width_list.slice(0,((i - this.index + this.images.length) % this.images.length)).reduce( (tot,w)=>tot+w, 0 )}px)`
        })


        // scroll the images on first position 


        // for (let i = 0; i < images.length; i++) {
        //     const imgElement = images[i] as HTMLElement;
            


        //     // imgElement.style.transform = `translateX(${widths.slice(i, i).reduce((acc, width) => acc + width, 0)}px)`;
        //     // imgElement.style.transform = `translateX(${widths.slice(0, i).reduce((acc, width) => acc + width, 0) - this.index * widths[0]}px)`;
        //     // imgElement.style.transform = `translateX(${((i - this.index + this.images.length) % this.images.length) * imgElement.offsetWidth}px)`;
        // }
    }
}