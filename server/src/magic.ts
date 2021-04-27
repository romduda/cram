const magic = function (str: string): {title: string} {
  const topicTitles: Array<string> = ['Koa', 'Node', 'Express', 'GraphQL','Apollo', 'REST', 'HTTP', 'MongoDB', 'SQL'];
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
  const topicTitle = topicTitles[scores.indexOf(Math.max(...scores))];
  const topic = {
    title: topicTitle
  }
  return topic
}

export default magic;