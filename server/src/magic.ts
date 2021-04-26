import mergeSort from './mergeSort';

const magic = function (str: string): {title: string} {
  const topicTitles: Array<string> = ['Koa', 'Node', 'Express', 'Apollo', 'REST', 'HTTP', 'MongoDB', 'SQL'];
  const arrOfWords: Array <string> = str.split('\n').flatMap(line => line.split(' '));
  const scores = topicTitles.map(topic => {
    let score: number = 0;
    arrOfWords.forEach(word => {
      if (word.toLowerCase() === topic.toLowerCase()) score++
    })
    return score;
  })
  if (Math.max(...scores) === 0) {
    const topic = {
      title: 'Not Found'
    }
    return topic
  }
  const sortedArray = mergeSort(scores);
  const topicTitle = topicTitles[scores.indexOf(sortedArray.pop() as number)];
  const topic = {
    title: topicTitle
  }
  return topic
}

export default magic;