const initState = {
  currentQuestion: 0,
  score: 0,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case "UPDATE_SCORE":
      return { ...state, score: state.score + 1 };

    case "SET_CURRENT_QUESTION":
      console.log(action.payload);
      return { ...state, currentQuestion: action.payload };

    default:
      return { ...state };
  }
}
