import {useCallback, useEffect, useState} from 'react';

interface Path {
    response: string;
    question: string;
    parseAnswer: (answer: String) => number;
}

export const paths = [{
    'response' : 'Thanks for stopping by...',
    'question' : 'Have you heard of DataFiend? \r\n(y / n)',
    'parseAnswer' : (answer: String)  => { 
      let condition = answer.toLowerCase() === 'y';
      if (condition) {
        return 1;
      } else {
        return 1;
      }
    }
},{
    'response' : "The first rule of DataFiend is: \r\nWe don't talk about DataFiend.",
    'question' : 'Have you heard of DataFiend (y/n)\r\n* Enter referral code here.',
    'parseAnswer' : (answer: String)  => { 
      if ( answer.includes('XtX') ) {
        return 5;
      }
      if ( answer.toLowerCase() === 'y' ) {
        return 1; 
      } else {
        return 2;
      }

    }
},{
  'response' : `We are a community of thousands. \r\nWe provide aggregate anonymized data from social networks, gated content, and large-scale crawling.\r\nTL;DR - We are Google, and we are no one.`,
  'question' : `Is there any data you could use some help gathering? \r\nIt's often free, and we have a lot already :) \r\n(y / n)`,
  'parseAnswer' : (answer: String)  => { 
    if (answer.toLowerCase() === 'y') {

      return 3; // go to step 1, or path[1]
    } else {

      return 4; // go to step 1, or path[1]
    }

  }
},{
  'response' : 'Awesome - we can definitely help.\r\n',
  'question' : 'You can send a detailed summary of what you need to datafiend@protonmail.com, or enter your email here:',
  'parseAnswer' : (answer: String)  => { 
    if (answer.toLowerCase() === '') {

      return 3; // go to step 1, or path[1]
    } else {

      return 4; // go to step 1, or path[1]
    }

  }
},{
  'response' : 'Thanks, someone will contact you.\r\n',
  'question' : 'Invite a friend with code ' + 'XtX_' + (Math.random() * 0xfffff * 1000000).toString(16),
  'parseAnswer' : (answer: String)  => {  
    if (answer.toLowerCase() === '') {
      
      return 0; // go to step 1, or path[1]
    } else {

      return 2; // go to step 1, or path[1]
    }

  }
},{
  'response' : 'Thanks - your friend will receive some crawler credits :) \r\n',
  'question' : 'Return to flow? (y / n)',
  'parseAnswer' : (answer: String)  => {  
    if (answer.toLowerCase() === 'y') {
      
      return 2; // go to step 1, or path[1]
    } else {

      return 4; // go to step 1, or path[1]
    }

  }
}]