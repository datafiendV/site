import {ReactElement, ReactNode, useCallback, useEffect, useState} from 'react';
import {TerminalHistory, TerminalHistoryItem, TerminalPushToHistoryWithDelayProps} from "./types";
import Typed from "react-typed";

export const useTerminal = () => {
  const [terminalRef, setDomNode] = useState<HTMLDivElement>();
  const setTerminalRef = useCallback((node: HTMLDivElement) => setDomNode(node), []);

  const [history, setHistory] = useState<TerminalHistory>([]);

  /**
   * Scroll to the bottom of the terminal when window is resized
   */
  useEffect(() => {
    const windowResizeEvent = () => {
      terminalRef?.scrollTo({
        top: terminalRef?.scrollHeight ?? 99999,
        behavior: 'smooth',
      });
    };
    window.addEventListener('resize', windowResizeEvent);

    const keydownEvent = (event: any) => {
      if (event.key === 'Enter') {
        // Do something when Enter is pressed
        console.log('Enter key pressed');
        terminalRef?.scrollTo({
          top: 999999999999,
        }); 
      }
    };
  
    window.addEventListener('keydown', keydownEvent);

    return () => {
      window.removeEventListener('keydown', windowResizeEvent);
      window.removeEventListener('resize', windowResizeEvent);
    };
  }, [terminalRef]);

  /**
   * Scroll to the bottom of the terminal on every new history item
   */
  useEffect(() => {
    terminalRef?.scrollTo({
      top: terminalRef?.scrollHeight ?? 99999,
      behavior: 'smooth',
    });
  }, [history, terminalRef]);

  function countLetters(str: string): number {
    const letterRegex: RegExp = /[a-zA-Z]/g;
    const letters: string[] | null = str.match(letterRegex);
  
    return letters ? letters.length : 0;
  }

  // TODO - fix doubling up sequential path items as calls to pushtoHistory

  const pushToHistory = useCallback((items: { script: string; className: string; }[], focusInput: any) => {
    console.log('pushToHistory', items, typeof(items) )
    items = items as [any];
    console.log('items', items.length)

    if ( items[0].className == "userResponse" ) {
      let reply = (<>
          <div className="userResponse">{ items[0].script }</div>
        </>)
      setHistory((old) => [ ...old, reply]);
    } else {
      for (var x = 0; x < items.length; x++ ) {
        let item = items[x] as { script: string, className: string};
        let delay = delayCalculator(items, x);
        setTimeout( function () {
          console.log('next ' + x)
          console.log('delay is ', delay)
          console.log(item.script, item.className)
          let props = { 
            script : item.script,
            className : item.className
          };
          let typed = (<>
            <Typed typeSpeed={ 40 } strings={ [item.script ] } className={ item.className } />
          </>)
          setHistory((old) => [...old, typed]);
          focusInput();
        }, delay);
  
  
      } 

    }

  
  }, []);

  const delayCalculator = (items : any[], round : number) => {
    let letterDelay = 80 as number;
    let delay = 0
    for ( let y = 0; y < round; y++ ) {
      let offset = countLetters(items[y].script) * letterDelay;
      console.log('offset for ', round, ' is ', offset)
      delay = delay + offset;
    }
    return delay;
  }

  /**
   * Write text to terminal
   * @param content The text to be printed in the terminal
   * @param delay The delay in ms before the text is printed
   * @param executeBefore The function to be executed before the text is printed
   * @param executeAfter The function to be executed after the text is printed
   */
  const pushToHistoryWithDelay = useCallback(
    (content: ReactElement) =>
      new Promise((resolve) => {
        // setTimeout(() => {
        //   pushToHistory(content);
        //   return resolve(content);
        // }, 100);
        resolve(true)
      }),
    [pushToHistory]
  );

  /**
   * Reset the terminal window
   */
  const resetTerminal = useCallback(() => {
    console.log('reset history ran')
    setHistory([]);
  }, []);

  return {
    history,
    pushToHistory,
    pushToHistoryWithDelay,

    terminalRef,
    setTerminalRef,

    resetTerminal,
  };
};
