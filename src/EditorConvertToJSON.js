import React, { Component } from 'react';
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class EditorConvertToJSON extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    }
  }

  onContentStateChange: Function = (contentState) => {
    this.setState({
      contentState,
    });
  };

  render() {
    const { contentState } = this.state;
    return (
      <div className="demo-section">
        <h3>2. Uncontrolled editor component with conversion of content from and to JSON (RawDraftContentState)</h3>
        <div className="demo-section-wrapper">
          <div className="demo-editor-wrapper">
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
      </div>
    );
  }
}
