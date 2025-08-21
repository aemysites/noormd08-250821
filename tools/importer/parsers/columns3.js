/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid in the structure
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get the immediate children of the grid, these are the columns content
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The header row must be a single cell, even if there are multiple columns in content rows
  const headerRow = ['Columns (columns3)'];
  // The content row contains one cell per column
  const contentRow = columns;

  // Build the cells array: header is always one cell, content row matches columns
  const cells = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
