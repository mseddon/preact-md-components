import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox"
require('../theme');

export class Button extends Component<{title: string, onClick: () => void}, {}> {
    render() {
        return <div class="md-button"><button className="primary-bg">{this.props.title}</button><RippleBox/></div>
    }
}