import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox";

export class Checkbox extends Component<{title: string}, {checked: boolean}> {
    elem: HTMLInputElement

    updateCheck = () => {
        this.setState({...this.state, checked: this.elem.checked})
    }

    render() {
        return <label className={"md-checkbox" + (this.state.checked ? " is-checked" : "")}>
                    <input ref={e => this.elem = e as HTMLInputElement} type="checkbox" onChange={this.updateCheck}/>
                    <span className="box"><span className="check"/></span>
                    <span className="label">{this.props.title}</span>
                    <RippleBox extraClasses="point-ripple invert-primary" /></label>
    }
}