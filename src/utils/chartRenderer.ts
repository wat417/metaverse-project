// chartRenderer.ts
export function renderBarChart(
  ctx: CanvasRenderingContext2D,
  data: Record<string, number>,
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height)
  const keys = Object.keys(data)
  const values = Object.values(data)
  const barWidth = 40
  const gap = 20
  const maxBarHeight = height - 40
  const maxValue = Math.max(...values)

  keys.forEach((key, i) => {
    const barHeight = (data[key] / maxValue) * maxBarHeight
    const x = gap + i * (barWidth + gap)
    const y = height - barHeight - 20

    ctx.fillStyle = '#4287f5'
    ctx.fillRect(x, y, barWidth, barHeight)

    ctx.fillStyle = '#000'
    ctx.font = '12px Arial'
    ctx.fillText(key, x - 5, height - 5)
    ctx.fillText(String(data[key]), x + 5, y - 5)
  })
}