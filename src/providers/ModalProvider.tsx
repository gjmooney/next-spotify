"use client";

import { FC, useEffect, useState } from "react";

import Modal from "@/components/Modal";

interface ModalProviderProps {}

const ModalProvider: FC<ModalProviderProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);

  //prevent rendering modal server side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal
        title="Test Modal"
        description="test dec"
        isOpen
        onChange={() => {}}
      >
        Test Children
      </Modal>
    </>
  );
};

export default ModalProvider;
