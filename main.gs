function main() {
  const folders = DriveApp.getFoldersByName("public");
  if (!folders.hasNext()) {
    return;
  }
  const folder = folders.next();

  const files = folder.getFilesByName("shape.svg");
  if (!files.hasNext()) {
    return;
  }
  const file = files.next();

  file.setContent(generateSvg());
}

function generateSvg() {
  return getSvgBox(250, 250, "");
}

function getSvgBox(width, height, content) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${content}
  </svg>
  `
}
