import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import ShipmentLongContainer from "../../components/Cards/ShipmentLongContainer";
import InputField from '../../components/InputField';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import SearchLogo from '../../assets/SearchLogo.svg';
import axios from 'axios';
import { API_URL } from "../../App"; // Adjust the import according to your project structure
import Tracker from './Tracker'; // Import Tracker component
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function XYZShipmentList() {
    const [shipments, setShipments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedShipment, setSelectedShipment] = useState(null);

    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                console.log("Fetching shipments from API...");
                const response = await axios.get(`${API_URL}/shipment/get`);
                console.log("Shipments fetched successfully:", response.data);
                setShipments(response.data);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };

        fetchShipments();
    }, []);

    const handleSearchChange = (e) => {
        console.log("Search term changed:", e.target.value);
        setSearchTerm(e.target.value);
    };

    const handleShipmentClick = (shipment) => {
        console.log("Shipment clicked:", shipment);
        setSelectedShipment(shipment);
        navigate(`/xyzmobile/tracker/${shipment.ShipmentID}`); // Navigate to Tracker page with shipment ID
    };

    const filteredShipments = shipments.filter(shipment =>
        shipment.ShipmentID.toString().includes(searchTerm) ||
        shipment.ShipmentQuantity.toString().includes(searchTerm) ||
        (shipment.ShipmentDate && shipment.ShipmentDate.includes(searchTerm))
    );

    console.log("Filtered shipments:", filteredShipments);
    console.log("Selected shipment:", selectedShipment);

    return (
        <>
            <div className="mt-4 flex justify-center items-center gap-3">
                <InputField 
                    icon={SearchLogo} 
                    placeholder={"Search"} 
                    className={"max-w-none"}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className='ml-1'>
                    <WidgetContainer backgroundColor="#94C3B3" borderRadius="20px" border={false}>
                        <img src={InnerPlugins} alt="InnerPlugins" className='w-8 h-8' />
                    </WidgetContainer>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                {filteredShipments.map((item, index) => (
                    <motion.div
                        key={item.ShipmentID}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => handleShipmentClick(item)}
                    >
                        <ShipmentLongContainer
                            showWeight={true}
                            packageCount={item.ShipmentQuantity}
                            weightValue={item.Rescalled_Weight}
                            dateValue={item.ShipmentDate}
                            expeditionId={item.ShipmentID}
                            onClick={() => handleShipmentClick(item)}
                        />
                    </motion.div>
                ))}
            </div>
        </>
    );
}

export default XYZShipmentList;
