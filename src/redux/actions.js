export function updateTestScore() {
  return function (dispatch) {
    dispatch({ type: "UPDATE_SCORE" });
  };
}

export function updateCurrentQuestionValues(question) {
  return function (dispatch) {
    dispatch({ type: "SET_CURRENT_QUESTION", payload: question });
  };
}
