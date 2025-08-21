/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a grid
  function extractCards(grid) {
    const cards = [];
    // Select only direct children <a> as cards
    const cardEls = Array.from(grid.querySelectorAll(':scope > a'));
    cardEls.forEach(cardEl => {
      let img = null;
      // Find the image if it exists
      const imgDiv = cardEl.querySelector('.utility-aspect-3x2');
      if (imgDiv) {
        const imgTag = imgDiv.querySelector('img');
        if (imgTag) img = imgTag;
      }
      // Find heading and description
      const heading = cardEl.querySelector('h3');
      const desc = cardEl.querySelector('.paragraph-sm');
      // Compose text cell
      const textParts = [];
      if (heading) textParts.push(heading);
      if (desc) textParts.push(desc);
      // Add row: [image, text]
      cards.push([
        img ? img : '',
        textParts.length ? textParts : ''
      ]);
    });
    return cards;
  }

  // Find all tab panes (each one is a cards block)
  const tabSections = Array.from(element.querySelectorAll(':scope > div'));
  const blockTables = [];
  tabSections.forEach(tabPane => {
    // Each pane should have a grid of cards
    const grid = tabPane.querySelector('.grid-layout');
    if (!grid) return; // skip if no grid
    const cells = [['Cards (cards23)']]; // header row
    const cards = extractCards(grid);
    cards.forEach(cardRow => {
      cells.push(cardRow);
    });
    const table = WebImporter.DOMUtils.createTable(cells, document);
    blockTables.push(table);
  });

  if (blockTables.length > 0) {
    // Replace original element with all block tables in order
    const fragment = document.createDocumentFragment();
    blockTables.forEach(table => fragment.appendChild(table));
    element.replaceWith(fragment);
  } else {
    // If no tables found, do nothing (edge case)
  }
}
