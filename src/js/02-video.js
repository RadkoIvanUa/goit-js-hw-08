import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  localStorage.setItem(TIME_KEY, JSON.stringify(data));
}

let timeData = JSON.parse(localStorage.getItem(TIME_KEY)) ?? { seconds: 0 };
player.setCurrentTime(timeData.seconds);

// let secondsForPlayer = JSON.parse(localStorage.getItem(TIME_KEY)).seconds ?? 0;
// player.setCurrentTime(secondsForPlayer);  
