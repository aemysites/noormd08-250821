/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: block name exactly as example
  const headerRow = ['Hero (hero35)'];

  // 2. Background image row (none present in this HTML, so empty string)
  const bgRow = [''];

  // 3. Content row: Heading, subheading, CTA
  // Find the grid layout container (do not assume direct children)
  const grid = element.querySelector('.grid-layout');
  let headingBlock, heading, subheading, cta;

  if (grid) {
    // Get all immediate children of the grid
    const gridChildren = Array.from(grid.children);
    // First child: heading+subheading
    headingBlock = gridChildren[0];
    // Defensive: ensure headingBlock exists
    if (headingBlock) {
      heading = headingBlock.querySelector('h1, h2, h3, h4, h5, h6');
      subheading = headingBlock.querySelector('p');
    }
    // Second child: CTA
    cta = gridChildren[1];
  }

  // Compose row content, referencing existing elements
  const contentRowContent = [];
  if (heading) contentRowContent.push(heading);
  if (subheading) contentRowContent.push(subheading);
  if (cta) contentRowContent.push(cta);

  // Defensive: always supply array for createTable. If all are missing, empty string
  const contentRow = contentRowContent.length > 0 ? [contentRowContent] : [''];

  // Compose table
  const cells = [
    headerRow,
    bgRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
