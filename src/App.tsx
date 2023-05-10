import React, {useEffect, useMemo} from 'react';
import {Terminal} from "./Terminal";
import {useTerminal} from "./Terminal/hooks";

function App() {
  const {
    history,
    pushToHistory,
    setTerminalRef,
    resetTerminal,
  } = useTerminal();


  useEffect(() => {
    console.error('didrun')
    resetTerminal();

    pushToHistory(<>
        <div><strong>DataFiend 0.02 </strong>is a loosely responsive data retrieval network.</div>
        <div><br/>Say "hi" to get started :)</div>
        </>
    );
  }, []);

  // TODO - send "pst - I have access to over 400 APIs, most of which are free for me to use." in orange


  
  const commands = useMemo(() => ({
    'hi': async () => {
      await pushToHistory(<>
          <div>
            <strong className="datafeind">Hi! Where are you?</strong>
          </div>
        </>);

      //  try to ping the user's location and wait to see if they agree or not
      if ("geolocation" in navigator) {
        console.log("Available");
        // request navigator to get location

        // TODO - add a timer to send run the next bit after 1 second if the user hasn't responded

        setTimeout(async () => {
          navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position);
            await pushToHistory(<>
                <div>
                  <strong className="client">Thanks! I'm in {position.coords.latitude}, {position.coords.longitude}</strong>
                </div>
              </>); 
          });
        }, 1000);
      } else {
        console.log("Not Available");
      }
    },
    'alert': async () => {
      alert('Hello!');
      await pushToHistory(<>
          <div>
            <strong>Alert</strong>
            <span style={{color: 'orange', marginLeft: 10}}>
              <strong>Shown in the browser</strong>
            </span>
          </div>
        </>);
    },
  }), [pushToHistory]);

  return (
    <div className="App">
      <Terminal
        history={history}
        ref={setTerminalRef}
        promptLabel={<>$</>}
        commands={commands}
      />
    </div>
  );
}

export default App;
