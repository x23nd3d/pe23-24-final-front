
export const colorAction = (payload) => {
  return {
    type: "color",
    color: payload
  }
}

export default function prodReducer (state, action) {
  switch (action.type) {
    case "color":
      return {...state, color: action.color}
    default:
      return state;
  }
}