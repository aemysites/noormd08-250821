/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Carousel'];

  // Find the .grid-layout wrapper
  const gridWrap = element.querySelector('.grid-layout');
  if (!gridWrap) return;

  // Get all slides (direct children of gridWrap)
  const slides = Array.from(gridWrap.children).filter(Boolean);

  // Each row: [imgElement, ''] (no text content in this case)
  const rows = slides.map((slide) => {
    // Get the first image inside each slide (deep search)
    const img = slide.querySelector('img');
    // If no image is found, skip this slide
    if (!img) return null;
    return [img, ''];
  }).filter(Boolean); // Remove any null rows

  if (rows.length === 0) return; // Don't create empty table

  // Build the table data
  const cells = [headerRow, ...rows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element in the DOM with the new block table
  element.replaceWith(table);
}
