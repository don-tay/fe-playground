const soundElemNodes = document.querySelectorAll('audio');

soundElemNodes.forEach(soundElem => {
  const btn = document.createElement('button');
  btn.classList.add('btn');

  btn.innerText = soundElem.id;

  btn.addEventListener('click', () => {
    stopPlayingSounds();

    soundElem.play();
  });

  document.getElementById('buttons').appendChild(btn);
});

function stopPlayingSounds() {
  soundElemNodes.forEach(soundElem => {
    soundElem.pause();
    soundElem.currentTime = 0;
  });
}
