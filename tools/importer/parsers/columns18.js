/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container that holds the columns/rows
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  // For this block, there are two main columns:
  // - The left column (contact info: headings, description, and contact details)
  // - The right column (image)

  // Identify the left content block (text and contact info)
  let leftBlock = null;
  let rightBlock = null;
  let imageEl = null;

  // Find all immediate children: div (left), ul (contact details), img (image)
  // Some sites put img inside grid, some outside
  // We'll collect all div, ul, img in order they appear
  const divs = Array.from(grid.querySelectorAll(':scope > div'));
  const uls = Array.from(grid.querySelectorAll(':scope > ul'));
  const imgs = Array.from(grid.querySelectorAll(':scope > img'));

  // Compose left column: all non-image, non-ul content
  // The first div typically contains headings + intro text
  // We'll use the first div, plus the ul (if present)
  if (divs.length) {
    leftBlock = document.createElement('div');
    divs.forEach(d => leftBlock.appendChild(d));
    if (uls.length) {
      uls.forEach(u => leftBlock.appendChild(u));
    }
  }
  // If no divs but ul exists, put ul only
  if (!divs.length && uls.length) {
    leftBlock = document.createElement('div');
    uls.forEach(u => leftBlock.appendChild(u));
  }
  // Compose right column: image (if any)
  if (imgs.length) {
    // Only one image in this block
    imageEl = imgs[0];
    rightBlock = imageEl;
  }
  // If no image, right block is empty
  if (!rightBlock) {
    rightBlock = document.createElement('div');
  }

  // Prepare header row and block table
  const headerRow = ['Columns (columns18)'];
  const cells = [
    headerRow,
    [leftBlock, rightBlock]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
