import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const DetailParagraph = styled.p`
  margin-bottom: 0.5rem;
`;

const DetailLabel = styled.strong`
  margin-right: 0.5rem;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  border-radius: 0.5rem;
  background-color: #929090;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e40af;
  }
`;

const StudentModal = ({ student, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Student Details</ModalTitle>
        <DetailParagraph><DetailLabel>Name:</DetailLabel> {student.name}</DetailParagraph>
        <DetailParagraph><DetailLabel>Department:</DetailLabel> {student.department}</DetailParagraph>
        <DetailParagraph><DetailLabel>Father's Name:</DetailLabel> {student.fatherName}</DetailParagraph>
        <DetailParagraph><DetailLabel>Phone Number:</DetailLabel> {student.phoneNumber}</DetailParagraph>
        <DetailParagraph><DetailLabel>College ID:</DetailLabel> {student.collegeID}</DetailParagraph>
        <DetailParagraph><DetailLabel>Email ID:</DetailLabel> {student.emailID}</DetailParagraph>
        <DetailParagraph><DetailLabel>Address:</DetailLabel> {student.address}</DetailParagraph>
        <DetailParagraph><DetailLabel>Section:</DetailLabel> {student.section}</DetailParagraph>
        <CloseButton onClick={onClose}>
          Close
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StudentModal;