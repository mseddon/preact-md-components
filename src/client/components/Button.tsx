import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox"
require('../theme');

export class Button extends Component<{disabled?: boolean, onClick: () => void, extraClasses?: string}, {}> {
    render() {
        return <div class={"md-button" + (this.props.extraClasses ? " "+this.props.extraClasses : "")} onClick={() => this.props.disabled ? null : this.props.onClick()}>{ this.props.disabled ? null : <RippleBox/> }
                  <button onClick={() => this.props.disabled ? null : this.props.onClick()} disabled={this.props.disabled} className={"accent-bg"}>{this.props.children}</button>
               </div>
    }
}