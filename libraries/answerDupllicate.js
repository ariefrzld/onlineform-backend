const answerDuplicate = async (answers) => {
  var seen = new Set();
  return answers.some((answer) => {
    if (seen.has(answer.questionId)) {
      //duplicated
      return true;
    }
    seen.add(answer.questionId);
  });
};

export default answerDuplicate;
