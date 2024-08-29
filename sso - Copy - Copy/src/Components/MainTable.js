import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import debounce from "lodash/debounce";
import { CalendarDate, parseDate } from "@internationalized/date";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import {
  getKeyValue,
  Textarea,
  Radio,
  RadioGroup,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  DatePicker,
  Checkbox,
  Input,
  Switch,
  Chip,
  Tabs,
  Tab,
  Card,
  CardBody,
  CircularProgress,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import Select from "react-select";
import { styled } from "@nextui-org/react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";
import { FaArrowRotateLeft } from "react-icons/fa6";
import Fuse from "fuse.js";
import axios from "axios";
import moment from "moment";
import { now, parseAbsoluteToLocal } from "@internationalized/date";
import { JobCompleteButton } from "./JobCompleteButton";

const initialRows = [
  {
    key: "1",
    due_date: "01-07-2024",
    user_id: "89601",
    user_name: "บริษัท นิคอน (ประเทศไทย) จำกัด",
    seller: "ภิญญดา พรรัชฎากุล",
    Jobnumber: "2450412",
    job_name: "895687-03  6G200295-03 Q1870 BODY-110-2 DISPLAY BOX",
    Prod_order: "1000",
    Prod_planning: "1000",
    Fullfill_order: "900",
    missing_order: "100",
    fixed: "fix",
    Due_work: "2024-10-21",
    urgent: false,
    FG: "100",
    Fixed_date: "2024-10-21",
    Plan_Confirm: "2024-10-21",
  },
  {
    key: "2",
    due_date: "01-07-2024",
    user_id: "89601",
    user_name: "บริษัท นิคอน (ประเทศไทย) จำกัด",
    seller: "ภิญญดา พรรัชฎากุล",
    Jobnumber: "2450412",
    job_name: "895687-03  6G200295-03 Q1870 BODY-110-2 DISPLAY BOX",
    Prod_order: "1000",
    Prod_planning: "1000",
    Fullfill_order: "900",
    missing_order: "100",
    fixed: "fix",
    Due_work: "2024-10-21",
    urgent: true,
    FG: "100",
    Fixed_date: "2024-10-21",
    Plan_Confirm: "2024-10-21",
  },
  {
    key: "3",
    due_date: "01-07-2024",
    user_id: "89601",
    user_name: "บริษัท นิคอน (ประเทศไทย) จำกัด",
    seller: "ภิญญดา พรรัชฎากุล",
    Jobnumber: "2450412",
    job_name: "895687-03  6G200295-03 Q1870 BODY-110-2 DISPLAY BOX",
    Prod_order: "1000",
    Prod_planning: "1000",
    Fullfill_order: "900",
    missing_order: "100",
    fixed: "fix",
    Due_work: "2024-10-21",
    urgent: true,
    FG: "100",
    Fixed_date: "2024-10-21",
    Plan_Confirm: "2024-10-21",
  },
  {
    key: "4",
    due_date: "01-07-2024",
    user_id: "89601",
    user_name: "บริษัท นิคอน (ประเทศไทย) จำกัด",
    seller: "ภิญญดา พรรัชฎากุล",
    Jobnumber: "2450412",
    job_name: "895687-03  6G200295-03 Q1870 BODY-110-2 DISPLAY BOX",
    Prod_order: "1000",
    Prod_planning: "1000",
    Fullfill_order: "900",
    missing_order: "100",
    fixed: "fix",
    Due_work: "2024-10-21",
    urgent: true,
    FG: "100",
    Fixed_date: "2024-10-21",
    Plan_Confirm: "2024-10-21",
  },
];

const columns = [
  {
    id: "INFORM_DATE",
    numeric: false,
    disablePadding: true,
    label: "วันที่ปิด",
    align: "left",
  },
  {
    id: "CUST_NAME",
    numeric: true,
    disablePadding: false,
    label: "ชื่อลูกค้า",
  },
  {
    id: "JOB_ID",
    numeric: true,
    disablePadding: false,
    label: "Job No.",
    align: "center",
  },

  {
    id: "PRODIDREV",
    numeric: true,
    disablePadding: false,
    label: "รหัสผลิตภัณฑ์/รีวิชั่น",
    align: "center",
  },
  {
    id: "PROD_DESC",
    numeric: true,
    disablePadding: false,
    label: "ชื่อผลิตภัณฑ์",
  },

  // {
  //   id: "REVISION",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "REVISION",
  //   align: "center",
  // },
  // {
  //   id: "SEQ",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "SEQ",
  //   align: "center",
  // },
  // {
  //   id: "CUST_ID",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "รหัสลูกค้า",
  //   align: "center",
  // },
  // {
  //   id: "CUST_NAME",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "ชื่อลูกค้า",
  // },
  {
    id: "QUANTITY",
    numeric: true,
    disablePadding: false,
    label: "จำนวนที่ลูกค้าสั่ง",
    align: "right",
  },
  {
    id: "P_QUAN",
    numeric: true,
    disablePadding: false,
    label: "จำนวนสั่งผลิต ",
    align: "right",
  },
  {
    id: "PRODUCE_QTY",
    numeric: true,
    disablePadding: false,
    label: "จำนวนผลิตได้",
    align: "right",
  },
  {
    id: "Missing_QTY",
    numeric: true,
    disablePadding: false,
    label: "จำนวนที่ขาดจำนวนไม่คำนวน fg ลอย",
    align: "right",
  },
  {
    id: "STOCK_QTY",
    numeric: true,
    disablePadding: false,
    label: "FGลอย",
    align: "right",
  },

  {
    id: "Missing_QTY_withFG",
    numeric: true,
    disablePadding: false,
    label: "จำนวนที่ขาดจำนวน",
    align: "right",
  },
  {
    id: "EMP_FNAME",
    numeric: true,
    disablePadding: false,
    label: "พนักงานขาย",
    align: "center",
  },
  {
    id: "REPAIR_FLAG",
    numeric: true,
    disablePadding: false,
    label: "ซ่อม/ไม่ซ่อม",
    align: "center",
  },
  {
    id: "URGENT_DATE",
    numeric: true,
    disablePadding: false,
    label: "ความเร่งด่วน ",
    align: "center",
  },
  {
    id: "JOB_REPAIR__DATE",
    numeric: true,
    disablePadding: false,
    label: "วันที่เปิดซ่อม",
  },

  {
    id: "PLAN_CONFIRM_DATE",

    numeric: true,
    disablePadding: false,
    label: "วันที่ plan confirm",
  },
  {
    id: "REMARK",
    // numeric: true,
    disablePadding: false,
    label: "หมายเหตุ",
  },
  {
    id: "COMPLETE_FLAG",
    // numeric: true,
    disablePadding: false,
    label: "เสร็จงาน",
    align: "center",
  },
];

export default function MainTable({ setseller_value, seller_value }) {
  const [selectionBehavior, setSelectionBehavior] = useState("replace");
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = useState("center");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [rows, setRows] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [Loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [saleData, setsaleData] = useState([]);
  const [cusData, setcusData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [inputValue, setInputValue] = useState();

  // useEffect(() => {
  //   const storedSaleStatus = localStorage.getItem("saleStatus");
  //   if (storedSaleStatus !== null) {
  //     setseller_value(storedSaleStatus);
  //   }
  // }, []);

  // const [seller_value, setsellervalue] = useState(seller_value_top)
  // const seller_value = 1;
  // const [seller_value, setseller_value] = useState(
  //   localStorage.getItem("saleStatus")
  // );
  const [currentRowData, setCurrentRowData] = useState(rows);
  moment.locale("th");
  const inputRef = useRef();

  const handleUrgentChange = (key) => {
    console.log(key);
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.key === key ? { ...row, urgent: !row.urgent } : row
      )
    );
  };

  // const items = React.useMemo(() => {
  //   if (!currentRowData) return [];
  //   const start = page * rowsPerPage;
  //   const end = start + rowsPerPage;
  //   return currentRowData.slice(start, end);
  // }, [page, rowsPerPage, currentRowData]);

  useEffect(() => {
    if (!rows) return;
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const newItems = rows.slice(start, end);
    setItems(newItems);
  }, [page, rowsPerPage]);

  useEffect(() => {
    setCurrentRowData(rows);
  }, [rows]);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function formatNumberWithCommas(number) {
    return new Intl.NumberFormat("en-US").format(number);
  }

  function formatNumberNegative(P_QUAN, PRODUCE_QTY, STOCK_QTY) {
    const quantity = P_QUAN - (PRODUCE_QTY + STOCK_QTY);
    // const formattedQuantity = formatNumberWithCommas(quantity);
    if (quantity < 0) {
      return "-";
    } else {
      return formatNumberWithCommas(quantity);
    }
  }

  async function getData() {
    try {
      setLoading(true);
      const res = await axios.get(process.env.REACT_APP_API_GET_DATA);
      // console.log(res.data);
      setRows(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  const debouncedSearch = debounce((value) => {
    setSearchValue(value);
  }, 300); // Adjust debounce delay as needed

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    getData();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    const loadSale = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_loadSale);
        console.log(response.data);
        const formattedSaleData = response.data.result_sale.rows.map(
          (item) => ({
            value: item[0],
            label: item[1],
          })
        );
        const formattedCusData = response.data.result_cus.rows.map((item) => ({
          value: item[0],
          label: item[1],
        }));
        setsaleData(formattedSaleData);
        setcusData(formattedCusData);
        // if (response.data) {
        //   localStorage.setItem("saleStatus", "1");
        // } else {
        //   localStorage.setItem("saleStatus", "0");
        // }
        // console.log(response.data)
      } catch (error) {
        console.error("Error checking sale:", error);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    loadSale();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const initialOpenState = items.reduce((acc, item, index) => {
      acc[index] = true;
      return acc;
    }, {});
    // setOpenAccordions(initialOpenState);
  }, [items]);

  const toggleAccordion = (index) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const onSearchClear = () => {
    getData();
  };

  const onSearch = async (sale, cus, com) => {
    console.log(sale)
    console.log(cus)
    console.log(searchValue)
    if (!searchValue && !cus && !sale && com == "false") {
      getData();
      return;
    }
    if (searchValue == '' && cus == '' && sale == '' && com == '') {
      getData();
      return;
    }
    setLoading(true);
    // getData();
    let mappedResults;
    const data = {
      sale: sale,
      cus: cus,
      com: com,
    };
    // if (sale) {
    //   const extractFirstName = (fullName) => fullName.split("  ")[0];
    //   const name = extractFirstName(sale);
    //   const fuse2 = new Fuse(rows, {
    //     keys: ["EMP_FNAME"],
    //   });
    //   const result2 = fuse2.search(name);
    //   console.log(result2);
    //   mappedResults = result2.map((item) => item.item);
    // }
    // if (cus) {
    //   const fuse3 = new Fuse(rows, {
    //     keys: ["CUST_NAME"],
    //   });
    //   const result3 = fuse3.search(cus);
    //   mappedResults = result3.map((item) => item.item);
    // }
    if (cus || sale || com == "true" || com || "all") {
      const res = await axios.post(
        process.env.REACT_APP_API_searchinsuff,
        data
      );
      // toast.success("Successfully Saved!");
      console.log(res.data);
      let rows = res.data;

      if (searchValue) {
        const fuse = new Fuse(rows, {
          keys: ["JOB_ID", "PROD_DESC","CUST_NAME"],
        });
        const result = fuse.search(searchValue);
        rows = result.map((item) => item.item); // Update rows with search results
      }
      setRows(rows);
    } else {
      const fuse = new Fuse(rows, {
        keys: ["JOB_ID", "PROD_DESC","CUST_NAME"],
      });
      const result = fuse.search(searchValue);
      mappedResults = result.map((item) => item.item);
      setRows(mappedResults);
    }
    // if (searchValue) {
    //   const fuse = new Fuse(rows, {
    //     keys: ["JOB_ID", "PROD_DESC"],
    //   });
    //   const result = fuse.search(searchValue);
    //   mappedResults = result.map((item) => item.item);
    // }

    // const extractFirstName = (fullName) => fullName.split(' ')[0];
    // if (sale) {
    //   mappedResults = mappedResults.filter((row) => extractFirstName(row.EMP_FNAME).includes(sale));
    // }
    // if (cus) {
    //   mappedResults = mappedResults.filter((row) => row.CUST_NAME.includes(cus));
    // }

    // setRows(mappedResults);
    console.log(mappedResults);
    setLoading(false);
  };
  
  const formatMobileValue = (id, value,revision, REMARK) => {
    switch (id) {
      case "PRODIDREV":
          // return `${removeLeadingZeros(row.PRODIDREV)}/${row.REVISION}`;
          return `${removeLeadingZeros(value)}/${revision}`;
          case "REMARK":
            return REMARK
              ? REMARK.length > 20
                ? `${REMARK.substring(0, 20)}...`
                : REMARK
              : "ไม่ระบุ";
      case "INFORM_DATE":
      case "URGENT_DATE":
      case "JOB_REPAIR__DATE":
      case "PLAN_CONFIRM_DATE":
        return value
          ? moment(value).add(543, "years").format("DD/MM/YYYY")
          : "ไม่ระบุ";
      case "QUANTITY":
      case "P_QUAN":
      case "PRODUCE_QTY":
      case "STOCK_QTY":
        return formatNumberWithCommas(value);
      case "REPAIR_FLAG":
        return value === "F" ? "ซ่อม" : value === "N" ? "ไม่ซ่อม" : "-";
      case "COMPLETE_FLAG":
        return value === "T" ? "COMPLETE" :  "ไม่ COMPLETE";
      default:
        return value || "ไม่ระบุ";
    }
  };

  const MobileEditModal = ({ isOpen, onClose, item, onSave }) => {
    const [editedItem, setEditedItem] = useState(item);

    const handleChange = (id, value) => {
      setEditedItem((prev) => ({ ...prev, [id]: value }));
    };

    console.log(editedItem);

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Edit </ModalHeader>
          <ModalBody>
            <Tabs>
              <Tab key="repair" title="ซ่อม/ไม่ซ่อม">
                <RadioGroup
                  // value={edit}
                  onValueChange={(value) => handleChange("REPAIR_FLAG", value)}
                >
                  <Radio value="N">ไม่ซ่อม</Radio>
                  <Radio value="-">ไม่ซ่อม</Radio>
                  <Radio value="F">ซ่อม</Radio>
                </RadioGroup>
              </Tab>
              <Tab key="dates" title="วันที่">
                {JSON.stringify(editedItem)}
                <DatePicker
                  label="วันที่เร่งด่วน"
                  value={
                    editedItem.URGENT_DATE
                      ? parseAbsoluteToLocal(editedItem.URGENT_DATE)
                      : null
                  }
                  onChange={(date) => handleChange("URGENT_DATE", date)}
                />
                <DatePicker
                  label="วันที่ซ่อม"
                  value={
                    editedItem.JOB_REPAIR__DATE
                      ? parseAbsoluteToLocal(editedItem.JOB_REPAIR__DATE)
                      : null
                  }
                  onChange={(date) => handleChange("JOB_REPAIR__DATE", date)}
                />
                <DatePicker
                  label="วันที่ยืนยันแผน"
                  value={
                    editedItem.PLAN_CONFIRM_DATE
                      ? parseAbsoluteToLocal(editedItem.PLAN_CONFIRM_DATE)
                      : null
                  }
                  onChange={(date) => handleChange("PLAN_CONFIRM_DATE", date)}
                />
              </Tab>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => onSave(editedItem)}>
              Save
            </Button>
            <Button color="danger" variant="light" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const openEditModal = (item) => {
    console.log(item);
    setCurrentEditItem(item);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentEditItem(null);
  };

  const handleSaveMobileEdit = async (editedItem) => {
    closeEditModal();
  };

  const handleSubmitPhone = (e) => {
    e.preventDefault();
    // console.log("Form submitted with:", {
    //   jobID: searchValue,
    // });
    // if(searchValue == ''){
    //   getData()
    // }
    onSearch('','','false');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted with:", {
    //   sale: e.target.sale.value,
    //   customer: e.target.customer.value,
    //   com: e.target.com.value,
    //   jobID: searchValue,
    // });
    setIsSearchActive(false)
    onSearch(e.target.sale.value, e.target.customer.value, e.target.com.value);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearchClear();
  };

  const removeLeadingZeros = (input) => {
    return input.replace(/^0+/, "");
  };

  async function updateFix(Fix, JOB_ID, PROD_ID, REVISION, SEQ) {
    try {
      console.log(Fix, JOB_ID, PROD_ID, REVISION, SEQ);
      const data = {
        Fix,
        JOB_ID,
        PROD_ID,
        REVISION,
        SEQ,
      };
      setCurrentEditItem((prev) => ({
        ...prev,
        REPAIR_FLAG: Fix,
      }));
  
      setCurrentRowData((prevData) =>
        prevData.map((row) => {
          if (
            row.JOB_ID === JOB_ID &&
            row.PROD_ID === PROD_ID &&
            row.REVISION === REVISION &&
            row.SEQ === SEQ
          ) {
            return { ...row, REPAIR_FLAG: Fix };
          }
          return row;
        })
      );
      console.log(data);
      await axios.put(process.env.REACT_APP_API_UPDATE_FIX, data);
      toast.success("Successfully Saved!");
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  async function updateUrgentDate(date, JOB_ID, PROD_ID, REVISION, SEQ) {
    try {
      // const isoDate =
      //   date instanceof CalendarDate
      //     ? date.toDate(Intl.DateTimeFormat().resolvedOptions()).toISOString()
      //     : new Date(
      //         Date.UTC(date.year, date.month - 1, date.day)
      //       ).toISOString();

      function isoDate(date) {
        if (date.timeZone) {
          return new Date(
            Date.UTC(date.year, date.month - 1, date.day)
          ).toISOString();
        } else {
          return new Date(
            Date.UTC(date.year, date.month - 1, date.day)
          ).toISOString();
        }
      }

      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        return `${year}-${month}-${day} 00:00:00`;
      };

      const formattedDate = formatDate(isoDate(date));
      const data = {
        date: formattedDate,
        JOB_ID,
        PROD_ID,
        REVISION,
        SEQ,
      };
      console.log(date);
      console.log(isoDate);
      setCurrentEditItem((prev) => ({
        ...prev,
        URGENT_DATE: isoDate(date),
      }));
      setCurrentRowData((prevData) =>
        prevData.map((row) => {
          if (
            row.JOB_ID === JOB_ID &&
            row.PROD_ID === PROD_ID &&
            row.REVISION === REVISION &&
            row.SEQ === SEQ
          ) {
            return { ...row, URGENT_DATE: isoDate(date) };
          }
          return row;
        })
      );
      await axios.put(process.env.REACT_APP_API_UPDATE_UrgentDate, data);
      // toast.success("Successfully Saved!");
    } catch (e) {
      console.log(e);
      toast.error(e);
    } finally {
      // toast.success("Successfully Saved!");
    }
  }

  async function updateJobRepairDate(date, JOB_ID, PROD_ID, REVISION, SEQ) {
    try {
      console.log(date);
      function isoDate(date) {
        if (date.timeZone) {
          return new Date(
            Date.UTC(date.year, date.month - 1, date.day)
          ).toISOString();
        } else {
          return new Date(
            Date.UTC(date.year, date.month - 1, date.day)
          ).toISOString();
        }
      }

      console.log(isoDate(date));
      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        return `${year}-${month}-${day} 00:00:00`;
      };

      const formattedDate = formatDate(isoDate(date));
      const data = {
        date: formattedDate,
        JOB_ID,
        PROD_ID,
        REVISION,
        SEQ,
      };
      console.log(data);
      setCurrentEditItem((prev) => ({
        ...prev,
        JOB_REPAIR__DATE: isoDate(date),
      }));
      setCurrentRowData((prevData) =>
        prevData.map((row) => {
          if (
            row.JOB_ID === JOB_ID &&
            row.PROD_ID === PROD_ID &&
            row.REVISION === REVISION &&
            row.SEQ === SEQ
          ) {
            return { ...row, JOB_REPAIR__DATE: isoDate(date) };
          }
          return row;
        })
      );
      await axios.put(
        process.env.REACT_APP_API_UPDATE_updateJobRepairDate,
        data
      );
      // toast.success("Successfully Saved!");
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  const handleSaveFix = async (JOB_ID, PROD_ID, REVISION, SEQ) => {
    try {
      const inputValue = inputRef.current.value;
      let hasChanges = false; 
      setCurrentEditItem((prev) => ({
        ...prev,
        REMARK: inputValue,
      } 
      
    ));
    // hasChanges = true; 
    setCurrentRowData((prevData) =>
        prevData.map((row) => {
          if (
            row.JOB_ID === JOB_ID &&
            row.PROD_ID === PROD_ID &&
            row.REVISION === REVISION &&
            row.SEQ === SEQ
          ) {
            if (row.REMARK !== inputValue) {
              hasChanges = true;
              return { ...row, REMARK: inputValue };
            }
          }
          return row;
        })
      );

      
      const data = {
        REMARK: inputValue,
        JOB_ID,
        PROD_ID,
        REVISION,
        SEQ,
      };
  
      await axios.put(process.env.REACT_APP_API_UPDATE_updateREMARK, data);
      // console.log("Saved value:", inputValue);
      if (hasChanges) {
        
        //  toast.success("Successfully Saved!");
      }
  
     
    } catch (e) {
      console.log(e);
    }
  };
  

  async function updatePlanConfirmDate(date, JOB_ID, PROD_ID, REVISION, SEQ) {
    try {
      console.log(date);
      function isoDate(date) {
        if (date.timeZone) {
          return new Date(
            Date.UTC(date.year, date.month - 1, date.day)
          ).toISOString();
        } else {
          return new Date(
            Date.UTC(date.year, date.month - 1, date.day)
          ).toISOString();
        }
      }
      console.log(isoDate);
      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        return `${year}-${month}-${day} 00:00:00`;
      };

      const formattedDate = formatDate(isoDate(date));

      const data = {
        date: formattedDate,
        JOB_ID,
        PROD_ID,
        REVISION,
        SEQ,
      };
      console.log(data);
      setCurrentEditItem((prev) => ({
        ...prev,
        PLAN_CONFIRM_DATE:  isoDate(date) ,
      }));
      setCurrentRowData((prevData) =>
        prevData.map((row) => {
          if (
            row.JOB_ID === JOB_ID &&
            row.PROD_ID === PROD_ID &&
            row.REVISION === REVISION &&
            row.SEQ === SEQ
          ) {
            return { ...row, PLAN_CONFIRM_DATE: isoDate(date) };
          }
          return row;
        })
      );
      await axios.put(
        process.env.REACT_APP_API_UPDATE_updatePlanConfirmDate,
        data
      );
      // toast.success("Successfully Saved!");
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  async function completeJob(JOB_ID, PROD_ID, REVISION, SEQ) {
    try {
      const data = {
        JOB_ID,
        PROD_ID,
        REVISION,
        SEQ,
      };
      setCurrentRowData((prevData) =>
        prevData.filter(
          (row) =>
            !(
              row.JOB_ID === JOB_ID &&
              row.PROD_ID === PROD_ID &&
              row.REVISION === REVISION &&
              row.SEQ === SEQ
            )
        )
      );
      await axios.put(process.env.REACT_APP_API_UPDATE_completeJob, data);
      closeEditModal()
      toast.success("Successfully Saved!");
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  const renderDesktopView = () => (
    <>
      <div className="text-4xl">รายงานแจ้งงานขาดจำนวนและแจ้งซ่อม</div>

      <div className="ml-auto flex">
       
        <div>
          
        </div>
        <div className="flex gap-2">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="">
              {/* <label htmlFor="job" className="z-[41] ">
                Select job
              </label> */}
              <Select
                id="com"
                className="w-64 z-[41] "
                classNamePrefix="select"
                name="com"
                // isSearchable={true}
                // isClearable={true}
                defaultValue={{ value: false, label: "งานที่ยังไม่เสร็จ" }}
                options={[
                  { value: false, label: "งานที่ยังไม่เสร็จ" },
                  { value: true, label: "งานที่เสร็จ" },
                  { value: "all", label: "งานทั้งหมด" },
                ]}
                placeholder={"com..."}
              />
            </div>
            <div className="">
              {/* <label htmlFor="sale" className="z-[41] ">
                Search Sale
              </label> */}
              <Select
                id="sale"
                className="w-64 z-[41] "
                classNamePrefix="select"
                name="sale"
                isSearchable={true}
                isClearable={true}
                options={saleData}
                placeholder={"ค้นหาพนักงานขาย"}
              />
            </div>
            <div className="">
              {/* <label htmlFor="customer" className="z-[41] ">
                Search Customer
              </label> */}
              <Select
                id="customer"
                className="w-64 z-[41] "
                classNamePrefix="select"
                name="customer"
                isSearchable={true}
                isClearable={true}
                options={cusData}
                placeholder={"ค้นหาลูกค้า"}
              />
            </div>
            <div className="">
              {/* <label htmlFor="jobNo" className="">
                Search Job No
              </label> */}
              <Input
                id="jobNo"
                isClearable
                className="w-64 lm:max-w-[44%] "
                placeholder="ค้นหา"
                startContent={<FaSearch />}
                onChange={handleChange}
                onClear={() => setSearchValue('')}
                variant="bordered"
              />
            </div>
            <Button
              className="mt-auto"
              type="submit"
              color="primary"
              variant="ghost"
            >
              ค้นหา
            </Button>
          </form>
        </div>
      </div>

      <Paper>
        <TableContainer sx={{ height: "70vh" }}>
          <Table stickyHeader size="small">
            <TableHead
              className="sticky"
              style={{
                zIndex: 30,
              }}
            >
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                  
                    style={{
                      minWidth:
                        column.id === "PROD_DESC"
                          ? 250
                          : column.id === "CUST_NAME"
                          ? 200
                          : column.id === "REMARK" 
                        ? 350 
                        : 125,
                      maxWidth:
                        column.id === "PROD_DESC"
                          ? 250
                          : column.id === "CUST_NAME"
                          ? 200
                          : column.id === "REMARK" 
                        ? 350 
                          : 125,
                      borderRight: "1px solid #ededdd",
                      backgroundColor: "#ededed",
                      zIndex: 30,
                      // whiteSpace: "nowrap",
                      // overflow: "hidden",
                      // textOverflow: "ellipsis",
                      ...([
                        "INFORM_DATE",
                        "JOB_ID",
                        "PROD_DESC",
                        "PRODIDREV",
                        "SEQ",
                        "CUST_ID",
                        "CUST_NAME",
                      ].includes(column.id) && {
                        position: "sticky",
                        left: {
                          INFORM_DATE: 0,
                          CUST_NAME: 80,
                          JOB_ID: 250,
                          PRODIDREV: 375,
                          PROD_DESC: 480,
                          CUST_ID: 670,
                        }[column.id],
                        backgroundColor: "white",
                        zIndex: 40,
                        boxShadow: "10px 10px 15px rgb(0 0 0 / 0.05)",
                      }),
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                {/* <TableCell
                  key={"Plan_1"}
                  align={"center"}
                  style={{
                    backgroundColor: "#ededed",
                    // zIndex: 100,
                    // position: "sticky",
                    // right: 0,
                  }}
                >
                  pan
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {Loading ? (
                <div className="w-full h-full flex fixed top-0 left-0 bg-white opacity-75 z-50 justify-center items-center ">
                  <CircularProgress size="lg" />
                </div>
              ) : (
                currentRowData &&
                currentRowData.length > 0 &&
                currentRowData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <>
                            <TableCell
                              // size="small"
                              aria-label="sticky table"
                              key={column.id}
                              align={column.align}
                              style={{
                                maxWidth: 
                                column.id === "PROD_DESC" 
                                  ? 250 
                                  : column.id === "REMARK" 
                                    ? 350 
                                    : 200,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",

                                ...([
                                  "INFORM_DATE",
                                  "JOB_ID",
                                  "PROD_DESC",
                                  "PRODIDREV",
                                  "CUST_ID",
                                  "CUST_NAME"
                                ].includes(column.id) && {
                                  position: "sticky",
                                  left: {
                                    INFORM_DATE: 0,
                                    CUST_NAME: 80,
                                    JOB_ID: 250,
                                    PRODIDREV: 375,
                                    PROD_DESC: 480,
                                    CUST_ID: 670,
                                  }[column.id],
                                  backgroundColor: "white",
                                  zIndex: 11,
                                  boxShadow: "10px 10px 15px rgb(0 0 0 / 0.05)",
                                }),

                                // ...([
                                //   "REMARK"
                                // ].includes(column.id) && {
                                // maxWidth: 200,
                                // whiteSpace: "nowrap",
                                // overflow: "hidden",
                                // textOverflow: "ellipsis",
                                // }),

                                ...([
                                  "REPAIR_FLAG",
                                  "COMPLETE_FLAG",
                                  "URGENT_DATE",
                                  "REMARK",
                                ].includes(column.id) &&
                                  seller_value === "1" && {
                                    backgroundColor: "#ddffdd",
                                  }),

                                ...([
                                  "JOB_REPAIR__DATE",
                                  "PLAN_CONFIRM_DATE",
                                  "REMARK",
                                ].includes(column.id) &&
                                  seller_value === "0" && {
                                    backgroundColor: "#ddffdd",
                                  }),
                              }}
                            >
                              {column.id === "REPAIR_FLAG" ? (
                                <div className="flex w-full flex-col">
                                  <Tabs
                                    selectedKey={
                                      row.REPAIR_FLAG === null
                                        ? "-"
                                        : row.REPAIR_FLAG
                                    }
                                    aria-label="Options"
                                    onSelectionChange={(e) =>
                                      updateFix(
                                        e,
                                        row.JOB_ID,
                                        row.PROD_ID,
                                        row.REVISION,
                                        row.SEQ
                                      )
                                    }
                                    isDisabled={
                                      (seller_value === "0" ||
                                        seller_value === "2" ||
                                        row.COMPLETE_FLAG === "T") &&
                                      seller_value !== "3"
                                    }
                                    classNames={{
                                      tabList:
                                        "  data-[disabled=true]:opacity-100 ",
                                      cursor:
                                        " data-[disabled=true]:opacity-100",
                                      tab: " data-[disabled=true]:opacity-100",
                                      tabContent:
                                        "data-[disabled=true]:opacity-100",
                                    }}
                                  >
                                    <Tab
                                      key="N"
                                      title="ไม่ซ่อม"
                                      isDisabled={row.JOB_REPAIR__DATE}
                                      classNames={{
                                        tabList:
                                          "  data-[disabled=true]:opacity-100  ",
                                        cursor:
                                          "group-data-[selected=true]:bg-red-300",
                                        tab: " data-[disabled=true]:opacity-100 ",
                                        tabContent:
                                          "data-[disabled=true]:opacity-100 ",
                                      }}
                                    />
                                    <Tab key="-" title="-" isDisabled={true} />
                                    <Tab
                                      key="F"
                                      title="ซ่อม"
                                      classNames={{
                                        tabList:
                                          "  data-[disabled=true]:opacity-100 ",
                                        cursor:
                                          "group-data-[selected=true]:bg-green-300 data-[disabled=true]:opacity-100",
                                        tab: " data-[disabled=true]:opacity-100",
                                        tabContent:
                                          "data-[disabled=true]:opacity-100",
                                      }}
                                    />
                                  </Tabs>
                                </div>
                              ) : column.id === "INFORM_DATE" ? (
                                <div>
                                  {moment(row.INFORM_DATE)
                                    .add(543, "years")
                                    .format("DD/MM/YYYY")}
                                </div>
                              ) : column.id === "PLAN_CONFIRM_DATE" ? (
                                <DatePicker
                                  // className="max-w-[284px]"
                                  className={`
                                    max-w-[284px]
                                  `}
                                  aria-label="Due date"
                                  defaultValuevalue={
                                    row.PLAN_CONFIRM_DATE !== null
                                      ? parseAbsoluteToLocal(
                                          row.PLAN_CONFIRM_DATE
                                        )
                                      : null
                                  }
                                  onChange={(e) =>
                                    updatePlanConfirmDate(
                                      e,
                                      row.JOB_ID,
                                      row.PROD_ID,
                                      row.REVISION,
                                      row.SEQ
                                    )
                                  }
                                  isDisabled={
                                    (!row.JOB_REPAIR__DATE ||
                                      seller_value === "1" ||
                                      seller_value === "2" ||
                                      row.COMPLETE_FLAG === "T") &&
                                    seller_value !== "3"
                                  }
                                  value={
                                    row.PLAN_CONFIRM_DATE !== null
                                      ? parseAbsoluteToLocal(
                                          row.PLAN_CONFIRM_DATE
                                        )
                                      : null
                                  }
                                  granularity="day"
                                />
                              ) : column.id === "URGENT_DATE" ? (
                                <div className="flex items-center">
                                  <DatePicker
                                    value={
                                      row.URGENT_DATE !== null
                                        ? parseAbsoluteToLocal(row.URGENT_DATE)
                                        : null
                                    }
                                    className={`
                                      max-w-[284px]

                                   
                                    `}
                                    granularity="day"
                                    onChange={(e) =>
                                      updateUrgentDate(
                                        e,
                                        row.JOB_ID,
                                        row.PROD_ID,
                                        row.REVISION,
                                        row.SEQ
                                      )
                                    }
                                    isDisabled={
                                      ((row.REPAIR_FLAG !== "NF" &&
                                        row.REPAIR_FLAG !== "F") ||
                                        seller_value === "0" ||
                                        seller_value === "2" ||
                                        row.COMPLETE_FLAG === "T") &&
                                      seller_value !== "3"
                                    }
                                  />
                                </div>
                              ) : column.id === "JOB_REPAIR__DATE" ? (
                                <div className="flex items-center">
                                  <DatePicker
                                    value={
                                      row.JOB_REPAIR__DATE !== null
                                        ? parseAbsoluteToLocal(
                                            row.JOB_REPAIR__DATE
                                          )
                                        : null
                                    }
                                    className={`
                                      max-w-[284px]
                                     
                                    `}
                                    granularity="day"
                                    onChange={(e) =>
                                      updateJobRepairDate(
                                        e,
                                        row.JOB_ID,
                                        row.PROD_ID,
                                        row.REVISION,
                                        row.SEQ
                                      )
                                    }
                                    isDisabled={
                                      (!row.URGENT_DATE ||
                                        seller_value === "1" ||
                                        seller_value === "2" ||
                                        row.COMPLETE_FLAG === "T") &&
                                      seller_value !== "3"
                                    }
                                  />
                                </div>
                              ) : column.id === "Prod_order" ? (
                                <div>
                                  {formatNumberWithCommas(row.Prod_order)}
                                </div>
                              ) : column.id === "QUANTITY" ? (
                                <div>
                                  {formatNumberWithCommas(row.QUANTITY)}
                                </div>
                              ) : column.id === "STOCK_QTY" ? (
                                <div>
                                  {formatNumberWithCommas(row.STOCK_QTY)}
                                </div>
                              ) : column.id === "PRODUCE_QTY" ? (
                                <div>
                                  {formatNumberWithCommas(row.PRODUCE_QTY)}
                                </div>
                              ) : column.id === "P_QUAN" ? (
                                <div>{formatNumberWithCommas(row.P_QUAN)}</div>
                              ) : column.id === "PRODIDREV" ? (
                                <div>
                                  {removeLeadingZeros(row.PRODIDREV)}/
                                  {row.REVISION}
                                </div>
                              ) : column.id === "Missing_QTY" ? (
                                <div>
                                  {formatNumberWithCommas(
                                    row.P_QUAN - row.PRODUCE_QTY
                                  )}
                                </div>
                              ) : column.id === "Missing_QTY_withFG" ? (
                                <div>
                                  {formatNumberNegative(
                                    row.P_QUAN,
                                    row.PRODUCE_QTY,
                                    row.STOCK_QTY
                                  )}
                                </div>
                              ) : column.id === "REMARK" ? (
                                <div>
                                  {((seller_value === "0" ||
                                  seller_value === "1" ) && 
                                    row.COMPLETE_FLAG != "T") &&
                                  seller_value !== "3" ? (
                                    <Popover
                                      placement="bottom"
                                      showArrow
                                      offset={10}
                                      backdrop="blur"
                                      // onClose={handleSaveFix}
                                      onClose={(e) =>
                                        handleSaveFix(
                                          row.JOB_ID,
                                          row.PROD_ID,
                                          row.REVISION,
                                          row.SEQ
                                        )
                                      }
                                    >
                                      <PopoverTrigger>
                                        <div
                                          color=""
                                          className="flex items-center justify-center"
                                        >
                                          <div>
                                            {row.REMARK ? (
                                              <div className="flex items-center max-w-[280px]">
                                                <div className="truncate">
                                                {row.REMARK}
                                              </div>
                                              </div>
                                            ) : (
                                              <Input
                                                variant="underlined"
                                                isReadOnly
                                              />
                                            )}{" "}
                                          </div>{" "}
                                          <div
                                            variant="ghost"
                                            className="p-1 border-1 rounded-xl text-xl ml-auto mr-2 bg-white"
                                          >
                                            <CiEdit />
                                          </div>
                                        </div>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-[500px]">
                                        {(titleProps) => (
                                          <div className="px-1 py-2 w-full">
                                            {/* <p
                                            className="text-small font-bold text-foreground"
                                            {...titleProps}
                                          >
                                            Dimensions
                                          </p> */}
                                            <div className="mt-2 flex flex-col gap-2 w-full">
                                              <Textarea
                                                // defaultValue="100%"
                                                // label="Width"
                                                defaultValue={row.REMARK}
                                                size="sm"
                                                variant="bordered"
                                                ref={inputRef}
                                                fullWidth={true}
                                                // maxLength={9}
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </PopoverContent>
                                    </Popover>
                                  ) : (
                                    <div className="max-w-[300px] overflow-hidden whitespace-nowrap overflow-ellipsis"> {row.REMARK}</div>
                                  )}
                                </div>
                              ) : column.id === "COMPLETE_FLAG" ? (
                                <div className="flex items-center gap-2">
                                  {/* <Button
                                    color=""
                                    variant="solid"
                                    className="hover:bg-green-300 hover:border-green-300  border-3 "
                                    onClick={() =>
                                      completeJob(
                                        row.JOB_ID,
                                        row.PROD_ID,
                                        row.REVISION,
                                        row.SEQ
                                      )
                                    }
                                    isDisabled={seller_value === "0"}
                                  >
                                    {" "}
                                    <div className="text-xl">
                                      <MdDownloadDone />{" "}
                                    </div>
                                    Complete
                                  </Button> */}
                                  <JobCompleteButton
                                    row={row}
                                    completeJob={completeJob}
                                    seller_value={seller_value}
                                  />
                                </div>
                              ) : (
                                value
                              )}
                            </TableCell>
                          </>
                        );
                      })}

                      {/* <TableCell key={"Plan_1"}>
                        <div className="flex items-center gap-2">
                          <Button
                            color=""
                            variant="solid"
                            className="hover:bg-green-300 hover:border-green-300  border-3 "
                            onClick={completeJob}
                          >
                            {" "}
                            <div className="text-xl">
                              <MdDownloadDone />{" "}
                            </div>
                            Complete
                          </Button>
                        </div>
                      </TableCell> */}
                    </TableRow>
                  ))
              )}
              {!currentRowData ||
                (currentRowData.length == 0 && (
                  <div>
                    <TableRow key={"Plan_1"}>
                      <div className="flex items-center gap-2 ">No data</div>
                    </TableRow>
                  </div>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {currentRowData && currentRowData.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[20]}
            component="div"
            count={currentRowData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
      <Toaster />
    </>
  );

  const renderMobileView = () => (
    <>
    {Loading ? (
                <div className="w-full h-full flex fixed top-0 left-0 bg-white opacity-75 z-50 justify-center items-center ">
                  <CircularProgress size="lg" />
                </div>
              ) : (
                <>
      <div className="fixed z-20 top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md">
        {isSearchActive ? (
          <div className="flex items-center p-2 ">
            <form onSubmit={handleSubmitPhone} className="flex flex-col gap-2">
              <div className="flex  gap-2 ">
                <div className="">
                  <Input
                    id="jobNo"
                    defaultValue={searchValue}
                    isClearable
                    className="lm:w-[60%]"
                    placeholder="Enter Job No..."
                    startContent={<FaSearch />}
                    onChange={handleChange}
                    onClear={() => setSearchValue('')}
                    variant="bordered"
                  />
                </div>
                <Button
                  className="mt-auto"
                  type="submit"
                  color="primary"
                  variant="ghost"
                >
                  Search
                </Button>
                <Button
                // color="primary"
                  variant="ghost"
                  onClick={toggleSearch}
                  className=""
                >
                  Cancel
                </Button>
              </div>
              {/* <div className="">
              <label htmlFor="job" className="z-[40] ">
                Select job
              </label>
              <Select
                id="com"
                className="w-64 z-[43] "
                classNamePrefix="select"
                name="com"
                // isSearchable={true}
                // isClearable={true}
                defaultValue={{ value: false, label: "งานที่ยังไม่เสร็จ" }}
                options={[
                  { value: false, label: "งานที่ยังไม่เสร็จ" },
                  { value: true, label: "งานที่เสร็จ" },
                  { value: "all", label: "งานทั้งหมด" },
                ]}
                placeholder={"com..."}
              />
            </div>
            <div className="">
              <label htmlFor="sale" className="z-[40] ">
                Search Sale
              </label>
              <Select
                id="sale"
                className="w-64 z-[42] "
                classNamePrefix="select"
                name="sale"
                isSearchable={true}
                isClearable={true}
                options={saleData}
                placeholder={"Sale..."}
              />
            </div>
            <div className="">
              <label htmlFor="customer" className="z-[40] ">
                Search Customer
              </label>
              <Select
                id="customer"
                className="w-64 z-[41] "
                classNamePrefix="select"
                name="customer"
                isSearchable={true}
                isClearable={true}
                options={cusData}
                placeholder={"Customer..."}
              />
            </div> */}
            </form>
          </div>
        ) : (
          <div className="flex justify-between items-center p-4">
            <div className="text-xl font-semibold">
              รายงานแจ้งงานขาดจำนวนและแจ้งซ่อม
            </div>
            <button
              onClick={toggleSearch}
              className="text-gray-600 dark:text-gray-300"
            >
              <FaSearch size={20} />
            </button>
          </div>
        )}
      </div>
      <div className="accordion">
        {currentRowData && currentRowData.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[20]}
            component="div"
            count={currentRowData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
        {currentRowData &&
          currentRowData.length > 0 &&
          currentRowData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
           
              <div
                key={item.key}
                className="border-b-2 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark"
              >
                <h2 className="mb-0">
                  <button
                    className="group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white"
                    onClick={() => toggleAccordion(index)}
                  >
                   <div> 
                    <p>{item.JOB_ID} - {item.PROD_DESC}</p>
                    {item.REPAIR_FLAG === "F" && (<Chip className="bg-green-300">ซ่อม</Chip>)}
                    {item.REPAIR_FLAG === "N" && (<Chip className="bg-red-300">ไม่ซ่อม</Chip>)}
                    {item.REPAIR_FLAG == null && (<Chip color="default">ยังไม่ตัดสินใจ</Chip>)}
                    </div>
                    <span
                      className={`ms-auto transition-transform duration-200 ${
                        openAccordions[index] ? "rotate-180 " : ""
                      }`}
                    >
                      <IoIosArrowDown />
                    </span>
                  </button>
                </h2>
                <div
                  className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                    openAccordions[index] ? "" : "max-h-0"
                  }`}
                >
                  <div className="px-5 pb-4">
                    <div className="w-full">
                      {columns.map(({ label, id }) => (
                        <div key={id} className="flex mb-2">
                          <div className="w-[35%] flex-shrink-0">
                            <strong>{label}:</strong>
                          </div>
                          <div className="w-[65%] break-words mt-auto">
                            {formatMobileValue(id, item[id], item.REVISION, item.REMARK)}
                          </div>
                        </div>
                      ))}
                      <div className="flex mt-2 mb-2">
                        <div className="ml-auto">
                          <Button
                            color="primary"
                            onClick={() => openEditModal(item)}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {currentEditItem && (
                  <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                    <ModalContent>
                      <ModalHeader>Edit </ModalHeader>
                      <ModalBody>
                        <div className=" mb-10 w-full flex flex-col gap-4 ">
                          <div className="flex flex-col">
                            <label>ซ่อม/ไม่ซ่อม</label>
                            <Tabs
                              selectedKey={
                                currentEditItem.REPAIR_FLAG === null
                                  ? "-"
                                  : currentEditItem.REPAIR_FLAG
                              }
                              aria-label="Options"
                              onSelectionChange={(e) =>
                                updateFix(
                                  e,
                                  currentEditItem.JOB_ID,
                                  currentEditItem.PROD_ID,
                                  currentEditItem.REVISION,
                                  currentEditItem.SEQ
                                )
                              }
                              isDisabled={
                                (seller_value === "0" ||
                                  seller_value === "2" ||
                                  currentEditItem.COMPLETE_FLAG === "T") &&
                                seller_value !== "3"
                              }
                              classNames={{
                                tabList: "  data-[disabled=true]:opacity-100 ",
                                cursor: " data-[disabled=true]:opacity-100",
                                tab: " data-[disabled=true]:opacity-100",
                                tabContent: "data-[disabled=true]:opacity-100",
                              }}
                            >
                              <Tab
                                key="N"
                                title="ไม่ซ่อม"
                                isDisabled={currentEditItem.JOB_REPAIR__DATE}
                                classNames={{
                                  tabList:
                                    "  data-[disabled=true]:opacity-100  ",
                                  cursor:
                                    "group-data-[selected=true]:bg-red-300",
                                  tab: " data-[disabled=true]:opacity-100 ",
                                  tabContent:
                                    "data-[disabled=true]:opacity-100 ",
                                }}
                              />
                              <Tab key="-" title="-" isDisabled={true} />
                              <Tab
                                key="F"
                                title="ซ่อม"
                                classNames={{
                                  tabList:
                                    "  data-[disabled=true]:opacity-100 ",
                                  cursor:
                                    "group-data-[selected=true]:bg-green-300 data-[disabled=true]:opacity-100",
                                  tab: " data-[disabled=true]:opacity-100",
                                  tabContent:
                                    "data-[disabled=true]:opacity-100",
                                }}
                              />
                            </Tabs>
                          </div>
                          <div>
                            <label>ความเร่งด่วน</label>
                            <DatePicker
                              defaultValue={
                                currentEditItem && currentEditItem.URGENT_DATE !== null
                                  ? parseAbsoluteToLocal(
                                      currentEditItem.URGENT_DATE
                                    )
                                  : null
                              }
                              className={`
                                      max-w-[284px]
                                    `}
                              granularity="day"
                              onChange={(e) =>
                                updateUrgentDate(
                                  e,
                                  currentEditItem.JOB_ID,
                                  currentEditItem.PROD_ID,
                                  currentEditItem.REVISION,
                                  currentEditItem.SEQ
                                )
                              }
                              isDisabled={
                                ((currentEditItem.REPAIR_FLAG !== "NF" &&
                                  currentEditItem.REPAIR_FLAG !== "F") ||
                                  seller_value === "0" ||
                                  seller_value === "2" ||
                                  currentEditItem.COMPLETE_FLAG === "T") &&
                                seller_value !== "3"
                              }
                            />
                          </div>
                          <div>
                            <label>วันที่เปิดซ่อม</label>
                            <DatePicker
                              defaultValue={
                                currentEditItem.JOB_REPAIR__DATE
                                  ? parseAbsoluteToLocal(
                                      currentEditItem.JOB_REPAIR__DATE
                                    )
                                  : null
                              }
                              className={`
                                      max-w-[284px]
                                     
                                    `}
                              granularity="day"
                              onChange={(e) =>
                                updateJobRepairDate(
                                  e,
                                  currentEditItem.JOB_ID,
                                  currentEditItem.PROD_ID,
                                  currentEditItem.REVISION,
                                  currentEditItem.SEQ
                                )
                              }
                              isDisabled={
                                (!currentEditItem.URGENT_DATE ||
                                  seller_value === "1" ||
                                  seller_value === "2" ||
                                  currentEditItem.COMPLETE_FLAG === "T") &&
                                seller_value !== "3"
                              }
                            />
                          </div>
                          <div>
                            <label>วันที่ plan confirm</label>
                            <DatePicker
                              // className="max-w-[284px]"
                              className={`
                                    max-w-[284px]
                                   
                                  `}
                              // classNames={customStyles}
                              aria-label="Due date"
                              defaultValuevalue={
                                currentEditItem.PLAN_CONFIRM_DATE !== null
                                  ? parseAbsoluteToLocal(
                                      currentEditItem.PLAN_CONFIRM_DATE
                                    )
                                  : null
                              }
                              onChange={(e) =>
                                updatePlanConfirmDate(
                                  e,
                                  currentEditItem.JOB_ID,
                                  currentEditItem.PROD_ID,
                                  currentEditItem.REVISION,
                                  currentEditItem.SEQ
                                )
                              }
                              isDisabled={
                                (!currentEditItem.JOB_REPAIR__DATE ||
                                  seller_value === "1" ||
                                  seller_value === "2" ||
                                  currentEditItem.COMPLETE_FLAG === "T") &&
                                seller_value !== "3"
                              }
                              defaultValue={
                                currentEditItem.PLAN_CONFIRM_DATE !== null
                                  ? parseAbsoluteToLocal(
                                      currentEditItem.PLAN_CONFIRM_DATE
                                    )
                                  : null
                              }
                              granularity="day"
                            />
                          </div>
                          <div>
                            <label>หมายเหตุ</label>
                            {(seller_value === "0" || seller_value === "1" &&
                              currentEditItem.COMPLETE_FLAG != "T") ? (
                              
                                    <div className="px-1 py-2 w-full">
                                      {/* <p
                                            className="text-small font-bold text-foreground"
                                            {...titleProps}
                                          >
                                            Dimensions
                                          </p> */}
                                      <div className="mt-2 flex flex-col gap-2 w-full">
                                        <Textarea
                                          // defaultValue="100%"
                                          // label="Width"
                                          onBlur= {(e) =>
                                            handleSaveFix(
                                              currentEditItem.JOB_ID,
                                              currentEditItem.PROD_ID,
                                              currentEditItem.REVISION,
                                              currentEditItem.SEQ
                                            )
                                          }
                                          defaultValue={
                                            currentEditItem.REMARK
                                          }
                                          size="sm"
                                          variant="bordered"
                                          ref={inputRef}
                                          // maxLength={9}
                                        />
                                      </div>
                                    </div>
                                  
                               
                            ) : (
                              <div className="">
                              
                              <Textarea
                                          isDisabled
                                          onBlur= {(e) =>
                                            handleSaveFix(
                                              currentEditItem.JOB_ID,
                                              currentEditItem.PROD_ID,
                                              currentEditItem.REVISION,
                                              currentEditItem.SEQ
                                            )
                                          }
                                          defaultValue={
                                            currentEditItem.REMARK
                                          }
                                          size="sm"
                                          variant="bordered"
                                          ref={inputRef}
                                          // maxLength={9}
                                        />
                              </div>

                            )}
                          </div>
                          <JobCompleteButton
                            row={currentEditItem}
                            completeJob={completeJob}
                            seller_value={seller_value}
                          />
                        </div>
                        <p>*ระบบจะทำการsaveข้อมูลหลังทำการปิดโดยอัตโนมัติ</p>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                )}
              </div>
            ))}
        {currentRowData && currentRowData.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[20]}
            component="div"
            count={currentRowData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </div>
      </>
      )
    }
    </>
  );

  return (
    <div className="flex flex-col gap-3">
      {isMobile ? renderMobileView() : renderDesktopView()}
    </div>
  );

}
