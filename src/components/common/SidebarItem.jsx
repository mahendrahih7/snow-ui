import React, { useState } from 'react'
import { ListItemButton } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import colorConfigs from "../../configs/colorConfigs";
// import { RootState } from "../../redux/store";
// import { RouteType } from "../../routes/config";
// import moduleName from '../../assets/images/nav_icon1.png'

const SidebarItem = ({ item }) => {
  // console.log(item.sidebarProps,"goutam....")
  const { appState } = useSelector((state) => state.appState);

  return (
    item.sidebarProps && item.path ? (
      <ListItemButton className='nav_link'
        component={Link}
        to={item.path}
        sx={{
          "&: hover": {
            backgroundColor: colorConfigs.sidebar.hoverBg
          },
          backgroundColor: appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
          paddingY: "12px",
          paddingX: "24px"
        }}
      >
       <div className="icon_box">{item?.sidebarProps?.icon &&<img src={require(`../../assets/images/${item.sidebarProps.icon}`)} alt=""/>}</div>  
        {/* <ListItemIcon sx={{
          color: colorConfigs.sidebar.color
        }}>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon> */}
     <span class="icon_text"> {item.sidebarProps.displayText} </span>   
      </ListItemButton>
    // <><h1> <img src={require(`../../assets/images/nav_icon1.png`)} /> </h1> {item.sidebarProps.displayText}</>  
    ) : null
  );
};

export default SidebarItem;