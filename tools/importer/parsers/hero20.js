/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Hero (hero20)'];

  // 2. Background images row: all images from the collage
  let bgImages = [];
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  if (grid) {
    // Only take direct children that are .utility-position-relative
    const wrappers = Array.from(grid.children).filter(child => child.classList.contains('utility-position-relative'));
    wrappers.forEach(wrapper => {
      const img = wrapper.querySelector('img');
      if (img) bgImages.push(img);
    });
  }
  // If no images, leave cell empty
  const bgRow = [bgImages.length ? bgImages : ''];

  // 3. Content row: headline, subheading, CTAs
  let contentCell = '';
  const contentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentDiv) {
    // Use the whole container so headings, paragraph, and links are preserved
    contentCell = contentDiv;
  }
  const contentRow = [contentCell];

  // 4. Create table
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace original element
  element.replaceWith(table);
}
