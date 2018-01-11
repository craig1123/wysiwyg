import React, { Component } from 'react';
import convertFromRaw from 'draft-js/lib/convertFromRawToDraftState';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

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
          <div>
            <Editor
              defaultContentState={content}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onContentStateChange={this.onContentStateChange}
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
