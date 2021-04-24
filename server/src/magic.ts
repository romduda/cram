const magic = function (str: string): {title: string} {
  const topicTitles: Array<string> = ['Koa', 'Express'];
  const arrOfWords: Array <string> = str.split('\n');
  const scores = topicTitles.map(topic => {
    let score: number = 0;
    arrOfWords.forEach(word => {
      if (word.toLowerCase() === topic.toLowerCase()) score++
    })
    return score;
  })
  console.log('scores: ', scores);
  console.log('Math.max(...scores): ', Math.max(...scores));
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