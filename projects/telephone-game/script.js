const copyButton = document.getElementById('copy-citation');
const citation = document.getElementById('bibtex');
const copyStatus = document.getElementById('copy-status');
let resetTimer;

if (copyButton && citation && copyStatus && navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    clearTimeout(resetTimer);
    try {
      await navigator.clipboard.writeText(citation.textContent.trim());
      copyButton.textContent = 'Copied!';
      copyStatus.textContent = 'BibTeX copied to clipboard.';
      resetTimer = setTimeout(() => {
        copyButton.textContent = 'Copy BibTeX';
        copyStatus.textContent = '';
      }, 2500);
    } catch {
      copyButton.textContent = 'Copy BibTeX';
      copyStatus.textContent = 'Select the citation text to copy it manually.';
    }
  });
}
