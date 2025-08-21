/* global WebImporter */
export default function parse(element, { document }) {
  // Find direct children in grid layout
  const layoutDivs = element.querySelectorAll(':scope > div > div');

  // 1st cell: background image (should be referenced directly)
  let bgImg = null;
  for (const div of layoutDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // 2nd cell: content block (heading, paragraph, CTA)
  let contentBlock = null;
  for (const div of layoutDivs) {
    const h1 = div.querySelector('h1');
    if (h1) {
      contentBlock = div;
      break;
    }
  }

  // Table header must match exactly
  const headerRow = ['Hero (hero39)'];

  // Edge case handling: ensure either bgImg or contentBlock are present
  // If missing, supply an empty cell
  const bgImgRow = [bgImg ? bgImg : ''];
  const contentRow = [contentBlock ? contentBlock : ''];

  const cells = [
    headerRow,
    bgImgRow,
    contentRow
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element in the DOM
  element.replaceWith(block);
}
