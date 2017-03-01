import { h, Component } from "preact"

export class Toplevel extends Component<void, void> {
    render() {
        return <div id="md-content">
                   <div id="md-layer-content">{this.props.children}</div>
                   <div id="md-layer-menu-mask"/>
                   <div id="md-layer-menu"/>
                   <div id="md-layer-dialog"/>
               </div>
    }
}