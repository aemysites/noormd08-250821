/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be a single cell/column
  const headerRow = ['Columns (columns11)'];

  // Find main content columns
  const container = element.querySelector('.container');
  if (!container) return;
  const contentGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column.grid-gap-lg');
  if (!contentGrid) return;
  const leftCol = contentGrid.children[0];
  const rightCol = contentGrid.children[1];

  // Left column content: collect all relevant children
  const leftColContent = [];
  // Eyebrow and heading
  const eyebrow = leftCol.querySelector('.eyebrow');
  if (eyebrow) leftColContent.push(eyebrow);
  const heading = leftCol.querySelector('h1,h2,h3,h4,h5,h6');
  if (heading) leftColContent.push(heading);
  // Description
  if (rightCol) {
    const desc = rightCol.querySelector('.w-richtext, .rich-text, p');
    if (desc) leftColContent.push(desc);
    const authorRow = rightCol.querySelector('.w-layout-grid.grid-layout > .flex-horizontal');
    if (authorRow) leftColContent.push(authorRow);
    const button = rightCol.querySelector('.w-layout-grid.grid-layout > a.button, .button.w-button');
    if (button) leftColContent.push(button);
  }

  // Images for right column
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column.grid-gap-md');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }

  // Content row: two cells (first: left content, second: all images)
  const contentRow = [leftColContent, images];

  // Build the table: header row is a single column, content row is two columns
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
