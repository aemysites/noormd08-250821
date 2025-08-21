/* global WebImporter */
export default function parse(element, { document }) {
  // Get the tab menu (labels)
  const tabMenu = Array.from(element.children).find(el => el.classList.contains('w-tab-menu'));
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a')) : [];

  // Get tab contents container
  const tabContent = Array.from(element.children).find(el => el.classList.contains('w-tab-content'));
  const tabPanes = tabContent ? Array.from(tabContent.querySelectorAll('.w-tab-pane')) : [];

  // Header row: block name only
  const rows = [ ['Tabs'] ];

  // Each tab becomes a row: [Label, Content]
  for (let i = 0; i < tabLinks.length && i < tabPanes.length; i++) {
    // Extract label
    let label = '';
    const labelDiv = tabLinks[i].querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLinks[i].textContent.trim();
    }

    // Extract main content for this tab (reference existing element, do not clone)
    // Prefer the main grid inside the pane, fallback to the pane itself if not found
    let contentCell = null;
    const grid = tabPanes[i].querySelector('.w-layout-grid');
    if (grid) {
      contentCell = grid;
    } else {
      // fallback to referencing the tab pane element
      contentCell = tabPanes[i];
    }
    rows.push([label, contentCell]);
  }

  // Create new block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
