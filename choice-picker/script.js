const tagsElem = document.getElementById('tags');
const textarea = document.getElementById('textarea');

textarea.focus();

textarea.addEventListener('keyup', e => {
  createTags(e.target.value);

  // execute random select of tags when 'Enter' key is hit
  if (e.key === 'Enter') {
    // clear textarea input when hit 'Enter' key
    setTimeout(() => {
      e.target.value = '';
    }, 10);
    randomSelect();
  }
});

/**
 * Create tags from input string
 * @param {string} input
 */
function createTags(input) {
  const tagsText = input
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag !== '');

  tagsElem.innerHTML = '';

  tagsText.forEach(tagText => {
    const tagElem = document.createElement('span');
    tagElem.classList.add('tag');
    tagElem.innerText = tagText;
    tagsElem.appendChild(tagElem);
  });
}

function randomSelect() {
  const INTERVAL_DURATION = 80;
  const INTERVAL_TIMES = 40;

  // set random choosing effect
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);
    setTimeout(() => {
      unHighlightTag(randomTag);
    }, INTERVAL_DURATION);
  }, INTERVAL_DURATION);

  // terminate random choosing effect after INTERVAL_TIMES times and pick 1 tag
  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
    }, INTERVAL_DURATION);
  }, INTERVAL_TIMES * INTERVAL_DURATION);
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  const randIdx = Math.floor(Math.random() * tags.length);
  return tags[randIdx];
}

function highlightTag(tag) {
  tag.classList.add('highlight');
}

function unHighlightTag(tag) {
  tag.classList.remove('highlight');
}
