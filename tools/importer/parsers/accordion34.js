/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row as shown in the example
  const headerRow = ['Accordion (accordion34)'];
  // Find all top-level accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .w-dropdown'));
  // For each accordion item, extract title and content
  const rows = accordionItems.map((item) => {
    // Title cell: look for .w-dropdown-toggle > .paragraph-lg
    let titleCell;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Prefer first .paragraph-lg inside the toggle, fallback to toggle itself if not found
      titleCell = toggle.querySelector('.paragraph-lg') || toggle;
    } else {
      titleCell = item;
    }
    // Content cell: look for .w-dropdown-list
    let contentCell;
    const dropdownList = item.querySelector('.w-dropdown-list');
    if (dropdownList) {
      // Prefer rich text if present, else use the dropdownList as is
      const richText = dropdownList.querySelector('.w-richtext');
      contentCell = richText || dropdownList;
    } else {
      contentCell = item;
    }
    return [titleCell, contentCell];
  });
  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace element with the new block table
  element.replaceWith(table);
}
