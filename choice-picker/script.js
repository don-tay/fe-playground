const tagsElem = document.getElementById('tags');
const textarea = document.getElementById('textarea');
const ctaBtn = document.getElementById('cta-btn');
const clearBtn = document.getElementById('clear-btn');
const errorSpan = document.getElementById('error-msg');

let errorMsgs = [];
let tagCount = 0;

textarea.focus();

ctaBtn.addEventListener('click', () => {
  clearError();
  // create tags from input
  createTags(textarea.value);
  showError();
  randomSelect();
});

clearBtn.addEventListener('click', () => {
  tagsElem.innerHTML = '';
  textarea.value = '';
  textarea.focus();
  clearError();
  tagCount = 0;
});

/**
 * Create tags from input string
 * @param {string} input
 */
function createTags(input) {
  // input should be tuples of (choice, frequency)
  // each tuple separated by newline
  const tagFreqTupleStr = input
    .split('\n')
    .map(tag => tag.trim())
    .filter(tag => tag !== '');

  tagsElem.innerHTML = '';

  if (tagFreqTupleStr.length === 0) {
    errorMsgs.push('No input provided.');
    return;
  }

  const invalidFreqTags = [];

  const tagsArr = tagFreqTupleStr.reduce((acc, tagFreq) => {
    const [tag, freq] = tagFreq.split(',', 2);
    let freqVal = parseInt(freq);
    if (isNaN(freqVal)) {
      invalidFreqTags.push(tag);
      freqVal = 1; // default freq = 1
    }
    for (let i = 0; i < freqVal; i++) {
      acc.push(tag);
    }
    return acc;
  }
  , []).sort(() => 0.5 - Math.random());
  
  tagsArr.forEach(tag => {
    const tagElem = document.createElement('span');
    tagElem.classList.add('tag');
    tagElem.innerText = tag;
    tagsElem.appendChild(tagElem);
  });

  tagCount = tagsArr.length;

  if (invalidFreqTags.length > 0) {
    errorMsgs.push(`Invalid frequency provided for ${invalidFreqTags.join(', ')}. Default to 1.`);
  }
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
      if (tagCount > 100) {
        alert(`Selected: ${randomTag.innerText}`);
      }
    }, INTERVAL_DURATION);
  }, INTERVAL_TIMES * INTERVAL_DURATION);
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  const randIdx = Math.floor(Math.random() * tags.length);
  return tags[randIdx];
}

function highlightTag(tag) {
  tag?.classList.add('highlight');
}

function unHighlightTag(tag) {
  tag?.classList.remove('highlight');
}

function showError() {
  if (errorMsgs.length) {
    errorSpan.innerText = errorMsgs.join('\n');
  }
}

function clearError() {
  errorSpan.innerText = '';
  errorMsgs = [];
}
