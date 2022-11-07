import React, { useState, useContext, useEffect } from 'react';
import { Stack } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import { Box } from '@mui/system';
import { AppContext } from '../AppContext';
import ListContainerByRegion from './ListContainerByRegion';
import '../utils/MainPage.css';
import '../utils/Font.css';

const ListContainer = () => {
  const context = useContext(AppContext);
  // mainPageArticles
  const { regionList } = context.state;
  const [openList, setOpenList] = useState();

  const renewOpenList = () => {
    console.log('renew');
    const entries = regionList.map((obj) => [obj.region, false]);
    setOpenList(Object.fromEntries(entries));
  };

  useEffect(renewOpenList, [regionList]);

  const ListButton = ({ handle, open, primary }) => {
    return (
      <ListItemButton onClick={handle}>
        <ListItemIcon>
          <FlightTakeoffIcon id='flight' />
        </ListItemIcon>
        <ListItemText className='list-continental' primary={primary} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    );
  };

  const ListItem = ({ region, cities, openList, setOpenList }) => {
    const open = openList[region];
    const handleOpen = () => {
      const newList = { ...openList };
      newList[region] = !open;
      console.log(newList);
      setOpenList(newList);
    };

    return (
      <>
        <ListButton handle={handleOpen} open={open} primary={region} />
        <Collapse in={open} timeout='auto'>
          {cities.map((city, idx) => <ListContainerByRegion key={idx} primary={city} />)}
        </Collapse>
      </>
    );
  };

  return (
    <>
      <Stack
        id='list-contianer' sx={{
          pr: 3
        }}
      >
        <List
          component='nav'
          className='nav-list'
          subheader={
            <ListSubheader
              sx={{
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                bgcolor: 'background.header',
                color: 'text.primary'
              }}
              component='div' id='list-subheader'
            >WHERE IS TAKO?
            </ListSubheader>
          }
        >
          {regionList.map(({ region, cities }, idx) => {
            return <ListItem key={idx} region={region} cities={cities} openList={openList} setOpenList={setOpenList} />;
          })}
          {/*
          <ListButton handle={handleAsiaClick} open={openAsia} primary='Asia' />
          <Collapse in={openAsia} timeout='auto'>
            <ListContainerByRegion primary='Seoul' />
            <ListContainerByRegion primary='Tokyo' />
            <ListContainerByRegion primary='BangKok' />
          </Collapse>

          <ListButton handle={handleEuropeClick} open={openEurope} primary='Europe' />
          <Collapse in={openEurope} timeout='auto'>
            <ListContainerByRegion primary='Paris' />
            <ListContainerByRegion primary='Roma' />
            <ListContainerByRegion primary='London' />
          </Collapse>

          <ListButton handle={handleAmericaClick} open={openAmerica} primary='America' />
          <Collapse in={openAmerica} timeour='auto' unmountOnExit>
            <ListContainerByRegion primary='DC' />
            <ListContainerByRegion primary='Ottawa' />
            <ListContainerByRegion primary='NewYork' />
          </Collapse>

          <ListButton handle={handleAfricaClick} open={openAfrica} primary='Africa' />
          <Collapse in={openAfrica} timeour='auto' unmountOnExit>
            <ListContainerByRegion primary='Rabat' />
            <ListContainerByRegion primary='Kyro' />
          </Collapse>

          <ListButton handle={handleMeClick} open={openME} primary='Middle East' />
          <Collapse in={openME} timeour='auto' unmountOnExit>
            <ListContainerByRegion primary='New Delhi' />
            <ListContainerByRegion primary='Riyadh' />
            <ListContainerByRegion primary='dubai' />
          </Collapse> */}
        </List>
        <Box component='footer' sx={{ height: '30px', bgcolor: 'background.header' }} />
      </Stack>
    </>
  );
};

export default ListContainer;
