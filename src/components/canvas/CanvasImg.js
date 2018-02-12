import React, { Component } from 'react';

import { Image } from 'react-konva';
/* debug iphone - connect to usb, start ios debugger:
 C:\Users\aredding.IS\AppData\Roaming\npm\node_modules\remotedebug-ios-webkit-adapter\node_modules
 \vs-libimobile\ios-webkit-debug-proxy-1.8-win64-bin\ios_webkit_debug_proxy.exe
 go to localhost:9223 from chrome, click links. */
/* setting image width and height causes errors on iphone!?!?!?*/

class CanvasImg extends Component {
  state = {
    image: new window.Image(),
  };
  componentDidMount() {
    this.state.image.src = this.props.src;
    this.state.image.onload = () => {
      // calling set state here will do nothing
      // because properties of Konva.Image are not changed
      // so we need to update layer manually
      this.imageNode.getLayer().batchDraw();
    };
  }

  render() {
    return (
      <Image
        image={this.state.image}
        {...this.props}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}
export default CanvasImg;
