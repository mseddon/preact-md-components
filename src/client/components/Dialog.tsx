import { h, Component, VNode } from "preact"
import "./styles.less";
require('../theme');


export class Dialog extends Component<{title?: string, buttons?: VNode[], modal?:boolean, show: boolean, onclose?: () => void }, undefined> {   
    render() {
        if(this.props.show)
            return <div className="md-blackout" onClick={() => {if(!this.props.modal && this.props.onclose)this.props.onclose();}}>
                    <div className="md-dialog">                  
                        <h1>{this.props.title}</h1>
                        <div className="md-dialog-content">{this.props.children}</div>
                        <div className="right-icons">{this.props.buttons}</div>
                    </div>
               </div> 
        else return <div style="display: none;" />             
    }
}