import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdBookmark } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Projects = () => {
  const projects = useSelector((state) => state.projects?.projects);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
  );
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setFiltered(
        projects?.filter((project) => {
          const lowercaseItem = project?.title.toLowerCase();
          return searchTerm
            .split("")
            .every((letter) => lowercaseItem.includes(letter));
        })
      );
    } else {
      setFiltered(null);
    }
  }, [searchTerm]);

  return (
    <div className="w-full py-6 flex items-center justify-center gap-6 flex-wrap mt-2">
      {filtered ? (
        <>
          {filtered &&
            filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </>
      ) : (
        <>
          {projects &&
            projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </>
      )}
    </div>
  );
};

// const ProjectCard = ({ project, index }) => {
//   return (
//     <motion.div
//       key={index}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5, delay: 0.3 }}
//       className="w-full cursor-pointer md:w-[370px] h-[300px] bg-secondary rounded-md p-3 flex flex-col items-center justify-center gap-4"
//     >
//       <div className="panel bg-primary w-full h-full rounded-md overflow-hidden">
//         {/* <h2>Output:</h2> */}
//         <iframe
//           srcDoc={project.output}
//           title="output"
//           sandbox="allow-scripts"
//           width="100%"
//           height="100%"
//         />
//       </div>
//       <div className="flex items-center justify-start gap-3 w-full">
//         {/* image section */}
//         <div className="w-12 h-11 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
//           {project?.user?.photoURL ? (
//             <>
//               <motion.img
//                 whileHover={{ scale: 1.1 }}
//                 src={project?.user?.photoUR}
//                 alt={project?.user?.displayName}
//                 referrerPolicy="no-referrer"
//                 className="w-full h-full object-cover"
//               />
//             </>
//           ) : (
//             <p className="text-xl text-white font-semibold capitalize">
//               {project?.user?.email[0]}
//             </p>
//           )}
//         </div>
//         {/* name */}
//         <div>
//           <p className="text-white text-lg capitalize">{project?.title}</p>
//           <p className="text-primaryText text-sm capitalize">
//             {project?.user?.displayName
//               ? project?.user?.displayName
//               : `${project?.user.email.split("@")[0]}`}
//           </p>
//         </div>
//         {/* collection */}
//         <motion.div
//           className="cursor-pointer ml-auto"
//           whileTap={{ scale: 0.9 }}
//         >
//           <MdBookmark className="text-primaryText text-3xl" />
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// const ProjectCard = ({ project }) => {
//   return (
//     <Link
//       to={`/newProject?html=${encodeURIComponent(
//         project.html
//       )}&css=${encodeURIComponent(project.css)}&js=${encodeURIComponent(
//         project.js
//       )}&title=${encodeURIComponent(project.title)}`}
//       className="w-full cursor-pointer md:w-[370px] h-[300px] bg-secondary rounded-md p-3 flex flex-col items-center justify-center gap-4"
//     >
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5, delay: 0.3 }}
//         className="panel bg-primary w-full h-full rounded-md overflow-hidden"
//       >
//         <iframe
//           srcDoc={project.output}
//           title="output"
//           sandbox="allow-scripts"
//           width="100%"
//           height="100%"
//         />
//       </motion.div>
//       <div className="flex items-center justify-start gap-3 w-full">
//         {/* Image Section */}
//         <div className="w-12 h-11 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
//           {project?.user?.photoURL ? (
//             <motion.img
//               whileHover={{ scale: 1.1 }}
//               src={project?.user?.photoURL}
//               alt={project?.user?.displayName}
//               referrerPolicy="no-referrer"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <p className="text-xl text-white font-semibold capitalize">
//               {project?.user?.email[0]}
//             </p>
//           )}
//         </div>
//         {/* Name Section */}
//         <div>
//           <p className="text-white text-lg capitalize">{project?.title}</p>
//           <p className="text-primaryText text-sm capitalize">
//             {project?.user?.displayName
//               ? project?.user?.displayName
//               : `${project?.user.email.split("@")[0]}`}
//           </p>
//         </div>
//         {/* Collection Section */}
//         <motion.div
//           className="cursor-pointer ml-auto"
//           whileTap={{ scale: 0.9 }}
//         >
//           <MdBookmark className="text-primaryText text-3xl" />
//         </motion.div>
//       </div>
//     </Link>
//   );
// };

const ProjectCard = ({ project }) => {
  const user = useSelector((state) => state.user?.user); // Get user state from Redux
  const navigate = useNavigate(); // For manual navigation

  // Function to handle card click
  const handleCardClick = (e) => {
    if (user) {
      // If user is logged in, navigate to the new project with URL parameters
      navigate(
        `/newProject?html=${encodeURIComponent(
          project.html
        )}&css=${encodeURIComponent(project.css)}&js=${encodeURIComponent(
          project.js
        )}&title=${encodeURIComponent(project.title)}`
      );
    } else {
      // If no user is logged in, show an alert
      e.preventDefault();
      alert("Login to view or edit the project");
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full cursor-pointer md:w-[370px] h-[300px] bg-secondary rounded-md p-3 flex flex-col items-center justify-center gap-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="panel bg-primary w-full h-full rounded-md overflow-hidden"
      >
        <iframe
          srcDoc={project.output}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        />
      </motion.div>
      <div className="flex items-center justify-start gap-3 w-full">
        {/* Image Section */}
        <div className="w-12 h-11 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
          {project?.user?.photoURL ? (
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={project?.user?.photoURL}
              alt={project?.user?.displayName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-xl text-white font-semibold capitalize">
              {project?.user?.email[0]}
            </p>
          )}
        </div>
        {/* Name Section */}
        <div>
          <p className="text-white text-lg capitalize">{project?.title}</p>
          <p className="text-primaryText text-sm capitalize">
            {project?.user?.displayName
              ? project?.user?.displayName
              : `${project?.user.email.split("@")[0]}`}
          </p>
        </div>
        {/* Collection Section */}
        <motion.div
          className="cursor-pointer ml-auto"
          whileTap={{ scale: 0.9 }}
        >
          <MdBookmark className="text-primaryText text-3xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
