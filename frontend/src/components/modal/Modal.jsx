import React from "react";
import { styled } from "styled-components";
import CalendarModal from "./CalendarModal";
import SetWelfareModal from "./SetWelfareModal";
import WelfareModal from "./WelfareModal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "../../store/modalSlice";

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
  position: fixed; /* 모달이 화면 중앙에 고정되도록 설정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 배경에 반투명한 검정색 배경 추가 */
`;

const ModalContainer = styled.div`
  z-index: 1;
  max-width: 80%;
  max-height: 80%;
  background-color: white; /* 모달 내부 배경색 지정 */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: auto; /* 내용이 넘칠 경우 스크롤 표시 */
`;

const MODAL_TYPES = {
  CalendarModal: "CalendarModal",
  SetWelfareModal: "SetWelfareModal",
  WelfareModal: "WelfareModal",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.CalendarModal,
    component: <CalendarModal />,
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
  if (!isOpen) return null; // 모달이 열려 있지 않으면 아무것도 렌더링하지 않음

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  return (
    <ModalWrapper>
      <ModalContainer
        className="ModalContainer"
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        {findModal.component}
      </ModalContainer>
    </ModalWrapper>
  );
};

export default Modal;
