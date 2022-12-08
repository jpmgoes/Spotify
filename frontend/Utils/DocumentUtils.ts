export class DocumentUtils {
  static removeClass(div: Element, remove: string) {
    if (div.className.includes(remove)) {
      const regex = new RegExp(remove);
      div.className = div.className.replace(regex, "");
    }
  }
  static addClass(div: Element, classToAdd: string) {
    if (!div.className.includes(classToAdd)) {
      div.className += " " + classToAdd;
    }
  }
}
