/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container for the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid as column contents
  const columns = Array.from(grid.children);
  // Guard for missing columns
  if (columns.length < 3) return;

  // The block name header row, exactly as required
  const headerRow = ['Columns (columns30)'];

  // Prepare content for each column. Reference existing elements directly.
  const col1 = columns[0]; // "Taylor Brooks"
  const col2 = columns[1]; // The tags list (three .tag elements)
  // col3: h2 + rich text div, assembled into a fragment for cell
  const col3Fragment = document.createDocumentFragment();
  if (columns[2]) col3Fragment.appendChild(columns[2]); // h2
  if (columns[3]) col3Fragment.appendChild(columns[3]); // .rich-text

  // Generate table structure
  const cells = [
    headerRow,
    [col1, col2, col3Fragment]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace source element with the structured table
  element.replaceWith(table);
}
