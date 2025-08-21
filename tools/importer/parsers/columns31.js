/* global WebImporter */
export default function parse(element, { document }) {
  // Set block name header
  const headerRow = ['Columns (columns31)'];
  // Find grid-layout: columns container
  let columnsDiv = null;
  for (const child of element.children) {
    if (child.classList && child.classList.contains('grid-layout')) {
      columnsDiv = child;
      break;
    }
  }
  // Fallback to element if not found
  if (!columnsDiv) columnsDiv = element;

  // Get immediate child nodes of grid-layout as columns
  const columns = Array.from(columnsDiv.children);

  // Edge case: if columns are missing, fall back to empty cell
  const secondRow = columns.length > 0 ? columns : [''];

  // Table structure matches markdown example: header then content row
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
