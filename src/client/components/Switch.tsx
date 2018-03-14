import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox";
require('../theme');

export class Switch extends Component<{title: string, checked?: boolean, onchange?: (boolean) => void}, {checked: boolean}> {
    elem: HTMLInputElement

    constructor(props) {
        super();
    }

    componentWillReceiveProps(props) {
        this.setState({checked: props.checked});
    }

    updateCheck = () => {
        this.setState({...this.state, checked: this.elem.checked});
        this.props.onchange && this.props.onchange(this.elem.checked);
    }

    render() {
        return <label className={"md-switch" + (this.state.checked ? " is-checked" : "")}>
                    <input ref={e => this.elem = e as HTMLInputElement} type="checkbox" checked={this.state.checked} onChange={this.updateCheck}/>
                    <span className={"track" + (this.state.checked ? " accent-bg" : " switch-track-off")}/>
                    <span className={"thumb" + (this.state.checked ? " accent-bg": "  switch-thumb-off")}><RippleBox extraClasses="point-ripple" rippleClass="accent-bg"/></span>
                    <span className="label secondary-text">{this.props.title}</span></label>
    }
}