import PubSub from 'pubsub-js'
import {generateRandomNum} from './utils.js'
import iziToast from 'izitoast'

// Subscription Function 1
//   - subscription receives 2 arguments: the event name, and data

const popAlert = function (evtName, dataObj) {
  iziToast.show({
    title: `EVENT: ${evtName}`,
    message: dataObj.msg,
    timeout: 30000,
    position: 'topRight'
  });
};

const logToConsole = function(evtName, dataObj){
  console.log('Message: ');
  console.log(` > ${dataObj.msg}`);
  console.log('---------------------------');
}

const renderUserImgToPage = function(evtName, dataObj){
  document
    .getElementById('root')
    .innerHTML = `<img src="https://randomuser.me/api/portraits/men/${dataObj.info}.jpg">`
}


// Part 2 - Subscriber Events + Functions

PubSub.subscribe('init', popAlert);
PubSub.subscribe('init', logToConsole);

PubSub.subscribe('render-user', popAlert);
PubSub.subscribe('render-user', renderUserImgToPage);


// Part 3 - Execution Code
//          Publish Events and subscriber functions

PubSub.publish('init', {msg: 'Initializing application'} )

setTimeout(()=>{
  let randomNum = generateRandomNum(1,100)
  PubSub.publish('render-user', {msg: 'generating user', info: randomNum } )
}, 3000)
