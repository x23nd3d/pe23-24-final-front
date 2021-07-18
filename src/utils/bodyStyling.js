export function preventBodyScrolling() {
  return document.body.classList.add("fix-body");
}

export function allowBodyScrolling() {
  return document.body.classList.remove("fix-body");
}
