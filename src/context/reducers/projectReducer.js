
const projectReducer=(state=null,action)=>{
  switch(action.type){
    case "SET_PROJECTS":
      return {
        ...state,
        projects:action.projects,
      }
    case "SET_PROJECT_NULL":
      return {
        ...state,
        projects:null,
      }
    default: return state    
  }
}
export default projectReducer;

// const initialState = {
//   projects: [], // Start with an empty array
// };

// const projectReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_PROJECTS:
//       return {
//         ...state,
//         projects: action.projects,
//       };
//     case SET_PROJECT_NULL:
//       return {
//         ...state,
//         projects: null, // Or use an empty array, depending on your preference
//       };
//     default:
//       return state;
//   }
// };

// export default projectReducer;
