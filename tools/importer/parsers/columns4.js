/* global WebImporter */
export default function parse(element, { document }) {
  // Header: one cell only
  const headerRow = ['Columns (columns4)'];

  // Get all immediate child divs: each is a column
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Compose the content row with references to each column's content
  // To match the example, each column cell should contain the entire column div
  // This ensures any content (image, text, etc.) is included for robustness
  const contentRow = columnDivs.map(div => div);

  // Create the cells array with exactly two rows:
  // The header (one cell), the content row (N cells)
  const cells = [headerRow, contentRow];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
