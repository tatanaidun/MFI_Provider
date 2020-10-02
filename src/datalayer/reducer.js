export const initialState = {
  data: {},
  schemeNumber: "",
  period: "",
  horizon: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SCHEMENUMBER":
      return { ...state, schemeNumber: action.schemeNumber };
    case "SET_DATA":
      return { ...state, data: action.data };
    case "SET_PERIOD":
      return { ...state, period: action.period };
    case "SET_HORIZON":
      return { ...state, horizon: action.horizon };
    default:
      return state;
  }
};
