export const parseTable = (table: HTMLTableElement) => {
  const trs = table.querySelectorAll("tr");

  const items = Array.from(trs).map((row) => {
    const cells = row.children;
    return Array.from(cells).map((cell) => {
      // remove all elements inside the cell just keep the text
      Array.from(cell.children).forEach((child) => cell.removeChild(child));

      return cell.textContent?.trim();
    });
  });

  const nonEmptyItems = items.filter((item) => item.every((i) => i));
  return nonEmptyItems;
};
