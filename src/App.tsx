import React, { FC, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import Example from './dnd'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import {Row, Col} from 'antd';

const App: FC = () => {
  const options = {
    selectOnLineNumbers: true,
    renderSideBySide: false
  };
  const [code, setCode] = useState('');
  const changeCode = (newValue: string) => {
    console.log('newValue ===', newValue);
    setCode(newValue);
  };
  const editorDidMount = (editor: any) => {
    editor.focus();
  };
  return (
    <Row gutter={16}>
      <Col span="12">
        <MonacoEditor
          width="400px"
          height="900px"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={changeCode}
          editorDidMount={editorDidMount}
        />
      </Col>
      <Col span="12">
        <DndProvider backend={Backend}>
          <Example />
        </DndProvider>
      </Col>
    </Row>
  );
};

export default App;
