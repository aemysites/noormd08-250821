/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards2)'];

  // Find the container holding all cards
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Cards are distributed across the grid and two flex groups
  // The first card is the big one
  const firstCard = grid.querySelector('a.utility-link-content-block');
  // Next, two stacked cards with images
  const imageCardGroup = container.querySelector('.flex-horizontal.flex-vertical.flex-gap-sm');
  // Final group, all text-only cards (separated by dividers)
  const textCardGroup = container.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm')[1];

  const rows = [];

  // Helper to get image from a card
  function getImage(card) {
    const img = card.querySelector('img');
    return img ? img : '';
  }

  // Helper to get text content from a card, referencing existing elements
  function getText(card, img) {
    // If img is present, exclude it from the cell
    // We'll build an array of elements, including tags, headings, paragraphs, etc.
    // Only omit the image itself
    const parts = [];
    card.childNodes.forEach(node => {
      // If node contains the image, skip it
      if (node.nodeType === 1 && node.contains(img)) return;
      // Don't include the divider elements
      if (node.nodeType === 1 && node.classList.contains('divider')) return;
      // Otherwise, include
      parts.push(node);
    });
    return parts.length === 1 ? parts[0] : parts;
  }

  // --- FIRST CARD (big left card) ---
  if (firstCard) {
    const img = getImage(firstCard);
    const text = getText(firstCard, img);
    rows.push([img, text]);
  }

  // --- TWO IMAGE CARDS (right of big card) ---
  if (imageCardGroup) {
    // Only direct <a> children: these are the cards
    Array.from(imageCardGroup.children).filter(child => child.tagName === 'A').forEach(card => {
      const img = getImage(card);
      const text = getText(card, img);
      rows.push([img, text]);
    });
  }

  // --- TEXT-ONLY CARDS ---
  if (textCardGroup) {
    Array.from(textCardGroup.children).forEach(card => {
      if (card.tagName !== 'A') return; // skip dividers
      // No image, just text in cell 2
      rows.push(['', card]);
    });
  }

  // Compose table
  const tableCells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
