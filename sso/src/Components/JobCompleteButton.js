import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useState } from "react";
import { MdDownloadDone } from "react-icons/md";

export const JobCompleteButton = ({ row, completeJob, seller_value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleComplete = () => {
    completeJob(row.JOB_ID, row.PROD_ID, row.REVISION, row.SEQ);
    handleClose();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        color=""
        variant="solid"
        className="hover:bg-green-300 hover:border-green-300 border-3 bg-white"
        onClick={handleOpen}
        // isDisabled={seller_value === "0" || row.COMPLETE_FLAG === 'T'}
        isDisabled={
          (
            seller_value === "0" ||
            seller_value === "2" ||
            row.COMPLETE_FLAG === "T") &&
          seller_value !== "3"
        }
      >
        <div className="text-xl">
          <MdDownloadDone />
        </div>
        Complete
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader>ยืนยัน</ModalHeader>
          <ModalBody>
            คุณต้องการที่จะ complete งานนี้
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button color="primary" onClick={handleComplete}>
              ยืนยัน
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};