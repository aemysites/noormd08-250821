/* global WebImporter */
export default function parse(element, { document }) {
  // Header exactly as specified in example
  const headerRow = ['Cards (cards10)'];
  // All direct card-link children (each card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.card-link'));
  const rows = [headerRow];
  cardLinks.forEach((cardLink) => {
    // Card image is always in the first child with utility-aspect-3x2
    const imgDiv = cardLink.querySelector('.utility-aspect-3x2');
    let img = null;
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }
    // Text content
    const textContainer = cardLink.querySelector('.utility-padding-all-1rem');
    const textContent = [];
    if (textContainer) {
      // Tag (optional)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        const tag = tagGroup.querySelector('.tag');
        if (tag && tag.textContent && tag.textContent.trim() !== '') {
          textContent.push(tag);
        }
      }
      // Heading (optional)
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading && heading.textContent && heading.textContent.trim() !== '') {
        textContent.push(heading);
      }
      // Description (optional)
      const para = textContainer.querySelector('p, .paragraph-sm');
      if (para && para.textContent && para.textContent.trim() !== '') {
        textContent.push(para);
      }
    }
    // Avoid adding empty rows (in case of malformed cards)
    if (img || textContent.length) {
      rows.push([
        img,
        textContent
      ]);
    }
  });
  // Only replace if at least header + one row
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
