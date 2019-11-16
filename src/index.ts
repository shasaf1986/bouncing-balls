import './index.css';
import * as serviceWorker from './serviceWorker';
import Balls from './balls';


const root = document.getElementById('root')!;
const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 10;
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 10;
const balls = new Balls({
  width,
  height,
  parentElement: root,
});

balls.render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
