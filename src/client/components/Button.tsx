import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox"
require('../theme');

export class Button extends Component<{disabled?: boolean, type?: "accent" | "flat" | "fab", onClick: (e?: MouseEvent) => void, extraClasses?: string}, {}> {
    render() {
        return <div class={"md-button" + (this.props.extraClasses ? " "+this.props.extraClasses : "")} onClick={(e:MouseEvent) => this.props.disabled ? null : this.props.onClick(e)}>{ this.props.disabled ? null : <RippleBox rippleClass={(this.props.type && this.props.type == "flat") ? "dark-ripple": ""}/> }
                  <button onTouchStart={(e: TouchEvent) => this.props.disabled ? null : (e.preventDefault(), this.props.onClick()) } onClick={(e:MouseEvent) => this.props.disabled ? null : this.props.onClick(e)} disabled={this.props.disabled} className={(this.props.type && this.props.type == "flat") ? "accent-fg" : "accent-bg" +(this.props.type == "fab" ? " fab": "")}>{this.props.children}</button>
               </div>
    }
}