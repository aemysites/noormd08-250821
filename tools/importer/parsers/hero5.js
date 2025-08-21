/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: matches the example
  const headerRow = ['Hero (hero5)'];

  // Get the main grid (which contains the container/text and the image)
  // This block always has: [container/text, image] as direct children of grid-layout
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) {
    // fallback to element itself if class missing
    return; // can't parse
  }

  // Get all top-level children (should be 2: container/text and image)
  const gridChildren = Array.from(mainGrid.children);

  // Find the image element for row 2
  let imageEl = gridChildren.find(el => el.tagName === 'IMG');
  if (!imageEl) {
    // If image not a direct child, search deeper
    imageEl = mainGrid.querySelector('img');
  }

  // Find the text content for row 3
  let textContainer = gridChildren.find(el => el.tagName !== 'IMG');
  // Sometimes the textContainer is another grid with a single section inside
  let textBlock = textContainer;
  if (textBlock && textBlock.children.length === 1 && textBlock.firstElementChild.classList.contains('section')) {
    textBlock = textBlock.firstElementChild;
  }

  // Compose content cell: Heading, paragraph, and CTAs (buttons)
  const content = [];
  if (textBlock) {
    // Heading(s)
    const heading = textBlock.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) content.push(heading);
    // Paragraph(s)
    const paragraphs = textBlock.querySelectorAll('p');
    paragraphs.forEach(p => content.push(p));
    // Buttons (all <a> in .button-group)
    const buttonGroup = textBlock.querySelector('.button-group');
    if (buttonGroup) {
      const links = buttonGroup.querySelectorAll('a');
      links.forEach(link => content.push(link));
    }
  }
  // If nothing was found, at least insert an empty string
  const contentCell = content.length > 0 ? content : '';

  // Build the table: 3 rows, 1 column
  const cells = [
    headerRow,
    [imageEl || ''],
    [contentCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
