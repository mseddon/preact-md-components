import { h, Component, ComponentProps } from "preact";
import "./styles.less";

interface HeaderProps {
    title?: string;
}

export class Header extends Component<HeaderProps, any> {
    render() {
        return <header><span class="md-icon-hamburger"/><h1>{this.props.title}</h1></header>
    }
}