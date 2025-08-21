/* global WebImporter */
export default function parse(element, { document }) {
  // Find grid layout, which should contain the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get immediate children = columns (normally 2: content and image)
  const gridChildren = Array.from(grid.children);
  let textCol = null;
  let imgCol = null;
  // Identify which child is the text column and which is the image
  for (const child of gridChildren) {
    if (!textCol && child.tagName === 'DIV') textCol = child;
    if (!imgCol && child.tagName === 'IMG') imgCol = child;
  }
  // Fallbacks for robustness
  // If more columns, first div is text, first img is image
  if (!textCol) textCol = gridChildren.find(c => c.tagName === 'DIV') || null;
  if (!imgCol) imgCol = gridChildren.find(c => c.tagName === 'IMG') || null;
  // Build the table only if at least one column exists
  if (!textCol && !imgCol) return;
  const headerRow = ['Columns (columns27)'];
  const contentRow = [];
  if (textCol) contentRow.push(textCol);
  if (imgCol) contentRow.push(imgCol);
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
