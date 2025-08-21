/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: block name exactly as specified
  const headerRow = ['Hero (hero12)'];

  // 2. Second row: Background Image (optional)
  // Get the grid container, first child is background image container
  let bgImgCell = '';
  const grid = element.querySelector('.w-layout-grid');
  if (grid && grid.children.length > 0) {
    const bgImgDiv = grid.children[0];
    // Find <img> inside
    const bgImg = bgImgDiv.querySelector('img');
    if (bgImg) {
      bgImgCell = bgImg;
    }
  }

  // 3. Third row: Heading, subheadings, CTA, etc.
  // All content is inside the card-body of the second grid child
  let contentCell = '';
  if (grid && grid.children.length > 1) {
    const contentCol = grid.children[1];
    // The card body contains all content (including image, heading, etc.)
    const cardBody = contentCol.querySelector('.card-body');
    if (cardBody) {
      contentCell = cardBody;
    }
  }

  // Compose table as per requirements
  const cells = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
