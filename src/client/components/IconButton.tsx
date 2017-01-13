import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox"
require('../theme');

export class IconButton extends Component<{onClick?: () => void}, {}> {
    click = () => {
        if(this.props.onClick)
            this.props.onClick();
    }
    render() {
        return <div class="md-icon-button" aria-role="button" onMouseDown={this.click} onTouchStart={this.click}>{this.props.children}<RippleBox extraClasses="ripple-icon"/></div>
    }
}