import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShipmentLogo from '../../assets/ShipmentDetail.svg';
import PackageCount from '../../assets/Packagecount.svg';
import Date from '../../assets/Date.svg';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import ShipmentWeight from '../../assets/ShipmentWeight.svg';
import Courier from '../../assets/Courier.svg';
import Address from '../../assets/Address.svg';
import HarborReception from '../../components/HarborReception';
import VerificationWait from '../../components/VerificationWait';
import ReceptionDetail from '../../components/ReceptionDetail';
import Centralogo from '../../assets/centra.svg';

function XYZPopup({ shipment, open, onClose }) {
    const [currentComponent, setCurrentComponent] = useState(1); 

    useEffect(() => {
        if (open) {
            document.getElementById('XYZPopup').showModal();
        } else {
            document.getElementById('XYZPopup').close();
        }
    }, [open]);

    const handleNext = () => {
        setCurrentComponent(prevComponent => (prevComponent % 7) + 1); 
    };

    const handlePrevious = () => {
        setCurrentComponent(prevComponent => (prevComponent + 5) % 7 + 1); 
    };

    if (!shipment) {
        return null;
    }

    const containers = [
        { label: 'Centra Name' },
        { label: 'Harbor Name' },
        { label: 'Total Packages' }
    ];
    
    const centracontainers = [
        { label: 'Centra Name' },
        { label: 'Weight' },
        { label: 'Your Name' },
        { label: 'Date Received' }
    ];

    return (
        <>
            <dialog id="XYZPopup" className="modal modal-bottom">
                <div className='modal-box'>
                    <button className="modal-close" onClick={onClose}>×</button>
                    
                    <div className='flex justify-center'>
                        <img src={ShipmentLogo} alt="Profile" style={{ maxWidth: '100px' }} className='w-full h-auto' />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                            Expedition #{shipment.ShipmentID}
                        </span>
                        <div className="flex space-x-2">
                            <img src={PackageCount} alt="Package Count" style={{ maxWidth: '100px' }} className='w-5 h-auto' />
                            <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                                {shipment.ShipmentQuantity} Packages
                            </span>
                            <img src={Date} alt="Date" style={{ maxWidth: '100px' }} className='w-6 h-auto' />
                            <span className="font-montserrat text-16px font-semibold tracking-02em text-center ">
                                {shipment.ShipmentDate}
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            <img src={ShipmentWeight} alt="Shipment Weight" style={{ maxWidth: '100px' }} className='w-5 h-auto' />
                            <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                                {shipment.FlourWeightSum} Kg Flour
                            </span>
                            <img src={Courier} alt="Courier" style={{ maxWidth: '100px' }} className='w-6 h-auto' />
                            <span className="font-montserrat text-16px font-semibold tracking-02em text-center ">
                                Courier - {shipment.CourierName}
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                                User ID: {shipment.UserID}
                            </span>
                            <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                                User Name: {shipment.UserName}
                            </span>
                        </div>
                    </div>
                    <div className='p-1'>
                        <WidgetContainer borderRadius="20px" container={false}>
                            <div className="flex justify-around">
                                <div className="flex flex-col">
                                    <span className='font-montserrat text-16px font-semibold tracking-02em pb-2 ml-1'>Powder</span>
                                    <div className='flex pb-1'>
                                        <img src={PackageCount} alt="Package Count" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">{shipment.ShipmentQuantity} Packages</span>
                                    </div>
                                    <div className='flex pb-1'>
                                        <img src={ShipmentWeight} alt="Shipment Weight" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">{shipment.Weight} Kg</span>
                                    </div>
                                    <div className='flex pb-1'>
                                        <img src={Courier} alt="Courier" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">Courier - {shipment.CourierName}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className='font-montserrat text-16px font-semibold tracking-02em pb-2 ml-1'>Centra</span>
                                    <div className='flex pb-1'>
                                        <img src={Centralogo} alt="Central Logo" style={{ maxWidth: '100px' }} className='w-4 h-7' />
                                        <span className='font-montserrat text-16px font-semibold tracking-02em text-center ml-2'>{shipment.CentraName}</span>
                                    </div>
                                    <div className='flex pb-1'>
                                        <img src={Address} alt="Address" style={{ maxWidth: '100px' }} className='w-4 h-7' />
                                        <span className='font-montserrat text-16px font-semibold tracking-02em text-center ml-2'>{shipment.Address}</span>
                                    </div>
                                </div>
                            </div>
                        </WidgetContainer>
                    </div>
                    <div>
                        {currentComponent === 1 && <VerificationWait title="Waiting for Verification" message="Harbor has not received the packages" />}
                        {currentComponent === 2 && <HarborReception title="Harbor Reception" containers={containers} />}
                        {currentComponent === 3 && <ReceptionDetail />}
                        {currentComponent === 4 && (
                            <div className='p-2'>
                                <WidgetContainer borderRadius='20px' container={false}>
                                    <span className='font-montserrat text-lg font-semibold tracking-wide ml-1'>
                                        Re-scaling
                                    </span>
                                    <span className='font-montserrat text-sm font-medium leading-4 tracking-wide ml-1 '>
                                        Input the re-scaled weight below
                                    </span>
                                    <div className="w-full max-w ml- mt-4">
                                        <p className='font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1'>Re-scaled weight</p>
                                        <WidgetContainer backgroundColor="#94C3B380" borderRadius="13.5px" borderWidth="2px" borderColor="#79B2B7" className='mt-2'>
                                            <input type="text" className="w-full h-full bg-transparent border-none outline-none px-2" />
                                        </WidgetContainer>
                                    </div>
                                </WidgetContainer>
                            </div>
                        )}
                        {currentComponent === 5 && <HarborReception title="Centra Reception" containers={centracontainers} />}
                        {currentComponent === 6 && <VerificationWait title="Re-scaling" message="Please have a confirmation with Centra" />}
                        {currentComponent === 7 && <ReceptionDetail />}
                    </div>
                    <div className='flex justify-between items-center mt-auto p-4'>
                        {currentComponent !== 1 ? (
                            <button 
                                onClick={handlePrevious} 
                                className='font-montserrat text-sm font-medium leading-4 tracking-wide text-green-900 ml-3'
                            >
                                Previous
                            </button>
                        ) : (
                            <div className="w-20"></div> // Empty div to maintain spacing
                        )}
                        {currentComponent !== 7 && (
                            <WidgetContainer container={false} backgroundColor="#0F7275" borderRadius="20px" border={false} className='w-full max-w-20 mr-2'>
                                <button 
                                    onClick={handleNext} 
                                    className='flex justify-items-center font-montserrat text-xs font-semibold leading-4 tracking-wide text-gray-100 ml-4'
                                >
                                    Next
                                </button>
                            </WidgetContainer>
                        )}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

XYZPopup.propTypes = {
    shipment: PropTypes.object,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default XYZPopup;
