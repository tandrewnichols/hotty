import 'idempotent-babel-polyfill';
import io from 'socket.io-client';
import axios from 'redaxios';
const socket = io('/hotty');

let startHead = document.getElementsByTagName('head')[0];
let startBody = document.getElementsByTagName('body')[0];

socket.on('change', async (file) => {
  let url = window.location;
  try {
    let { data } = await axios({
      url,
      method: 'get',
      withCredentials: true,
      headers: {
        accept: 'text/html'
      }
    });
  } catch (e) {
    let headStr = data.split(/<head[^>]+?>/)[1].split('</head>')[0];
    let bodyStr = data.split(/<body[^>]+?>/)[1].split('</body>')[0];

    let head = document.createElement('head');
    head.innerHTML = headStr;

    let body = document.createElement('body');
    body.innerHTML = bodyStr;
  }
});
