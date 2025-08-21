/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the two primary columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');

  // Prepare array for the two column cells
  let leftCell = null;
  let rightCell = null;
  if (grid) {
    // Get all direct children of the grid
    const children = Array.from(grid.children);
    // The left column: the only DIV child (contains heading, subheading, buttons)
    leftCell = children.find((el) => el.tagName === 'DIV');
    // The right column: the only IMG child
    rightCell = children.find((el) => el.tagName === 'IMG');
  }
  // If missing, create empty div so table always has 2 columns
  if (!leftCell) leftCell = document.createElement('div');
  if (!rightCell) rightCell = document.createElement('div');

  // Table header must match exactly
  const headerRow = ['Columns (columns15)'];
  // Table content row must have 2 columns, left then right
  const contentRow = [leftCell, rightCell];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element with the new table
  element.replaceWith(table);
}