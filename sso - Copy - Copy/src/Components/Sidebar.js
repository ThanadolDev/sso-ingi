import React, { useState } from "react";
import { GoHome } from "react-icons/go";

export const Sidebar = ({setseller_value,seller_value}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  function handleChangevalue() {
    if (seller_value === "1") {
      setseller_value("0");
    } else {
      setseller_value("1");
    }
  }

  function handleChangevalue1() {
    
      setseller_value("2");
    
  }
  function handleChangevalue3() {
    
    setseller_value("-");
  
}
  return (
    <div
      className={`bg-gray-800 shadow-xl h-16 fixed bottom-0 lg:relative lg:h-screen z-10 w-full content-center transition-all duration-50 ${
        isOpen ? "lg:w-40" : "lg:w-10"
      }`}
    >
      <div className={`lg:mt-12 lg:fixed lg:left-0 lg:top-0 items-center content-center lg:content-start text-left justify-between  ${
        isOpen ? "lg:w-40" : "lg:w-10"
      }`}>
        <button
          onClick={toggleSidebar}
          className={`absolute top-0 right-2 text-white hover:bg-gray-600 rounded-full w-6 h-6 flex items-center hidden justify-center focus:outline-none ${
            isOpen ? "lg:block" : "lg:block"
          }`}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        <ul
          className={`list-reset flex flex-row lg:flex-col lg:pt-3 lg:py-3 lg:px-1 block lg:px-2 text-center lg:text-left w-full ${
            isOpen ? "lg:block" : "lg:hidden"
          }`}
        >
          <li className="lg:mr-3 flex-1 lg:mt-4">
            <a onClick={handleChangevalue} className="hover:pointer block py-1 lg:py-3 pl-1 align-middle text-white no-underline hover:text-white  border-gray-800 hover:bg-gray-600 rounded-xl lg:p-2">
              {/* <i  className="fa fa-envelope pr-0 lg:pr-3"></i> */}
              <span
                className={`pb-1 lg:pb-0 text-xs lg:text-base text-gray-400 lg:text-gray-200 block lg:inline-block `}
              >
                Change Sale {seller_value}
              </span>
            </a>
          </li>
          <li className="lg:mr-3 flex-1 lg:mt-4">
            <a onClick={handleChangevalue1} className="hover:pointer block py-1 lg:py-3 pl-1 align-middle text-white no-underline hover:text-white  border-gray-800 hover:bg-gray-600 rounded-xl lg:p-2">
              {/* <i  className="fa fa-envelope pr-0 lg:pr-3"></i> */}
              <span
                className={`pb-1 lg:pb-0 text-xs lg:text-base text-gray-400 lg:text-gray-200 block lg:inline-block `}
              >
                Change Sale {seller_value}
              </span>
            </a>
          </li>
          <li className="lg:mr-3 flex-1 lg:mt-4">
            <a onClick={handleChangevalue3} className="hover:pointer block py-1 lg:py-3 pl-1 align-middle text-white no-underline hover:text-white  border-gray-800 hover:bg-gray-600 rounded-xl lg:p-2">
              {/* <i  className="fa fa-envelope pr-0 lg:pr-3"></i> */}
              <span
                className={`pb-1 lg:pb-0 text-xs lg:text-base text-gray-400 lg:text-gray-200 block lg:inline-block `}
              >
                Change Sale {seller_value}
              </span>
            </a>
          </li>
        </ul>

        <ul
          className={`list-reset flex flex-row lg:flex-col pt-3 lg:py-3 hidden  px-1 lg:px-2 text-center lg:text-left ${
            isOpen ? "lg:hidden" : "lg:block"
          }`}
        >
          <li className="flex-1 lg:mt-4">
            <a className="block py-1 lg:py-3 pl-1 align-middle text-white no-underline lg:w-full hover:text-white border-b-2 border-gray-800 hover:bg-gray-600 rounded-xl">
              <i onClick={handleChangevalue} className="fa fa-envelope  lg:pr-3"></i>
            </a>
          </li>
        </ul>

      </div>
    </div>
  );
};
