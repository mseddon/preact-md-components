import { h, render } from "preact";
import { createStore, combineReducers, Store } from 'redux';
import { Header } from "./components/Header"
import { TextField } from "./components/TextField"
import { Button } from "./components/Button"
function makeStore(reducer) {
    if(process.env["DEBUG"])
        return createStore(reducer, window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]());
    else
        return createStore(reducer);
}


document.addEventListener("DOMContentLoaded", () => {
    if(process.env["DEBUG"])
        require('preact/devtools')
    render(<div><Header title="Hello!"/>
             <TextField prompt="Hello" floatingLabel={false} value=""/>
             <Button title="Button" onClick={null}/>
           </div>, document.querySelector("#content"))
    document.body.classList.remove("disable-animation");
})