import { h, render } from "preact";
import { createStore, combineReducers, Store } from 'redux';
import { AppBar } from "./components/AppBar"
import { TextField } from "./components/TextField"
import { Button } from "./components/Button"
import { Checkbox } from "./components/Checkbox"
import { Switch } from "./components/Switch"
import { RadioButton } from "./components/RadioButton"
import { ProgressBar } from "./components/ProgressBar"
import { Spinner } from "./components/Spinner"
import { Slider } from "./components/Slider"
import * as theme from "./theme";
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
             <p><Button title="Button" onClick={null}/></p>
             <p><Checkbox title="Wee"/></p>
             <p><Switch title="Wee" checked={true}/></p>
             <p><RadioButton name="buttons" title="Radio 1" value="1"/></p>
             <p><RadioButton name="buttons" title="Radio 2" value="2"/></p>
             <p>indeterminate</p>
             <p><ProgressBar progress={50} buffer={80} indeterminate={true}/></p>
             <p>normal</p>
             <p><ProgressBar progress={50} /></p>
             <p>buffering</p>
             <p><ProgressBar progress={50} buffer={80} /></p>
             <p><Spinner/></p>
             <p><Slider min={0} max={100} value={50}/></p>
           </div>, document.querySelector("#content"))
    document.body.classList.remove("disable-animation");
})