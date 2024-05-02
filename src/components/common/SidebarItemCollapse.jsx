import React from 'react'
import { Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import colorConfigs from "../../configs/colorConfigs";
// import { RouteType } from "../../routes/config";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";

const SidebarItemCollapse = ({ item }) => {
  // console.log(item.sidebarProps.icon,"icon")
  const [open, setOpen] = useState(false);

  const { appState } = useSelector((state) => state.appState);

  useEffect(() => {
    if (appState.includes(item.state)) {
      setOpen(true);
    }
  }, [appState, item]);

  return (
    item.sidebarProps ? (
      <>
        <ListItemButton className={open? 'nav_link current-menu':'nav_link'}
          onClick={() => setOpen(!open)}
          sx={{
            "&: hover": {
              backgroundColor: colorConfigs.sidebar.hoverBg
            },
            paddingY: "12px",
            paddingX: "24px"
          }}
        >
          {/* <ListItemIcon sx={{
            color: colorConfigs.sidebar.color
          }}>
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon> */}
          <div className="icon_box"><img src={require(`../../assets/images/${item.sidebarProps.icon && item.sidebarProps.icon}`)} alt=""/></div> 
          <ListItemText
            disableTypography
            primary={
              <Typography>
               <span class="icon_text"> {item.sidebarProps.displayText} </span>   
              </Typography>
            }
          />
          {open ? <ExpandLessOutlinedIcon className='arrow_icon' /> : <ExpandMoreOutlinedIcon className='arrow_icon' />}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List>
            {item.child?.map((route, index) => (
              route.sidebarProps ? (
                route.child ? (
                 <div className='mahadev'><SidebarItemCollapse item={route} key={index} /></div> 
                ) : (
                  <SidebarItem item={route} key={index} />
                )
              ) : null
            ))}
          </List>
        </Collapse>
      </>
    ) : null
  );
};

export default SidebarItemCollapse;