

export const SET_PROJECTS=(projects)=>{
  return {
    type:"SET_PROJECTS",
    projects:projects,
  };
};

export const SET_PROJECT_NULL=()=>{
  return {
    type:"SET_PROJECT_NULL",
  }
}

// Action Types
// export const SET_PROJECTS = "SET_PROJECTS";
// export const SET_PROJECT_NULL = "SET_PROJECT_NULL";

// // Action Creators
// export const setProjects = (projects) => {
//   return {
//     type: SET_PROJECTS,
//     projects,
//   };
// };

// export const setProjectNull = () => {
//   return {
//     type: SET_PROJECT_NULL,
//   };
// };
