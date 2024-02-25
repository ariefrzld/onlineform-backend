import mongoose from "mongoose";
import Form from "../models/Form.js";
import Answer from "../models/Answer.js";
import answerDuplicate from "../libraries/answerDupllicate.js";
import questionRequiredButEmpty from "../libraries/questionRequiredButEmpty.js";
import optionValueNotExist from "../libraries/optionValueNotExist.js";
import questionIdNotValid from "../libraries/questionIdNotValid.js";
import emailNotValid from "../libraries/emailNotValid.js";

class AnswerController {
  async store(req, res) {
    try {
      if (!req.params.formId) {
        throw { code: 400, message: "REQUIRED_FORM_ID" };
      }
      if (!mongoose.Types.ObjectId.isValid(req.params.formId)) {
        throw { code: 404, message: "INVALID_FORM_ID" };
      }

      const forms = await Form.findById(req.params.formId);
      if (forms) {
        throw { code: 400, message: "FORM_NOT_FOUND" };
      }

      const isDuplicate = await answerDuplicate(req.body.answers);
      if (isDuplicate) {
        throw { code: 400, message: "ANSWER_DUPLICATED" };
      }

      const questionNotValid = await questionIdNotValid(forms, req.body.answers);
      if (questionNotValid.length > 0) {
        throw { code: 400, message: "QUESTION_NOT_FOUND", question: questionNotValid[0].questionId };
      }

      const questionRequiredEmpty = await questionRequiredButEmpty(forms, req.body.answers);
      if (questionRequiredEmpty) {
        throw { code: 428, message: "QUESTION_REQUIRED" };
      }

      const optionNotExist = await optionValueNotExist(forms, req.body.answers);
      if (optionNotExist.length > 0) {
        throw { code: 400, message: "OPTION_VALUE_IS_NOT_EXIST", question: optionNotExist[0].question };
      }

      const emailIsNotValid = await emailNotValid(forms, req.body.answers);
      if (emailIsNotValid.length > 0) {
        throw { code: 400, message: "EMAIL_IS_NOT_VALID", question: emailIsNotValid[0].question };
      }

      let fields = {};
      req.body.answers.forEach((answer) => {
        fields[answer.questionId] = answer.value;
      });

      const newAnswer = await Answer.create({
        userId: req.jwt.id,
        formId: req.params.formId,
        ...fields,
      });
      const answer = await newAnswer.save();
      if (!answer) {
        throw { code: 500, message: "FAILED_ANSWER" };
      }

      return res.status(200).json({ status: true, message: "ANSWER_SUCCESS", answer });
    } catch (error) {
      let returnError = {
        status: false,
        message: error.message,
      };

      if (error.question) {
        returnError.question == error.question;
      }

      return res.status(error.code || 500).json(returnError);
    }
  }
}

export default new AnswerController();
