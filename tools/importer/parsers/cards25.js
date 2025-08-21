/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Get direct children of the grid element
  const children = Array.from(element.querySelectorAll(':scope > div'));
  
  children.forEach((child) => {
    // A card must have both image and text content
    const img = child.querySelector('img');
    const textBlock = child.querySelector('.utility-padding-all-2rem');
    if (img && textBlock) {
      // Reference the existing image and text block elements directly
      rows.push([img, textBlock]);
    }
    // If only an img, no text overlay, skip (not a card for this block)
  });

  // Create and replace with the cards block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
