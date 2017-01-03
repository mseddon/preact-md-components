import { h, Component, ComponentProps } from "preact";
import "./styles.less";

interface AppBarProps {
    title?: string;
}

export class AppBar extends Component<AppBarProps, any> {
    render() {
        return <header><span class="md-icon-hamburger"/><h1>{this.props.title}</h1></header>
    }
}