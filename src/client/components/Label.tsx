import { h, Component } from "preact"

export class Label extends Component<any, void> {
    render() {
        return <label className="md-label secondary-text">{this.props.children}</label>
    }
}