/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per spec
  const rows = [['Cards (cards24)']];

  // All card links (each is a card)
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  cards.forEach(card => {
    // Image: first img inside card
    let img = null;
    const imgContainer = card.querySelector('div.utility-aspect-2x3');
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }

    // Text cell: reference the main content in the card
    // We'll collect tag+date row, and heading, in order as in HTML
    const cellContents = [];
    // Tag/date (meta) row
    const metaRow = card.querySelector('div.flex-horizontal');
    if (metaRow && metaRow.children.length > 0) {
      cellContents.push(metaRow);
    }
    // Heading
    const heading = card.querySelector('h3');
    if (heading) {
      cellContents.push(heading);
    }
    // Only non-null elements will be added.

    rows.push([
      img,
      cellContents.length > 1 ? cellContents : cellContents[0] || ''
    ]);
  });

  // Create table using referenced elements
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}