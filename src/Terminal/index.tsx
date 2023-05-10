import './terminal.css';
import {ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {TerminalProps} from "./types";
import {useTerminal} from "./hooks";
import { paths } from "./paths";


export const Terminal = forwardRef(
  (props: TerminalProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      history,
      pushToHistory,
      setTerminalRef,
      resetTerminal,
    } = useTerminal();

    const {
      promptLabel = '>',

      commands = {},
    } = props;

    const inputRef = useRef<HTMLInputElement>();
    const [input, setInputValue] = useState<string>('');
    const [pathIndex, setIndexValue] = useState<number>(0);

    /**
     * Focus on the input whenever we render the terminal or click in the terminal
     */
    useEffect(() => {

      inputRef.current?.focus();

    });

    const focusInput = useCallback(() => {
      inputRef.current?.focus();
    }, []);


    /**
     * When user types something, we update the input value
     */
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      },
      []
    );

    // const handleInput = async (commands, input) => { 
    //   const commandToExecute = commands?.[input.toLowerCase()];
    //   if (commandToExecute) {
    //     commandToExecute?.();
    //   }
    //   setInputValue('');
    // }
    /**
     * When user presses enter, we execute the command
     */
    const handleInputKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          // useTerminal.pushtoHistory
          pushToHistory(
          <>
            <div className="userResponse">{ input }</div>
          </>
          );
          // handle path here
          console.log('paths are ', paths, paths[0]);
          console.log('pathIndex is ', pathIndex);
          setIndexValue(paths[pathIndex].parseAnswer(input))
          console.log('pathIndex is ', pathIndex)
          setInputValue('');
          pushToHistory(
            generatePathBlock(pathIndex)
          );

        }
      },
      [commands, input]
    );

    const generatePathBlock = (pathIndex: any) => {
      return (
        <>
          <div className="pathBlock">
            <div className="pathBlock__response">{ paths[pathIndex].response }</div>
            <div className="pathBlock__question">{ paths[pathIndex].question }</div>
          </div>
        </>
      )

    }

    return (
      
    <div className="terminal" ref={ref} onClick={focusInput}>
      <div className="terminal_bg"></div>
      <div className="terminal__line">{ generatePathBlock(0) }</div>
      {history.map((line, index) => (
        <div className="terminal__line" key={`terminal-line-${index}-${line}`}>
          {line}
        </div>
      ))}
      <div className="terminal__prompt">
        <div className="terminal__prompt__label">{promptLabel}</div>
        <div className="terminal__prompt__input">
          <input
            type="text"
            value={input}
            onKeyDown={handleInputKeyDown}
            onChange={handleInputChange}
            // @ts-ignore
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
});