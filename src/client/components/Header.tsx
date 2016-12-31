import { h, Component, ComponentProps } from "preact";
import "./styles.less";

interface HeaderProps {
    title?: string;
}

export class Header extends Component<HeaderProps, any> {
    render() {
        return <header><i class="material-icons">menu</i><h1>{this.props.title}</h1></header>
    }
}