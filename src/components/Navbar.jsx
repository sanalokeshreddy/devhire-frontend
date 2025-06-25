import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 shadow-xl fixed top-0 left-0 right-0 z-50"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-extrabold tracking-wide">
          DevHire <span className="text-yellow-300">AI</span>
        </h1>
        <div className="flex space-x-6 text-sm md:text-base">
          <NavLink
            to="/student"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold underline"
                : "hover:text-yellow-100 transition"
            }
          >
            For Students
          </NavLink>
          <NavLink
            to="/recruiter"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold underline"
                : "hover:text-yellow-100 transition"
            }
          >
            For Recruiters
          </NavLink>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
