/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly to match the block name
  const headerRow = ['Cards (cards19)'];
  // Get all card rows. Each card is a direct child div of the grid container.
  const cardDivs = element.querySelectorAll(':scope > div');
  // Build table rows for each card, each with icon (SVG) and text (P)
  const rows = Array.from(cardDivs).map(card => {
    // Safely find the icon div (may be missing)
    const iconDiv = card.querySelector('.icon');
    // Find the card text (should always be present)
    const textP = card.querySelector('p');
    // Fallbacks for edge cases
    const iconCell = iconDiv || document.createElement('span');
    const textCell = textP || document.createElement('span');
    return [iconCell, textCell];
  });
  // Assemble the final table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}
