const figures = {
  teaser: {
    title: 'A suitcase and a banana',
    caption: 'A suitcase and a banana change across repeated text-to-image and image-to-text transitions. The suitcase disappears, while the banana count grows to fourteen.'
  },
  'cross-consistency': {
    title: 'Understanding and generation can disagree',
    caption: 'BAGEL correctly analyzes a winning chess position, but fails to generate a board that depicts the same concept.'
  },
  protocol: {
    title: 'The Semantic Drift Protocol',
    caption: 'Text-first and image-first chains alternate generation and understanding. Each output is compared with the original input to measure semantic retention.'
  },
  'failure-modes': {
    title: 'Six modes of semantic drift',
    caption: 'Across generations, spatial relations, object identity, style, counts, scene content, and color can all change.'
  },
  'multi-generation-geneval': {
    title: 'GenEval compliance across generations',
    caption: 'Similar first-generation scores can conceal different long-term behavior. BAGEL remains comparatively stable while weaker systems lose prompt fidelity.'
  },
  'text-to-text': {
    title: 'Text-to-text retention · MPNet',
    caption: 'Similarity between the original caption and later captions in the text-first chain. Higher similarity indicates stronger semantic retention.'
  },
  'image-to-image': {
    title: 'Image-to-image retention · DINO',
    caption: 'Similarity between the original image and later generated images in the image-first chain. Higher similarity indicates stronger visual retention.'
  },
  'text-to-image': {
    title: 'Text-to-image retention · CLIP',
    caption: 'Similarity between the original caption and generated images in the text-first chain.'
  },
  'image-to-text': {
    title: 'Image-to-text retention · CLIP',
    caption: 'Similarity between the original image and later captions in the image-first chain.'
  },
  'human-geneval': {
    title: 'Single-pass GenEval and human rankings',
    caption: 'Pearson correlation r = −0.753 across seven systems. Lower human rank is better; higher GenEval score is better.'
  },
  'human-mgg': {
    title: 'Multi-Generation GenEval and human rankings',
    caption: 'Pearson correlation r = −0.821 across seven systems, showing stronger agreement with human generation rankings than single-pass GenEval.'
  },
  'human-cross-consistency': {
    title: 'Human evaluation of cross-consistency',
    caption: 'Human ratings reveal stronger understanding than generation in most systems. BAGEL shows fewer mismatches between the two capabilities.'
  }
};

const imageKey = new URLSearchParams(window.location.search).get('image') || 'teaser';
const selected = Object.hasOwn(figures, imageKey) ? figures[imageKey] : null;
const title = document.getElementById('figure-title');
const picture = document.getElementById('figure-image');
const stage = document.getElementById('figure-stage');
const caption = document.getElementById('figure-caption');
const zoom = document.getElementById('figure-zoom');
const download = document.getElementById('figure-download');
const error = document.getElementById('figure-error');

function showError(message) {
  error.textContent = message;
  error.hidden = false;
  stage.hidden = true;
  caption.hidden = true;
  zoom.hidden = true;
  download.hidden = true;
}

if (selected) {
  title.textContent = selected.title;
  document.title = selected.title + ' | The Telephone Game';
  picture.alt = selected.caption;
  caption.textContent = selected.caption;
  picture.addEventListener('load', () => {
    picture.hidden = false;
    zoom.hidden = false;
    download.hidden = false;
  }, { once: true });
  picture.addEventListener('error', () => showError('This figure could not be loaded. Return to the project page to try again.'), { once: true });
  const assetVersion = ['protocol', 'cross-consistency'].includes(imageKey) ? '?v=white-2' : '';
  picture.src = '../../static/telephone-game/figures/' + imageKey + '.webp' + assetVersion;
  download.href = picture.src;
  download.download = imageKey + '.webp';
  zoom.addEventListener('click', () => {
    const enlarged = stage.classList.toggle('is-zoomed');
    zoom.setAttribute('aria-pressed', String(enlarged));
    zoom.textContent = enlarged ? 'Fit to screen' : 'View actual size';
    stage.scrollTo(0, 0);
  });
} else {
  showError('That figure is not available. Return to the project page to choose a figure.');
}
