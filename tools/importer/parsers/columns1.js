/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main column children (left: image, right: text/buttons)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Build cells array for the block table
  const headerRow = ['Columns (columns1)'];
  const contentRow = [columns[0], columns[1]]; // reference the original elements

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
