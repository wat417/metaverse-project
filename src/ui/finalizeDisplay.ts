export const finalizeDisplay = (type: string): string[] => {
  switch (type) {
    case 'bar':
      return ['axis', 'legend', 'tooltip', 'grid'];
    case 'line':
      return ['axis', 'grid', 'tooltip', 'marker'];
    case 'pie':
      return ['legend', 'tooltip', 'sliceLabel'];
    case 'default':
      return ['axis', 'tooltip'];
    default:
      return ['axis', 'tooltip']; // fallback
  }
};