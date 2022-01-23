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
}
