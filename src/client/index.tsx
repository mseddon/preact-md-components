import { h, render } from "preact";
import { AppBar } from "./components/AppBar"
import { TextField } from "./components/TextField"
import { Toplevel } from "./components/Toplevel"
import { Button } from "./components/Button"
import { Label } from "./components/Label"
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
import { Dialog } from "./components/Dialog"
import { SplitPane } from "./components/SplitPane"
import { waitForFonts } from "./domutil";
import * as theme from "./theme";

waitForFonts(["Roboto", 'Material Icons'], () => {
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
                <div style={{display: "flex", flexDirection: "column", position: "fixed", top: "0", left: "0", width: "100%", height: "100%"}}> 
                <div style={{flexGrow: "0"}}>
                    <AppBar title="Hello!" leftButton={<IconButton><i className="material-icons">menu</i></IconButton>} rightButtons={[<MenuButton menu={menu}><i className="material-icons">more_vert</i></MenuButton>]}/>
                </div>
                <div style={{flexGrow: "1", position: "relative"}}><TabStrip tabs={[
                {id: "1", title: <label>Stuff</label>, component:
                    <div>
                        <p><Button type="fab" onClick={() => console.log("HR")}><i className="material-icons">menu</i></Button></p>
                        <p><Checkbox title="Wee"/></p>
                        <p><Switch title="Wee" checked={true}/></p>
                        <p><RadioButton name="buttons" title="Radio 1" value="1" checked={true} /></p>
                        <p><RadioButton name="buttons" title="Radio 2" value="2"/></p>
                        <TextField placeholder="Hello" floatingLabel={true} value=""/>
                        <Dialog title="Dialog" show={false} buttons={[<Button type="flat" onClick={() => console.log("HR")}>Cancel</Button>,<Button type="flat" onClick={() => console.log("HR")}>Ok</Button>]}>
                            <p>Funky muppet</p>
                        </Dialog>
                        <p><Button onClick={() => console.log("close")}>Dialog</Button></p>
                        <p><Slider min={0} max={100} value={50}/></p>
                    </div>},
                {id: "2", title: <label>Load</label>, component: 
                    <div>
                        <p><Label>indeterminate</Label></p>
                        <p><ProgressBar progress={50} buffer={80} indeterminate={true}/></p>
                        <p><Label>normal</Label></p>
                        <p><ProgressBar progress={50} /></p>
                        <p><Label>buffering</Label></p>
                        <p><ProgressBar progress={50} buffer={80} /></p>
                        <p><Spinner/></p>
                    </div>},
                {id: "3", title: <label>Split</label>, component:
                    <SplitPane first={<div style={{backgroundColor: "#0f0", position: "absolute", width: "100%", height: "100%"}}/>} second={<div style={{backgroundColor: "#f00", position: "absolute", width: "100%", height: "100%"}}/>} axis="horizontal"/>}
                ]} active="2"/></div>
            </div>
        </Toplevel>, document.querySelector("#content"))
    document.body.classList.remove("disable-animation");
}, () => {
    console.error("Oh dear");
});