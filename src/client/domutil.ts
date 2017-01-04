// used to locate the true position of the document origin.
var topLeftElement = document.createElement("div");
topLeftElement.style.position = "absolute";
topLeftElement.style.left = "0px";
topLeftElement.style.top = "0px";
topLeftElement.style.width = "0px";
topLeftElement.style.height = "0px";


/**
 * Return the global position of the given element, working around bugs in getBoundingClientRect (particularly android).
 * @param elem the element to find.
 * @return {{x: number, y: number}} the coordinate of the element.
 */
export function globalPosition(elem: Element) {
  // obviously, in correct implementations r0 will always be 0,0.  However, under some android chrome versions, this value is
  // actually relative to the viewport.  Using topLeftElement, we negate any possible effect of this.
  var r0 = topLeftElement.getBoundingClientRect();
  var r1 = elem.getBoundingClientRect();
  return {
    x: r1.left - r0.left,
    y: r1.top - r0.top
  }
}

export function globalRect(elem: Element) {
  var r0 = topLeftElement.getBoundingClientRect();
  var r1 = elem.getBoundingClientRect();
  return {
    x: r1.left - r0.left,
    y: r1.top - r0.top,
    width: r1.width,
    height: r1.height,
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(topLeftElement);
});