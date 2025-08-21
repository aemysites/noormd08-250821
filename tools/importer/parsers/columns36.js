/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required by the block/component spec
  const headerRow = ['Columns (columns36)'];

  // Find the main columns grid
  const grid = element.querySelector('.grid-layout.tablet-1-column');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: content with heading, subheading, and buttons
  const leftCol = columns[0];
  const leftContent = [];
  const h1 = leftCol.querySelector('h1');
  if (h1) leftContent.push(h1);
  const subheading = leftCol.querySelector('p.subheading');
  if (subheading) leftContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT COLUMN: vertical grid of images
  const rightCol = columns[1];
  const imageGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }

  // Build cells for the block table; exact number of columns as the layout (2)
  const contentRow = [leftContent, images];

  // Create the block table
  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with our block table
  element.replaceWith(blockTable);
}
