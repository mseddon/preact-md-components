import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox"
require('../theme');

export class IconButton extends Component<{iconClass: string, onClick?: () => void}, {}> {
    click = () => {
        if(this.props.onClick)
            this.props.onClick();
    }
    render() {
        return <div class="md-icon-button" aria-role="button" onMouseDown={this.click} onTouchStart={this.click}><span className={"md-icon md-icon-"+this.props.iconClass}/><RippleBox extraClasses="ripple-icon"/></div>
    }
}