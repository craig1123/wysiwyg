import React, { Component } from 'react';
import convertFromRaw from 'draft-js/lib/convertFromRawToDraftState';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { imgurKey } from './keys';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', imgurKey);
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
}

const toolbar = {
    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'colorPicker', 'history'],
    inline: { inDropdown: true },
    link: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    history: { inDropdown: true },
    image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true }, previewImage: true },
};

const width = { width: '100%' };

export default class EditorConvertToJSON extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    }
  }

  onContentStateChange = (contentState) => {
    this.setState({ contentState });
  };

  render() {
    const { contentState } = this.state;
    const html = draftToHtml(contentState);
    return (
      <div className="demo-section">
        <div className="demo-section-wrapper">
          <div style={width}>
            <Editor
              spellCheck
              defaultContentState={content}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onContentStateChange={this.onContentStateChange}
              toolbar={toolbar}
            />
            <textarea
              disabled
              className="demo-content no-focus"
              value={JSON.stringify(contentState, null, 4)}
            />
          </div>
        </div>
        <div className="demo-results" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
}
