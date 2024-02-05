const questionIdNotValid = async (form, answers) => {
  const found = form.questions.filter((question) => {
    let answer = answers.some((answer) => question.id == answer.questionId);

    if (answer === false) {
      return true;
    }
  });

  return found;
  //   return true;
};

export default questionIdNotValid;
