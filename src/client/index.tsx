import { h, render } from "preact";
import { createStore, combineReducers, Store } from 'redux';
import { AppBar } from "./components/AppBar"
import { TextField } from "./components/TextField"
import { Button } from "./components/Button"
import { Checkbox } from "./components/Checkbox"
import { Switch } from "./components/Switch"
import { RadioButton } from "./components/RadioButton"

function makeStore(reducer) {
    if(process.env["DEBUG"])
        return createStore(reducer, window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]());
    else
        return createStore(reducer);
}


document.addEventListener("DOMContentLoaded", () => {
    if(process.env["DEBUG"])
        require('preact/devtools')
    render(<div><AppBar title="Hello!"/>
             <TextField prompt="Hello" floatingLabel={true} value=""/>
             <Button title="Button" onClick={null}/>
             <Checkbox title="Wee"/>
             <Switch title="Wee"/>
             <RadioButton name="buttons" title="Radio 1" value="1"/>
             <RadioButton name="buttons" title="Radio 2" value="2"/>
           </div>, document.querySelector("#content"))
    document.body.classList.remove("disable-animation");
})