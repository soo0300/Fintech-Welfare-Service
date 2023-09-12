import React from "react";
import { styled } from "styled-components";
import InputDateModal from "./InputDateModal";
import SetWelfareModal from "./SetWelfareModal";
import WelfareModal from "./WelfareModal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "../../store/modalSlice";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 1;
  height: 100%;
`;

const MODAL_TYPES = {
  InputDateModal: "InputDateModal",
  SetWelfareModal: "SetWelfareModal",
  WelfareModal: "WelfareModal",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.InputDateModal,
    component: <InputDateModal />,
  },
  {
    type: MODAL_TYPES.SetWelfareModal,
    component: <SetWelfareModal />,
  },
  {
    type: MODAL_TYPES.WelfareModal,
    component: <WelfareModal />,
  },
];

const Modal = () => {
  const { modalType, isOpen } = useSelector(selectModal);
  const dispatch = useDispatch();
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });
  const showModal = () => {
    return findModal.component;
  };
  return (
    <>
      <ModalContainer
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        {showModal()}
      </ModalContainer>
    </>
  );
};

export default Modal;
