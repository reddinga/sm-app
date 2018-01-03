import React, { Component } from 'react';
import Konva from 'konva';
/* debug iphone - connect to usb, start ios debugger:
 C:\Users\aredding.IS\AppData\Roaming\npm\node_modules\remotedebug-ios-webkit-adapter\node_modules
 \vs-libimobile\ios-webkit-debug-proxy-1.8-win64-bin\ios_webkit_debug_proxy.exe
 go to localhost:9223 from chrome, click links. */
/* setting image width and height causes errors on iphone!?!?!?*/
class KonvaImg extends Component {
  renderKonva(container) {
    var stage = new Konva.Stage({
      container: container,
      width: 100,
      height: 100,
    });
    var layer = new Konva.Layer();
    var rect = new Konva.Rect({
      x: 50,
      y: 50,
      width: 100,
      height: 50,
      fill: 'green',
    });
    layer.add(rect);
    stage.add(layer);
  }
  render() {
    return <div ref={ref => this.renderKonva(ref)} />;
  }
}
export default KonvaImg;
