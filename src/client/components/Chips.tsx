import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox"
require('../theme');

export class Chip extends Component<{icon?: string, img?: string, label: string, onDelete?: () => void, onClick?: () => void, extraClasses?: string}, {}> {
    render() {
        return <div class={"md-chip" + (this.props.extraClasses ? " "+this.props.extraClasses : "")} onClick={this.props.onClick}>
                    <RippleBox rippleClass="dark-ripple" /> 
                    {this.props.img ? <img src={this.props.img} alt="avatar" />
                    : this.props.icon ?
                    <i className={this.props.icon} />
                    : null}
                    <span>{this.props.label}</span>
                    {this.props.onDelete ? <i className="material-icons delete" onClick={this.props.onDelete}>cancel</i> : null}
               </div>
    }
}