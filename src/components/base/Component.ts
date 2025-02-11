export abstract class Component<T> {

    constructor (protected readonly container: HTMLElement) {

    }

    setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    render (data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}