export class Metadata {
  public static add(key: string, value: string, isProperty?: boolean) {
    const tag: HTMLMetaElement = document.createElement('meta');
    tag.setAttribute(isProperty ? 'property' : 'name', key);
    tag.content = value;

    this.addToHeader(tag, isProperty);
  }

  public static setTitle(title: string): void {
    document.getElementsByTagName("title")[0].innerHTML = title;

    this.add("og:title", title, true);
    this.add("twitter:title", title);
    this.add("name", title);
  }

  public static setSiteName(siteName: string): void {
    this.add("og:site_name", siteName, true);
  }

  public static setUrl(): void {
    this.add("og:url", location.href, true);
  }

  public static setDescription(description: string): void {
    this.add("og:description", description, true);
    this.add("twitter:description", description);
    this.add("description", description);
    // TODO: <meta itemprop="description" content="This is the page description">
  }

  public static setImage(imageUrl: string): void {
    this.add("og:image", imageUrl, true);
    this.add("twitter:image:src", imageUrl);
    //TODO: <meta itemprop="image" content="http://www.example.com/image.jpg">
  }

  private static deleteExistingTags(tag: HTMLElement, isProperty?: boolean): void {
    const currentMetatags: HTMLMetaElement[] = [].slice.call(document.getElementsByTagName("meta"));
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
