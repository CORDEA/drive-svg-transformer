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

  file.setContent(drawClock());
}

function drawClock() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const angle = h * (360 / 12) + m * (30 / 60);

  const size = 250;
  const center = size / 2;
  const r = 60;
  const radians = (angle - 90) * (Math.PI / 180);
  const circle = getSvgCircle(
    center + r * Math.cos(radians),
    center + r * Math.sin(radians),
    5,
    "black");
  return getSvgBox(size, size, circle);
}

function getSvgBox(width, height, content) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${content}
  </svg>
  `
}

function getSvgRect(width, height, x, y, color) {
  return `
  <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />
  `
}

function getSvgCircle(cx, cy, r, color) {
  return `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" />
  `
}
