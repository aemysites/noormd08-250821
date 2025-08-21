/* global WebImporter */
export default function parse(element, { document }) {
  // Block header
  const headerRow = ['Cards (cards7)'];

  // Get all cards: each immediate child div
  const cardDivs = element.querySelectorAll(':scope > div');

  // Create rows for the table: each row is [image, text] (text empty; only image available)
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find the image element inside the card
    const img = cardDiv.querySelector('img');
    return [img, '']; // image in first cell, empty text in second cell
  });

  // Assemble the table data
  const cells = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
