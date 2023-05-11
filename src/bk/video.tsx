import YouTube from 'react-youtube';
import React, { useRef, useEffect } from 'react';

const styles = {
  videoWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    overflow: 'hidden',
  },
};
function BackgroundVideo() {
    const videoOptions = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        loop: 1,
        mute: 1,
        start: 52,
      },
    };

    useEffect(() => {
      const root = document.querySelector('.root');
      if (root) {
        const iframe = root.querySelector('iframe');
        if (iframe) {
          const iframeWindow = iframe.contentWindow;
          if (iframeWindow) { 
            let playerElement = iframeWindow.document.querySelector('#player');
  
            // If the player element is not found, the video is not ready to be played yet.
            if (!playerElement) {
              return;
            }
            const playButton = playerElement.querySelector('.ytp-play-button');
            if (playButton) {
              (playButton as HTMLDivElement).click();
            }
          }
        }
      }
    }, []);

    const videoId = 'n61ULEU7CO0'; // Replace with your desired YouTube video ID
  
    return (
        <YouTube videoId={videoId} opts={videoOptions} className='test'/>
    );
  }

export default BackgroundVideo;