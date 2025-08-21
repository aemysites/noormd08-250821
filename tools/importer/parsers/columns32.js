/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children (columns)
  const columns = Array.from(grid.children);

  // The image column (first in source)
  const imgCol = columns.find(el => el.tagName === 'IMG');

  // The content column (second in source)
  const contentCol = columns.find(el => el !== imgCol);

  // Table header row - exact block name
  const headerRow = ['Columns (columns32)'];

  // Only reference *existing* elements (no clones, no hardcoding)
  const row = [];
  row.push(imgCol || '');
  row.push(contentCol || '');

  const cells = [headerRow, row];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
