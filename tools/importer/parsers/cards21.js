/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row (block name exactly)
  const headerRow = ['Cards (cards21)'];

  // 2. Find the card content
  // This HTML has deeply nested divs, so locate the main card container
  // It may be .card-body, but fallback to .card, then element itself
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) cardBody = element.querySelector('.card');
  if (!cardBody) cardBody = element;

  // 3. Extract image (mandatory)
  const img = cardBody.querySelector('img');

  // 4. Extract heading (optional, but present here)
  const heading = cardBody.querySelector('.h4-heading');

  // 5. Extract description (optional; in this case, not present)
  // Try to get a paragraph or any description below heading
  let description = null;
  if (heading) {
    // Next element sibling that is not the img
    let next = heading.nextElementSibling;
    while (next && next.tagName.toLowerCase() === 'img') {
      next = next.nextElementSibling;
    }
    if (next && (next.tagName.toLowerCase() === 'p' || next.nodeType === 3)) {
      description = next;
    }
  }

  // 6. Compose text cell
  const textCell = [];
  if (heading) textCell.push(heading);
  if (description) textCell.push(description);

  // 7. Create table cells array
  const cells = [
    headerRow,
    [img, textCell.length ? textCell : '']
  ];

  // 8. Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
