import { waitForFonts } from "./domutil";
import { createStore, Store, Reducer } from "redux";
import * as theme from "./theme";

export function makeStore<A>(reducer: Reducer<A>): Store<A> {
    if(process.env["DEBUG"])
        return createStore(reducer, window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]());
    else
        return createStore(reducer);
}

export function init(renderFn: () => void) {
    document.body.classList.add("disable-animation");
    waitForFonts(["Roboto"], renderFn, () => {})
    setTimeout(() => document.body.classList.remove("disable-animation"), 1);
};