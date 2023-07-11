"use client";

import { FC } from "react";
import Modal from "./Modal";

interface AuthModalProps {}

const AuthModal: FC<AuthModalProps> = ({}) => {
  return (
    <Modal title="welcome bck" description="login" isOpen onChange={() => {}}>
      Auth modal children
    </Modal>
  );
};

export default AuthModal;
