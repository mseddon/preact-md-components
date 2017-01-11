import "./components/styles.less"
import { waitForFonts } from "./domutil";
import * as theme from "./theme";

export function init(renderFn: () => void) {
    window.addEventListener("load", () => {
        document.body.classList.add("disable-animation");
        waitForFonts(["Roboto"], renderFn, () => {})
        setTimeout(() => document.body.classList.remove("disable-animation"), 1);
    })
};