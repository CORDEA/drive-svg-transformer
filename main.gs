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
  const size = 500;

  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const angle = h * (360 / 12) + m * (30 / 60);

  const children = [];
  const center = size / 2;

  children.push(...getClockFrame(center));

  const r = center / 2;
  const radians = (angle - 90) * (Math.PI / 180);
  const circle = getSvgCircle(
    center + r * Math.cos(radians),
    center + r * Math.sin(radians),
    30,
    "#fb00a5",
    0.3,
    "none"
  );
  children.push(circle);
  return getSvgBox(size, size, children);
}

function getClockFrame(center) {
  return [
    getSvgCircle(center, center, center - 10, "none", 0, "#aeaeae"),
    getSvgCircle(center, center, center / 2, "#aeaeae", 0.2, "none"),
  ];
}

function getSvgBox(width, height, children) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${children.join('\n')}
  </svg>
  `
}

function getSvgRect(width, height, x, y, color) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />`
}

function getSvgCircle(cx, cy, r, color, opacity, stroke) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" fill-opacity="${opacity}" stroke="${stroke}" />`
}
