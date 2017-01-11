import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox"
require('../theme');

export class Button extends Component<{disabled?: boolean, onClick: () => void}, {}> {
    render() {
        return <div class="md-button"><button onClick={this.props.onClick} disabled={this.props.disabled} className="primary-bg">{this.props.children}{ this.props.disabled ? null : <RippleBox/> }</button></div>
    }
}