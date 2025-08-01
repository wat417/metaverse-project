export function applyDisplayAbstraction(selector: HTMLElement, chartType: string) {
  if (chartType === "bar") {
    selector.style.display = "block";
  } else {
    selector.style.display = "none";
  }
}