/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must use exact block name
  const headerRow = ['Accordion (accordion13)'];

  // Get all direct children that are .divider blocks, each is an accordion item
  const dividerItems = Array.from(element.querySelectorAll(':scope > .divider'));
  const rows = [headerRow];

  dividerItems.forEach(divider => {
    // Each divider contains a grid-layout div housing the title and body
    const grid = divider.querySelector('.grid-layout');
    if (grid) {
      // Get its immediate children: one heading and one rich text
      // Defensive: fallback if order is mixed up, find by class
      const title = Array.from(grid.children).find(child => child.classList.contains('h4-heading'));
      const content = Array.from(grid.children).find(child => child.classList.contains('rich-text'));
      // Only add if both title and content exist
      if (title && content) {
        rows.push([title, content]);
      }
    }
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
