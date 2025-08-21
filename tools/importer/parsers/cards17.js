/* global WebImporter */
export default function parse(element, { document }) {
  // Header as specified
  const headerRow = ['Cards (cards17)'];
  // Each child is a card, possibly with an image and text content
  const cardDivs = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));
  const rows = cardDivs.map(card => {
    // Image or icon - required, in first cell
    const img = card.querySelector('img');
    // For this HTML, there is no text content present in the card
    // Therefore, the second cell is an empty string (per requirements, empty if no content)
    return [img, ''];
  });
  // Compose the table: header row, then one row per card
  const tableArray = [headerRow, ...rows];
  // Create table and replace
  const blockTable = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(blockTable);
}
