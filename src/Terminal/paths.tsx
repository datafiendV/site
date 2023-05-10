import {useCallback, useEffect, useState} from 'react';

interface Path {
    response: string;
    question: string;
    parseAnswer: (answer: String) => number;
}

export const paths = [{
    'response' : 'Test0',
    'question' : '0 (allan/abdul)',
    'parseAnswer' : (answer: String)  => { 
        let condition = answer.toLowerCase() == 'allan';
      console.error('FUCK', answer, condition)
      if (condition) {

        return 1; // go to step 1, or path[1]
      } else {

        return 2; // go to step 1, or path[1]
      }

    }
},{
      'response' : 'Allan!',
      'question' : 'Hi (y/n)',
      'parseAnswer' : (answer: String)  => { 
        if (answer.toLowerCase() === 'y') {

          return 1; // go to step 1, or path[1]
        } else {

          return 2; // go to step 1, or path[1]
        }

      }
},{
    'response' : 'Test1',
    'question' : '1 (y/n)',
    'parseAnswer' : (answer: String)  => { 
      if (answer.toLowerCase() === 'y') {

        return 2; // go to step 1, or path[1]
      } else {

        return 0; // go to step 1, or path[1]
      }

    }
},{
    'response' : 'test2',
    'question' : '2 (y/n)',
    'parseAnswer' : (answer: String)  => { 
      if (answer.toLowerCase() === 'y') {

        return 0; // go to step 1, or path[1]
      } else {

        return 2; // go to step 1, or path[1]
      }

    }
}]