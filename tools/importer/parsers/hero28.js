/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row
  const headerRow = ['Hero (hero28)'];

  // Extract background image (as element)
  let backgroundImg = null;
  const backgroundDiv = element.querySelector('.ix-parallax-scale-out-hero');
  if (backgroundDiv) {
    const img = backgroundDiv.querySelector('img');
    if (img) backgroundImg = img;
  }

  // Extract content (headings, subheading, CTA)
  let textContent = null;
  // The layout grid's second cell usually holds the text block
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 1) {
    const container = gridDivs[1];
    // Find the content block inside the container
    const contentBlock = container.querySelector('.utility-margin-bottom-6rem');
    if (contentBlock) {
      // We'll create a new div to hold all content elements inside contentBlock
      const contentDiv = document.createElement('div');
      // Get heading
      const heading = contentBlock.querySelector('h1');
      if (heading) contentDiv.appendChild(heading);
      // Get any button group (CTA) if present
      const btnGroup = contentBlock.querySelector('.button-group');
      if (btnGroup && btnGroup.childNodes.length) contentDiv.appendChild(btnGroup);
      // If nothing found, fallback to the whole block
      if (!contentDiv.hasChildNodes()) {
        // Use the whole contentBlock
        textContent = contentBlock;
      } else {
        textContent = contentDiv;
      }
    }
  }
  // Edge case: If nothing was found, set cell to empty string
  if (!backgroundImg) backgroundImg = '';
  if (!textContent) textContent = '';

  // Compose final table
  const cells = [
    headerRow,
    [backgroundImg],
    [textContent],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
