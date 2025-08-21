/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children that represent columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The header row must have exactly one column with the correct label
  const headerRow = ['Columns (columns38)'];

  // The second row should have as many columns as found in the HTML
  const contentRow = columns;

  // Compose the table rows
  const rows = [
    headerRow,
    contentRow
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
