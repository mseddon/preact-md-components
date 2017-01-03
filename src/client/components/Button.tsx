import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox"

export class Button extends Component<{title: string, onClick: () => void}, {}> {
    render() {
        return <div class="md-button"><button>{this.props.title}</button><RippleBox/></div>
    }
}