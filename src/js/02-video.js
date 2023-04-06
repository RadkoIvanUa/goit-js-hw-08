import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  localStorage.setItem(TIME_KEY, JSON.stringify(data));
}

const seconds = JSON.parse(localStorage.getItem(TIME_KEY)).seconds;

player.setCurrentTime(seconds);
