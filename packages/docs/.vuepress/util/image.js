const aspectRatioList = [
  1,
  3 / 4,
  9 / 16,
]

export function genAspectRatio () {
  return aspectRatioList[~~(Math.random() * aspectRatioList.length)]
}

export function genImage (aspectRatio) {
  const id = ~~(Math.random() * 100)
  aspectRatio = aspectRatio || genAspectRatio()
  return {
    tag: 'img',
    src: `https://picsum.photos/id/${id}/375/${~~(375 * (1 / aspectRatio))}`,
    lazySrc: `https://picsum.photos/id/${id}/6/${~~(6 * (1 / aspectRatio))}`,
    aspectRatio,
    width: 150,
    height: ~~(150 * (1 / aspectRatio)),
  }
}

export function genImages (length, aspectRatio) {
  if (length <= 0) return []
  const items = []
  while (length--) {
    items.push(genImage(aspectRatio))
  }
  return items
}