// statusRenderer.ts
export function renderStatusLabel(label: string): void {
  const targetElement = document.querySelector('#status-label');
  if (targetElement) {
    targetElement.textContent = label;
    targetElement.classList.add('highlighted');
  }
}