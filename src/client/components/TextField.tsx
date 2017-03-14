import { h, Component } from "preact";
import "./styles.less";
require('../theme');

export class TextField extends Component<
    {
        type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url",
        disabled?: boolean,
        placeholder: string, 
        value: string, 
        floatingLabel?: boolean, 
        onInput?: (e: KeyboardEvent) => void, 
        onKeyDown?: (e: KeyboardEvent) => void, 
        onFocus?: (e: FocusEvent) => void, 
        onBlur?: (e: FocusEvent) => void
    }, {focused: boolean, value: string}> {
    constructor(props) {
        super(props);
        props.type = props.type || "text";
        this.setState({ focused: false, value: props.value });
    }

    updateInput = (e: KeyboardEvent) => {
        this.setState({...this.state, value: (e.target as HTMLInputElement).value})
        if(this.props.onInput)
            this.props.onInput(e);
    }

    private setFocus = (e: FocusEvent) => {
        this.setState({...this.state, focused: true});
        if(this.props.onFocus)
            this.props.onFocus(e);
    }

    private clearFocus = (e: FocusEvent) => {
        this.setState({...this.state, focused: false});
        if(this.props.onBlur)
            this.props.onBlur(e);
    }

    componentWillReceiveProps(props) {
        this.setState({...this.state, value: props.value})
    }

    render() {
        return <div class={"md-field "+(this.props.floatingLabel ? "floating-label " : "")+ (this.state.focused ? " is-focused" : "") + (this.state.value !== "" ? " has-content" : "")}>
                 <input disabled={this.props.disabled} type={this.props.type} value={this.state.value} onFocus={this.setFocus} onBlur={this.clearFocus} onInput={this.updateInput} onKeyDown={this.props.onKeyDown} className="text-primary"/>
                 <label className={(this.state.value === "" ? "show-placeholder" : "no-placeholder") + ((this.state.focused || this.state.value !=="") ? " accent-fg": " hint-text")}>{this.props.placeholder}</label>
                 <span className="underline"/><span className="after accent-bg"></span>
               </div>
    }
}