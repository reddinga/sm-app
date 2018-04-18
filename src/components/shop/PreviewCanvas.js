import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import SMCanvasImage from '../common/SMCanvasImage';
//import { FacebookShareButton, FacebookIcon } from 'react-share';

class PreviewStage extends Component {
  constructor(props) {
    super(props);
    this.downloadURI = this.downloadURI.bind(this);
    this.saveImg = this.saveImg.bind(this);
  }
  downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    //delete link;
  }
  saveImg() {
    let stage = this.refs.stage.getStage();
    var dataURL = stage.toDataURL();
    this.downloadURI(dataURL, 'stage.png');
  }
  render() {
    const preview = this.props.preview;
    console.log(preview);

    if (preview) {
      return (
        <div>
          <button onClick={this.saveImg} />

          {/*           <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="fb-share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton> */}
          <Stage
            ref="stage"
            key={`preview-stage-${preview.id}`}
            width={350}
            height={350}
          >
            <Layer key={`preview-layer-${preview.id}`}>
              <SMCanvasImage
                key={`preview-base-key-${preview.id}`}
                {...preview}
              />
              {preview.opts.map(choices => {
                if (choices.id && choices.src) {
                  return <SMCanvasImage key={choices.id} {...choices} />;
                } else {
                  return null;
                }
              })}
            </Layer>
          </Stage>
        </div>
      );
    }
  }
}

export default PreviewStage;
