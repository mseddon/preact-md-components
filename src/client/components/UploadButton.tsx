import { h, Component, cloneElement, VNode } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox"
require('../theme');


export interface UploadButtonProps {
    handleFiles?: (files: FileList) => void;
}

export class UploadButton extends Component<UploadButtonProps, void> {
    onChange = (e) => {
        const input = (this.base.querySelector("input[type='file']") as HTMLInputElement)
        if(this.props.handleFiles)this.props.handleFiles(input.files)
    }
    openFileSystem = (e: MouseEvent) =>
        (this.base.querySelector("input[type='file']") as HTMLElement).click();
    
    render(props) {
        return  <div onClick={this.openFileSystem}>
                    <input type="file" onChange={this.onChange} style="display: none;"/>
                    {this.props.children}
                    <RippleBox extraClasses="ripple-icon"/>
                </div>               
    }
}
