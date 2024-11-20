import React from "react";
import styled from "styled-components";
import StudentProfile from "../../assets/Image/StudentProfile.png";
const Card = styled.div`
  padding: 30px 0 40px;
  margin-bottom: 30px;
  background-color: #9290905d;
  text-align: center;
  overflow: hidden;
  position: relative;
`;

const PictureContainer = styled.div`
  display: inline-block;
  height: 130px;
  width: 130px;
  margin-bottom: 50px;
  z-index: 1;
  position: relative;

  &::before {
    content: "";
    width: 100%;
    height: 0;
    border-radius: 50%;
    background-color: #9290905d;
    position: absolute;
    bottom: 135%;
    right: 0;
    left: 0;
    opacity: 0.9;
    transform: scale(3);
    transition: all 0.3s linear 0s;
  }

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #9290905d;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  ${Card}:hover &::before {
    height: 100%;
  }
`;

const StudentImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50%;
  transform: scale(1);
  transition: all 0.9s ease 0s;

  ${Card}:hover & {
    box-shadow: 0 0 0 14px #f7f5ec;
    transform: scale(0.7);
  }
`;

const ContentContainer = styled.div`
  margin-bottom: 20px;
`;

const Name = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Department = styled.h4`
  font-size: 15px;
  color: #000;
`;

const SocialLinks = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: #9290905d;
  position: absolute;
  bottom: -100px;
  left: 0;
  transition: all 0.5s ease 0s;
  list-style: none;

  ${Card}:hover & {
    bottom: 0;
  }
`;

const SocialLink = styled.li`
  display: inline-block;

  a {
    display: block;
    padding: 10px;
    font-size: 17px;
    color: white;
    transition: all 0.3s ease 0s;
    text-decoration: none;

    &:hover {
      color: #9290905d;
      background-color: #f7f5ec;
    }
  }
`;

const ViewButton = styled.button`
  background-color: #929090;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9290905d;
  }
`;

const StudentCard = ({ student, onView }) => {
  return (
    <Card>
      <PictureContainer>
        <StudentImage
          src={StudentProfile || "https://picsum.photos/130/130"}
          alt={student.name}
        />
      </PictureContainer>
      <ContentContainer>
        <Name>{student.name}</Name>
        <Department>{student.department}</Department>
      </ContentContainer>
      <ViewButton onClick={() => onView(student)}>View</ViewButton>
    </Card>
  );
};

export default StudentCard;
