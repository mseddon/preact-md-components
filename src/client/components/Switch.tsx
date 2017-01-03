import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox";

export class Switch extends Component<{title: string}, {checked: boolean}> {
    elem: HTMLInputElement

    updateCheck = () => {
        this.setState({...this.state, checked: this.elem.checked})
    }

    render() {
        return <label className={"md-switch" + (this.state.checked ? " is-checked" : "")}>
                    <input ref={e => this.elem = e as HTMLInputElement} type="checkbox" onChange={this.updateCheck}/>
                    <span className="track"/>
                    <span className="thumb"><RippleBox extraClasses="point-ripple invert-primary" /></span>
                    <span className="label">{this.props.title}</span></label>
    }
}