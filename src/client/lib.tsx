import "./components/styles.less"
import { waitForFonts } from "./domutil";
import * as theme from "./theme";
import * as preact from "preact"

preact.options.syncComponentUpdates = false
preact.options.debounceRendering = requestAnimationFrame

export function init(renderFn: () => void) {
    window.addEventListener("load", () => {
        document.body.classList.add("disable-animation");
        waitForFonts(["Roboto",  "Material Icons"], renderFn, () => {})
        setTimeout(() => document.body.classList.remove("disable-animation"), 1);
    })
};