const emailNotValid = async (form, answers) => {
  const found = form.questions.filter((question) => {
    if (question.type == "Email") {
      const answer = answers.find((answer) => answer.questionId == question.id);

      if (question.required === false) {
        if (answer === undefined || answer.value === undefined || answer.value === null || answer.value === "") {
          return false;
        }
      }

      if (answer) {
        if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(answer.value) === false) {
          return true;
        }
      }
    }
  });

  return found;
};

export default emailNotValid;
