import { h, Component, ComponentProps } from "preact";
import "./styles.less";
require('../theme');

export class AppBar extends Component<{title?: string}, any> {
    render() {
        return <header className="md-app-bar primary-bg"><span className="md-icon-hamburger"/><h1>{this.props.title}</h1></header>
    }
}