export class Metadata {
    public static add(key: string, value: string, isProperty?: boolean) {
        var tag: HTMLMetaElement = document.createElement('meta');
        tag.setAttribute(isProperty ? 'property' : 'name', key);
        tag.content = value;

        this.addToHeader(tag, isProperty);
    }

    private static deleteExistingTags(tag: HTMLElement, isProperty?: boolean): HTMLElement {
        const currentMetatags: HTMLMetaElement[] = Array.from(document.getElementsByTagName("meta"));
        currentMetatags.filter(currentTag => {
            const p1 = tag.getAttribute("property");
            const n1 = tag.getAttribute("name");
            const p2 = currentTag.getAttribute("property");
            const n2 = currentTag.getAttribute("name");

            if (isProperty && p1 === p2 || !isProperty && n1 === n2) {
                currentTag.parentNode.removeChild(currentTag);
            }
        });
    }

    private static addToHeader(tag: HTMLElement, isProperty?: boolean) {
        this.deleteExistingTags(tag);


        document.getElementsByTagName('head')[0].appendChild(tag);
    }
}
