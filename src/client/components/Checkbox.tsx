import { h, Component } from "preact";
import "./styles.less";

export class Checkbox extends Component<{title: string}, any> {
    render() {
        return <label className="md-checkbox is-checked">
                    <input type="checkbox"/>
                    <span className="box"><span className="check"/></span>
                    <span className="label">{this.props.title}</span></label>
    }
}