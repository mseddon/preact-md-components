import { h, Component, cloneElement, VNode } from "preact";
import * as Portal from 'preact-portal'
import "./styles.less";
import { globalRect } from "../domutil";
import { RippleBox } from "./RippleBox"
require('../theme');

export class MenuButton extends Component<{iconClass: string, menu: VNode}, { open: boolean }> {
    myElem: HTMLElement;

    myBox = { x: 0, y: 0, width: 0, height: 0}

    constructor(props) {
        super(props);
        this.state = { open: false }
    }

    click = () => {
        this.setState({open: true})
    }


    componentDidMount() {
        this.myBox = globalRect(this.myElem);
        this.myBox.x += this.myBox.width;
        this.myBox.width = 0;
    }

    render() {
        return <div ref={x => this.myElem = x as HTMLElement}class="md-icon-button" aria-role="button" onMouseDown={this.click} onTouchStart={this.click}>
                   <span className={"md-icon md-icon-"+this.props.iconClass}/>
                   <RippleBox extraClasses="ripple-icon"/>
                   {
                       this.state.open ? <Portal into="#md-layer-menu">{cloneElement(this.props.menu, {...this.myBox})}</Portal> : <div/>
                   }
               </div>
    }
}