import React, { useState, useEffect, useRef } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from '@mui/material/Fab';
import HistoryIcon from '@mui/icons-material/History';
import ShipmentLogo from '@assets/ShipmentDetail.svg';
import PackageCount from '@assets/Packagecount.svg';
import Dateicon from '@assets/Date.svg';
import WidgetContainer from '@components/Cards/WidgetContainer';
import ShipmentWeight from '@assets/ShipmentWeight.svg';
import Courier from '@assets/Courier.svg';
import Address from '@assets/Address.svg';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import Button from './Button';
import Popup from '@components/Popups/Popup';
import "./Drawer.css";
import { API_URL } from '../App';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: 'transparent',
  zIndex: 1,
  borderRadius: '30px'
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '30px',
  padding: theme.spacing(2)
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.divider,
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F7275',
    },
  },
});

function ScanResultsDrawer(props) {
  const { window, open, toggleDrawer, data } = props;
  const [receivedPackages, setReceivedPackages] = useState("3");
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDescription, setPopupDescription] = useState("");
  const popupRef = useRef(null);

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    async function handleCheckShipmentIDs() {
      try {
        setLoading(true);
        console.log("Checking shipment IDs with data: " + data);
        const response = await axios.get(`${API_URL}/shipments/ids`);
        const shipmentIds = response.data;
        console.log("All shipment IDs received: ", shipmentIds);
  
        const shipmentId = shipmentIds.find(id => {
          console.log(id);
          console.log(data.trim());
          const isMatch = bcrypt.compareSync(id.toString(), data.trim().toString());
          if (isMatch) {
            console.log(`Matching shipment ID found: ${id}`);
          }
          return isMatch;
        });
  
        if (shipmentId) {
          const shipmentResponse = await axios.get(`${API_URL}/shipment/getid/${shipmentId}`);
          setShipmentDetails(shipmentResponse.data);
          console.log("Shipment details fetched successfully:", shipmentResponse.data);
          setLoading(false);
        } else {
          console.log("No matching shipment ID found.");
          setShipmentDetails(null);
          setPopupDescription("Shipment has been verified or not found.");
          setShowPopup(true);
        }
      } catch (error) {
        console.error("Error fetching shipment details: ", error);
        setShipmentDetails(null);
        setPopupDescription("Shipment has been verified or not found.");
        setShowPopup(true);
      }
    }
  
    if (data) {
      handleCheckShipmentIDs();
    }
  }, [data]);

  const handleConfirm = () => {
    console.log("Confirm clicked");
    setShowPopup(false);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup) {
      popupRef.current.showModal();
    } else {
      popupRef.current.close();
    }
  }, [showPopup]);

  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: 'fixed', bottom: '75px', right: '16px', zIndex: '1000' }}
          onClick={toggleDrawer(true)}
        >
          <HistoryIcon />
        </Fab>
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox>
            <Puller />
            {loading ? <span className='font-bold justify-center flex p-4'>No Shipment Found</span> : <>
              <div className="flex flex-col items-center">
                <div className='flex justify-center'>
                  <img src={ShipmentLogo} alt="Profile" style={{ maxWidth: '100px' }} className='w-full h-auto' />
                </div>
                <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                  {shipmentDetails ? `Shipment #${shipmentDetails.ShipmentID}` : "Shipment #000000"}
                </span>
                <div className="flex space-x-2">
                  <img src={PackageCount} alt="Profile" style={{ maxWidth: '100px' }} className='w-5 h-auto' />
                  <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                    {shipmentDetails ? `${shipmentDetails.ShipmentQuantity} Packages` : "3 Packages"}
                  </span>
                  <img src={Dateicon} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-auto' />
                  <span className="font-montserrat text-16px font-semibold tracking-02em text-center ">
                    {shipmentDetails ? new Date(shipmentDetails.ShipmentDate).toLocaleDateString() : "22/07/2024"}
                  </span>
                </div>
              </div>

              <div className='p-2'>
                <WidgetContainer borderRadius="20px" container={false} >
                  <div className="flex justify-around">
                    <div className="flex flex-col">
                      <span className='font-montserrat text-16px font-semibold tracking-02em  pb-2 ml-1'>Powder</span>
                      <div className='flex pb-2'>
                        <img src={PackageCount} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                          {shipmentDetails ? `${shipmentDetails.ShipmentQuantity} Packages` : "3 Packages"}
                        </span>
                      </div>
                      <div className='flex pb-2'>
                        <img src={ShipmentWeight} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                          {shipmentDetails ? `${shipmentDetails.ShipmentQuantity * 10} Kg` : "30 Kg"}
                        </span>
                      </div>
                      <div className='flex pb-2'>
                        <img src={Courier} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                          {shipmentDetails ? `Courier - ${shipmentDetails.CourierID}` : "Courier - JNE"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className='font-montserrat text-16px font-semibold tracking-02em pb-2 ml-1'>Centra</span>
                      <div className='flex pb-2'>
                        <img src={Address} alt="Address" style={{ maxWidth: '100px' }} className='w-4 h-7' />
                        <span className=' font-montserrat text-16px font-semibold tracking-02em text-center ml-2'>
                          {shipmentDetails ? `Unit ${shipmentDetails.ShipmentID}` : "Unit 1"}
                        </span>
                      </div>
                      <div className='flex pb-2'>
                        <img src={Address} alt="Address" style={{ maxWidth: '100px' }} className='w-4 h-7' />
                        <span className=' font-montserrat text-16px font-semibold tracking-02em text-center ml-2'>
                          {shipmentDetails ? `Jl.Address` : "Jl.Address"}
                        </span>
                      </div>
                    </div>
                  </div>
                </WidgetContainer>
                <label className='font-bold'>Received Packages</label>
                <WidgetContainer container={false} backgroundColor="#FFFFFF" borderRadius="20px" borderWidth="" borderColor="" className='mt-2 mb-2'>
                  <div className='flex'>
                    <input
                      type="number"
                      className="w-full h-full bg-transparent border-none outline-none px-2"
                      placeholder=''
                      value={receivedPackages}
                      onChange={(e) => setReceivedPackages(e.target.value)}
                    />
                    <img src={PackageCount} alt="Date" className='flex justify-end w-6 h-auto' />
                  </div>
                </WidgetContainer>
                <Button className={"flex w-full justify-center items-center"} noMax={true} label={"Confirm"} color={"white"} background={"#0F7275"}></Button>
              </div>
            </>
            }
          </StyledBox>
        </SwipeableDrawer>
        <Popup
          ref={popupRef}
          error={true}
          description={popupDescription}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </Root>
    </ThemeProvider>
  );
}

export default ScanResultsDrawer;
