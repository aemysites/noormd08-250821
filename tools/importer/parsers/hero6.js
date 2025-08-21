/* global WebImporter */
export default function parse(element, { document }) {
  // Setup header row exactly matching block name
  const headerRow = ['Hero (hero6)'];
  
  // Extract background image (first img)
  const img = element.querySelector('img');
  const imageRow = [img ? img : ''];

  // Find the deepest card element containing text/buttons
  const card = element.querySelector('.card');
  let contentElements = [];
  if (card) {
    // Heading (h1, h2, h3, ... highest level heading in card)
    const heading = card.querySelector('h1,h2,h3');
    if (heading) contentElements.push(heading);
    // Subheading (first p inside card)
    const subheading = card.querySelector('p');
    if (subheading) contentElements.push(subheading);
    // CTAs (button group: div or container with links/buttons)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentElements.push(buttonGroup);
  }
  const contentRow = [contentElements.length ? contentElements : ''];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
