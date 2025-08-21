/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for expected grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Gather immediate children of grid: each is a column
  const columns = Array.from(grid.children);

  // Table header: must exactly match example
  const headerRow = ['Columns (columns9)'];

  // Second row: each cell is a column's DOM node (no clones, robust)
  const contentRow = columns.map(col => col);

  // No Section Metadata table in example, so none created

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
