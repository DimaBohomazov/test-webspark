
function minWalk(gridList, startX, startY, endX, endY) {
  const currentGrid = [...gridList].join('').split('')
  const validGridListItem = () => {
    return gridList.filter(e => e.length === gridList[0].length).length === gridList.length
  }
  if (currentGrid.length < 1 || currentGrid.length > 100) {
    throw 'Неверная длинна сетки!'
  } else if (startX > gridList[0].length - 1 || startY > gridList.length - 1 || endX > gridList[0].length - 1 || endY > gridList.length - 1 || startX < 0 || startY < 0 || endX < 0 || endY < 0) {
    throw 'Координаты не входят в заданую сетку!'
  } else if(!validGridListItem()) {
    throw 'Елементы массива заданой сетки должны быть одной длинны!'
  } else {
    const lastX = gridList[0].length - 1
    const lastY = gridList.length - 1

    const setCoords = (y, x) => [y, x]
    const coordsStringify = (array) => array.join('.')

    const startCoords = setCoords(startY, startX)
    const endCoords = setCoords(endY, endX)

    const coordsGrid = []
    for (let i = 0; i <= lastY; i++) {
      for (let j = 0; j <= lastX; j++) {
        coordsGrid.push(setCoords(i, j))
      }
    }

    const coordsGridString = coordsGrid.map(e => coordsStringify(e))

    const moveValidation = (current, next) => {
      const nextIndex = coordsGridString.indexOf(coordsStringify(next))
      const diffBoolean = (a, b) => Math.max(a,b) - Math.min(a,b) === 1
      return ((diffBoolean(current[0], next[0]) && (diffBoolean(current[1], next[1]) || current[1] === next[1])) ||
        (diffBoolean(current[1], next[1]) && (diffBoolean(current[0], next[0]) || current[0] === next[0]))) &&
        currentGrid[nextIndex] !== 'X'
    }

    const shortWayItem = (current, target, array) => {
      const diff = (a, b) => Math.max(a, b) - Math.min(a, b)
      const valid = array.filter(e => {
        return  moveValidation(current, e) && !travel.includes(coordsStringify(e))
      })
      if (!valid.length) {
        return travel[0].split('.')
      }
      const diffArray = valid.map(e => diff(e[0], target[0]) + diff(e[1], target[1]))
      const validIndex = diffArray.indexOf(Math.min(...diffArray))
      return valid[validIndex]
    }

    let currentCoords = [...startCoords]
    let counter = 0
    const travel = [coordsStringify(currentCoords)]

    for (let i = 0; i < currentGrid.length; i++) {
      if (coordsStringify(currentCoords) === coordsStringify(endCoords)) {
        break
      } else {
        if (coordsStringify(currentCoords) === travel[0]) {
          counter = 0
        }
        currentCoords = shortWayItem(currentCoords, endCoords, coordsGrid)
        travel.push(coordsStringify(currentCoords))
        counter++
      }
    }

    const declension = (number, txt, cases = [2, 0, 1, 1, 1, 2]) =>
      txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

    return `Необходимо выполнить ${counter} ${declension(counter, ['шаг', 'шага', 'шагов'])}`
  }
}
const result = minWalk(
  [
    '.X.',
    '.X.',
    '...',
  ],
  2, 1,
  0, 2
);
const p = document.getElementById('result')
p.innerText = result