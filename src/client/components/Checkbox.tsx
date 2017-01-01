import { h, Component } from "preact";
import "./styles.less";

export class Checkbox extends Component<{title: string}, any> {
    render() {
        return <label><input type="checkbox"/>{this.props.title}</label>
    }
}