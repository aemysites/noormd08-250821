/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that contains all cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  // Safeguard: If not found, exit early
  if (!mainGrid) return;

  // Helper: Collect all card wrappers ("utility-link-content-block") in all nested grids
  function getCardElements(grid) {
    let cards = [];
    grid.childNodes.forEach((node) => {
      if (node.nodeType === 1) {
        if (node.classList.contains('utility-link-content-block')) {
          cards.push(node);
        } else if (node.classList.contains('w-layout-grid')) {
          // Recursively collect cards from nested grids
          cards = cards.concat(getCardElements(node));
        }
      }
    });
    return cards;
  }

  const cardElements = getCardElements(mainGrid);

  // Table header exactly as in the specification
  const rows = [['Cards (cards37)']];

  cardElements.forEach(card => {
    // ===== First cell: image or icon =====
    // Find the first image inside the card (usually inside a wrapper div)
    let img = card.querySelector('img');
    // Reference the immediate parent div for aspect ratio, if present
    let imgCell = img ? img.closest('div') || img : null;
    // If image is missing, fallback to null (empty cell)
    
    // ===== Second cell: text content =====
    const textContent = [];
    // Heading (h2, h3, h4, etc.)
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textContent.push(heading);
    // All <p> tags
    card.querySelectorAll('p').forEach(p => textContent.push(p));
    // CTA/button if present (e.g., .button or .cta)
    const cta = card.querySelector('.button, .cta, [role=button]');
    if (cta) textContent.push(cta);

    rows.push([
      imgCell,
      textContent
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}