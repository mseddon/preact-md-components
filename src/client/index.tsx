import { h, render } from "preact";
import { createStore, combineReducers, Store } from 'redux';
import { AppBar } from "./components/AppBar"
import { TextField } from "./components/TextField"
import { Toplevel } from "./components/Toplevel"
import { Button } from "./components/Button"
import { IconButton } from "./components/IconButton"
import { MenuButton } from "./components/MenuButton"
import { Checkbox } from "./components/Checkbox"
import { Switch } from "./components/Switch"
import { RadioButton } from "./components/RadioButton"
import { ProgressBar } from "./components/ProgressBar"
import { Spinner } from "./components/Spinner"
import { Slider } from "./components/Slider"
import { TabStrip } from "./components/Tabs"
import { Menu, MenuItem, MenuSeparator } from "./components/Menu"
import { waitForFonts } from "./domutil";
import * as theme from "./theme";

function makeStore(reducer) {
    if(process.env["DEBUG"])
        return createStore(reducer, window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]());
    else
        return createStore(reducer);
}

waitForFonts(["Roboto"], () => {
    if(process.env["DEBUG"])
        require('preact/devtools')

    let menu = <Menu>
                    <MenuItem label="New" action={() => console.log("NEW!")}/>
                    <MenuItem label="Open..."/>
                    <MenuSeparator/>
                    <MenuItem label="Close"/>
                    <MenuItem label="Save"/>
                    <MenuItem label="Save As..."/>
                    <MenuSeparator/>
                    <MenuItem label="Sign Out"/>
                </Menu>


    render(<Toplevel>
                <AppBar title="Hello!" leftButton={<IconButton iconClass="hamburger"/>} rightButtons={[<MenuButton iconClass="more-vert" menu={menu}/>]}/>
                <p><TabStrip tabs={[
                {id: "1", title: "Buttons", component:
                    <div>
                        <p><Button title="Button" onClick={null}/></p>
                        <p><Checkbox title="Wee"/></p>
                        <p><Switch title="Wee" checked={true}/></p>
                        <p><RadioButton name="buttons" title="Radio 1" value="1"/></p>
                        <p><RadioButton name="buttons" title="Radio 2" value="2"/></p>
                    </div>},
                {id: "2", title: "Load", component: 
                    <div>
                        <p>indeterminate</p>
                        <p><ProgressBar progress={50} buffer={80} indeterminate={true}/></p>
                        <p>normal</p>
                        <p><ProgressBar progress={50} /></p>
                        <p>buffering</p>
                        <p><ProgressBar progress={50} buffer={80} /></p>
                        <p><Spinner/></p>
                    </div>},
                {id: "3", title: "Suck it", component:
                    <div>
                        <TextField prompt="Hello" floatingLabel={true} value=""/>
                        <p><Slider min={0} max={100} value={50}/></p>
                    </div>}
                ]} active="2"/></p>
        </Toplevel>, document.querySelector("#content"))
    document.body.classList.remove("disable-animation");
}, () => {
    console.error("Oh dear");
});