import { h, Component, VNode } from "preact";
import "./styles.less";
require('../theme');

export class AppBar extends Component<{title?: string, leftButton: VNode, rightButtons?: VNode[]}, any> {
    render() {
        return <header className="md-app-bar primary-bg">
                   <div className="left-icons">{this.props.leftButton}</div>
                   <h1>{this.props.title}</h1>
                   <div className="right-icons">{this.props.rightButtons}</div>
               </header>
    }
}