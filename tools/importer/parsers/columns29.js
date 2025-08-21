/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate child divs as columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, extract its image
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    return col;
  });
  // Header row: single cell only
  const headerRow = ['Columns (columns29)'];
  // Construct the cells array: header is single cell, data row is as many as needed
  const cells = [headerRow, contentRow];
  // Create table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Fix: Ensure the header row spans all columns
  if (block.rows.length > 0 && block.rows[0].cells.length === 1 && contentRow.length > 1) {
    block.rows[0].cells[0].setAttribute('colspan', String(contentRow.length));
  }
  // Replace the element
  element.replaceWith(block);
}
