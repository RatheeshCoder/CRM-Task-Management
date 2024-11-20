// Sidebar.js
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import OpenIcon from "../../assets/Image/open.svg";
import CloseIcon from "../../assets/Image/close.svg";
import DashboardIcon from "../../assets/Image/dashboard-icons.png";
import TaskIcon from "../../assets/Image/TaskIcon.png";
import AddStudent from "../../assets/Image/AddStudent.png";
import ListIcon from "../../assets/Image/ListIcon.png";
import TaskAssign from "../../assets/Image/TaskAssign.png";
import Notifications from "../../assets/Image/Notifications.png";
import LinkedInicon from "../../assets/Image/LinkedInicon.png";
import Setting from '../../assets/Image/Setting.png'
import MyPic from '../../assets/Image/myPic.jpeg'
const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
  width: fit-content;
  background-color: #fffafa;
  transition: width 0.5s ease-in-out;
  overflow-x: hidden;
  position: fixed;
  border-right: 1px solid #4b4b4b;

  &.nav-open {
    width: 280px;
  }
`;

const SidebarHeader = styled.div`
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
`;

const Logo = styled.img`
  width: 34px;
  height: 34px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #000000;
  /* display: none; */
  height: fit-content;

  .nav-open & {
    display: block;
  }
`;

const NavToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const SidebarNav = styled.nav`
  width: 100%;
  padding: 0 1.5rem;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem;
  color: #000000;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #4b4b4b9a;
    color: white;
  }

  img {
    width: 24px;
    height: 24px;
    margin-right: 1rem;
  }
`;

const MenuSection = styled.div`
  width: 100%;
  border-bottom: 1px solid #4b4b4b;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`;

const MenuHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.75rem;
  color: #000;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  text-transform: uppercase;
  font-size: 0.875rem;

  &:hover {
    background-color: #4b4b4b9a;
    color: white;
  }

  img {
    width: 24px;
    height: 24px;
    transition: transform 0.3s;
  }

  &.rotate {
    img {
      transform: rotate(180deg);
    }
  }
`;

const SubMenu = styled.div`
  padding-left: 1rem;
`;

const UserSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
  margin-top: auto;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  margin-left: 0.75rem;

  .nav-open & {
    display: block;
  }
`;

const UserName = styled.p`
  font-size: 0.875rem;
  display: block;
  color: #000000;
`;

const UserEmail = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
  display: block;
`;

const SettingsIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMenu1Open, setIsMenu1Open] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const toggleMenu1 = () => setIsMenu1Open(!isMenu1Open);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleMessage = () => navigate("/addnewstudent");
  const handleStudent = () => navigate("/studentslist");
  const handleNewTask = () => navigate("/assigntask");
  const handleNotifications = () => navigate("/notifications");
  const handleLinkedinPost = () => navigate("/linkedinpost");
  const handleHome = () => navigate("/homePage");

  return (
    <SidebarContainer className={isNavOpen ? "nav-open" : ""}>
      <SidebarHeader>
        <Title>CRM</Title>
        {/* onClick={toggleNav} */}
        <NavToggle>
          <img src={isNavOpen ? OpenIcon : OpenIcon} alt="Toggle navigation" />
        </NavToggle>
      </SidebarHeader>

      <SidebarNav>
        <NavItem onClick={handleHome}>
          <img src={DashboardIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </NavItem>

        <MenuSection>
          <MenuHeader
            onClick={toggleMenu1}
            className={isMenu1Open ? "rotate" : ""}
          >
            <span>Staff Task</span>
            <img src={TaskIcon} alt="Toggle menu" />
          </MenuHeader>
          {isMenu1Open && (
            <SubMenu>
              <NavItem onClick={handleMessage}>
                <img src={AddStudent} alt="Messages" />
                <span>Add New Student</span>
              </NavItem>
              <NavItem onClick={handleStudent}>
                <img src={ListIcon} alt="Security" />
                <span>Student List</span>
              </NavItem>
              <NavItem onClick={handleNewTask}>
                <img src={TaskAssign} alt="Settings" />
                <span>Assign Task</span>
              </NavItem>
              <NavItem onClick={handleNotifications}>
                <img src={Notifications} alt="Notifications" />
                <span>Notifications</span>
              </NavItem>
              <NavItem onClick={handleLinkedinPost}>
                <img src={LinkedInicon} alt="Passwords" />
                <span>LinkedIn Post</span>
              </NavItem>
              {/* <NavItem>
                <img src="/path-to-goals-icon.png" alt="Goals" />
                <span>Goals</span>
              </NavItem> */}
            </SubMenu>
          )}
        </MenuSection>
      </SidebarNav>

      <UserSection>
        <UserAvatar
          src={MyPic}
          alt="User avatar"
        />
        <UserInfo>
          <UserName>Ratheesh R</UserName>
          <UserEmail>ratheesh.webdev@gmail.com</UserEmail>
        </UserInfo>
        {/* <SettingsIcon src={Setting} alt="Settings" /> */}
      </UserSection>
    </SidebarContainer>
  );
};

export default Sidebar;
