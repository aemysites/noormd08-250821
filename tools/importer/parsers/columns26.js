/* global WebImporter */
export default function parse(element, { document }) {
  // Find grid containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let heading = null, quote = null, testimonialGrid = null;
  if (grid) {
    const children = Array.from(grid.children);
    if (children[0]) heading = children[0];
    if (children[1]) quote = children[1];
    if (children[2]) testimonialGrid = children[2];
  }

  // From testimonialGrid extract attribution (avatar and text) and logo
  let attribution = null;
  let logo = null;
  if (testimonialGrid) {
    // TestimonialGrid structure:
    // [divider, flex-horizontal attribution, logo svg]
    const tChildren = Array.from(testimonialGrid.children);
    // Attribution is the flex-horizontal (find the div with class 'flex-horizontal')
    attribution = testimonialGrid.querySelector('.flex-horizontal');
    // Logo is the div with 'utility-display-inline-block' (logo svg)
    logo = testimonialGrid.querySelector('.utility-display-inline-block');
  }

  // LEFT COLUMN: heading + quote + attribution
  const leftCol = [];
  if (heading) leftCol.push(heading);
  if (quote) leftCol.push(quote);
  if (attribution) leftCol.push(attribution);
  // RIGHT COLUMN: logo only
  const rightCol = [];
  if (logo) rightCol.push(logo);

  const cells = [
    ['Columns (columns26)'],
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
