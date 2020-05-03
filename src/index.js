import React from 'react';
import ReactDOM from 'react-dom';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'spectacle-codemirror/lib/spectacle-codemirror.css';
import SpectacleCodemirror from 'spectacle-codemirror';

import { useState } from 'react';
import useNodeRunner from 'use-node-runner';

import Terminal from 'spectacle-output-terminal';
import { Deck, FlexBox, Slide } from 'spectacle';

const Presentation = () => {
  const [code, setCode] = useState(``);
  const { setRunnerCode, response, isRunning } = useNodeRunner(
    'ws://localhost:4000'
  );

  function runCode() {
    setRunnerCode(code);
  }

  function stopCode() {
    setRunnerCode(`EXIT`);
  }

  function updateCode(newCode) {
    setCode(newCode);
  }

  const options = {
    lineNumbers: true,
    mode: 'javascript',
  };

  return (
    <Deck transitionEffect="fade">
      <Slide>
        <SpectacleCodemirror
          value={code}
          onChange={updateCode}
          options={options}
        />

        <Terminal
          onRun={runCode}
          onStop={stopCode}
          codeRunning={isRunning}
          content={response}
        />
      </Slide>
    </Deck>
  );
};

ReactDOM.render(<Presentation />, document.getElementById('root'));
