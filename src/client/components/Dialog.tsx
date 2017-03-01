import { h, Component, VNode, cloneElement } from "preact"
import * as Portal from 'preact-portal'
import "./styles.less";
require('../theme');


export class Dialog extends Component<{title?: string, buttons?: VNode[], modal?:boolean, show: boolean, onclose?: () => void }, undefined> {   
    render() {
        return <div>
            {this.props.show ? [
                <Portal into="#md-layer-dialog"><div className="md-dialog-center"><div className="md-dialog"><h1>{this.props.title}</h1><div className="md-dialog-content">{this.props.children}</div><div className="right-icons">{this.props.buttons}</div></div></div></Portal>,
                <Portal into="body"><div className="md-blackout" onClick={() => {if(!this.props.modal && this.props.onclose)this.props.onclose();}}></div></Portal>] : []
            }      
        </div>  
    }
}