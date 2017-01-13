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

export function waitForFonts(familyName: string[], success: () => void, failure: () => void) {
    function fontTester(familyName: string) {
        let tester = document.createElement("span");
        tester.textContent = "BESbswy menu";
        tester.style.cssText = 'position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-family:serif;';
        tester.style.fontFamily = `"${familyName}", serif`;

        document.body.appendChild(tester);
        return tester;
    }

    function execute() {
        let time = Date.now();

        let fallback = fontTester("serif");
        let fallbackWidth = fallback.offsetWidth;

        let total = familyName.length;

        let loaders = familyName.map(fontTester);

        function cleanup() {
            document.body.removeChild(fallback)
            loaders.forEach(x => document.body.removeChild(x))
        }

        function smash() {
            loaders.forEach(x => {
              if(fallbackWidth != x.offsetWidth && !x["done"]) {
                 total--;
                 x["done"] = true;
              }
            })
            if(total == 0) {
                cleanup();
                success();
            } else if(Date.now()-time > 3000) {
                //cleanup();
                failure();
            } else {
                setTimeout(smash, 50);
            }
        }

        smash();
    }
    if(document.body)
        execute();
    else
        document.addEventListener("DOMContentLoaded", execute);
}

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(topLeftElement);
});