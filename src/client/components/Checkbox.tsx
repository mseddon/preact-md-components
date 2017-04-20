import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox";
require('../theme');

export class Checkbox extends Component<{title: string, checked?: boolean, onChange?: () => any}, {checked: boolean}> {
    elem: HTMLInputElement

    constructor(props) {
        super();
        this.state = {checked: props.checked};
    }

    componentWillReceiveProps(props: {title: string, checked?: boolean}) {
        this.setState({...this.state, checked: props.checked})
    }

    updateCheck = () => {
        this.setState({...this.state, checked: this.elem.checked})
        if(this.props.onChange)
            this.props.onChange();
    }

    render() {
        return <label className={"md-checkbox" + (this.state.checked ? " is-checked" : "")}>
                    <input ref={e => this.elem = e as HTMLInputElement} type="checkbox" checked={this.state.checked} onChange={this.updateCheck}/>
                    <i className={"material-icons check-item" + (this.state.checked ? " accent-fg" : " secondary-text")}>{this.state.checked ? "check_box" : "check_box_outline_blank"}</i>
                    <span className="label secondary-text">{this.props.title}</span>
                    <RippleBox extraClasses="point-ripple" rippleClass="accent-bg" /></label>
    }
}