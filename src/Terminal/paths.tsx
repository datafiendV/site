import {useCallback, useEffect, useState} from 'react';

interface Path {
    response: string;
    question: string;
    parseAnswer: (answer: String) => number;
}

export const paths = [{
    'response' : 'How much data do you need? <Type Response, press Enter, then Click to Continue>',
    'question' : 'Lots / Little',
    'parseAnswer' : (answer: String)  => { 
      let condition = answer.toLowerCase() === 'lots';
      if (condition) {
        return 1;
      } else {
        return 2;
      }
    }
},{
      'response' : 'Do you need realtime streaming data?',
      'question' : 'Hi (y/n)',
      'parseAnswer' : (answer: String)  => { 
        if (answer.toLowerCase() === 'y') {
          return 1; // go to step 1, or path[1]
        } else {
          return 2; // go to step 1, or path[1]
        }

      }
},{
    'response' : 'Do you have a vision for your data objective?',
    'question' : 'y / n',
    'parseAnswer' : (answer: String)  => { 
      if (answer.toLowerCase() === 'y') {

        return 4; // go to step 1, or path[1]
      } else {

        return 0; // go to step 1, or path[1]
      }

    }
},{
    'response' : 'Data Objectives: The Market Purpose of Data',
    'question' : 'read more / decline',
    'parseAnswer' : (answer: String)  => { 
      if (answer.toLowerCase() === 'y') {

        return 0; // go to step 1, or path[1]
      } else {

        return 2; // go to step 1, or path[1]
      }

    }
}]