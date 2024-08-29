import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Actions/authActions";
import Nav from "../Components/Navbar";
import MainTable from "../Components/MainTable";
import { Sidebar } from "../Components/Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import axios from "axios";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [seller_value, setseller_value] = React.useState(
    // localStorage.getItem("saleStatus")
  );
  const EMPID = localStorage.getItem("EMP_ID");
  const F_NAME = localStorage.getItem("EMP_FNAME");
  const L_NAME = localStorage.getItem("EMP_LNAME");
  const handleSubmit = () => {
    dispatch(logout());
    navigate("/login");
  };

  function handleChangevalue() {
    if (seller_value === "1") {
      setseller_value("0");
    } else {
      setseller_value("1");
    }
  }

  function Logout() {
    localStorage.removeItem("EMP_ID");
    localStorage.removeItem("EMP_FNAME");
    localStorage.removeItem("EMP_LNAME");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("saleStatus");
    window.location.reload();
  }

  useEffect(() => {
    localStorage.setItem("saleStatus", "");
    const checkSale = async () => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_checkSale,
          { EMP_ID: localStorage.getItem("EMP_ID") }
        );
        const responsePlan = await axios.post(
          process.env.REACT_APP_API_checkPlan,
          { EMP_ID: localStorage.getItem("EMP_ID") }
        );
        
        if (response.data) {
          localStorage.setItem("saleStatus", "1");
          setseller_value("1")
        } else if(responsePlan.data) {
          localStorage.setItem("saleStatus", "0");
          setseller_value("0")
        } else if(responsePlan.data && response.data) {
          localStorage.setItem("saleStatus", "3");
          setseller_value("3")
        } else {
          localStorage.setItem("saleStatus", "2");
          setseller_value("2")
        }
      } catch (error) {
        console.error('Error checking sale:', error);
      }
    };


    checkSale();
  }, []);

  useEffect(() => {
    const storedSaleStatus = localStorage.getItem("saleStatus");
    if (storedSaleStatus !== null) {
      setseller_value(storedSaleStatus);
    }
  }, []);
 
  // useEffect(() => {
  //   window.location.reload();
  // }, [seller_value]);

  return (
    <>
      {/* <Nav /> */}

      <div className="flex flex-col md:flex-row">
        {/* <Sidebar  setseller_value={setseller_value} seller_value={seller_value}/> */}

        <div className="overflow-auto flex-1 bg-gray-100 h-[100vh] pb-12 md:pb-0">
          <div className="w-full lg:mt-0 mt-14 lg:mb-0 mb-2 p-2 h-[calc(100vh-5rem)] md:h-screen">
            <div className="bg-white border-transparent rounded-lg shadow-xl h-[100%] overflow-auto md:p-4">
              <div className="flex justify-end py-2  gap-2 ">
                {" "}
                <div></div>
                <Avatar
                  showFallback
                  src={`https://api.nitisakc.dev/avatar/${EMPID}`}
                />{" "}
                <div className="border-2 border-gray-200 rounded-xl">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="light">
                        {F_NAME + "" + L_NAME} <IoMdArrowDropdown />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        key="new"
                        className="flex"
                        onClick={() => Logout()}
                      >
                        {" "}
                        <div className="flex gap-2 items-center text-red-600  text-lg">
                          <CiLogout />
                          <p className="red-500"> Logout</p>
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              <MainTable setseller_value={setseller_value} seller_value={seller_value}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
