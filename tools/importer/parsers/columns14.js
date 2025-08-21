/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Find the grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children of grid
  const gridChildren = Array.from(grid.children);

  // For this block, the typical structure is:
  // [heading, col1, col2, ...] OR [col1, col2, ...] if no heading
  let contentRow = [];

  // If first child is a heading (h1/h2/h3 etc), skip it for columns
  let colStartIdx = 0;
  if (gridChildren.length && gridChildren[0].tagName.match(/^H[1-6]$/i)) {
    colStartIdx = 1;
  }
  // Each column is a single cell. Reference the actual element from the DOM, not clone/create.
  for (let i = colStartIdx; i < gridChildren.length; i++) {
    contentRow.push(gridChildren[i]);
  }

  // Header row: Must match exactly the spec
  const cells = [ ['Columns (columns14)'], contentRow ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
