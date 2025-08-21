/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row, matching the required format exactly
  const headerRow = ['Cards (cards33)'];

  // Get all card links (each card is a direct child <a> of the grid)
  const cardLinks = element.querySelectorAll(':scope > a');

  // Build each card row
  const rows = Array.from(cardLinks).map(card => {
    // First cell: the main image (always present)
    const img = card.querySelector('img');

    // Second cell: text content (heading, description, CTA)
    // Find the .w-layout-grid within the link, which wraps the content
    const innerGrid = card.querySelector('.w-layout-grid');
    // The text block is usually the second child div in the grid
    let textBlock = null;
    if (innerGrid) {
      const gridChildren = innerGrid.querySelectorAll(':scope > div');
      // If two children, second one is text block
      textBlock = gridChildren.length > 1 ? gridChildren[1] : gridChildren[0];
    }

    // Prepare array for the text cell content in proper order
    let textCell = [];
    if (textBlock) {
      // Tag/min-read row (optional, likely not needed in final output, but preserve semantic meaning)
      const tagsRow = textBlock.querySelector('.flex-horizontal');
      if (tagsRow) textCell.push(tagsRow);
      // Heading
      const heading = textBlock.querySelector('h3, .h4-heading');
      if (heading) textCell.push(heading);
      // Description paragraph
      const desc = textBlock.querySelector('p');
      if (desc) textCell.push(desc);
      // CTA (div containing 'Read')
      // Ensure we only grab the 'Read' CTA and not other divs
      const cta = Array.from(textBlock.querySelectorAll('div')).find(div => div.textContent.trim() === 'Read');
      if (cta) textCell.push(cta);
    }
    // Fallback: If nothing was found, use entire textBlock
    if (!textCell.length && textBlock) textCell = [textBlock];

    // Final row: [image, text cell]
    return [img, textCell];
  });

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
