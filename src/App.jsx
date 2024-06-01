import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './style/App.css'
import './style/font.css'
import OnBoarding from "./pages/OnBoarding";
import Verification from "./pages/Verification";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Approval from "./pages/Approval";
import DashboardHarbor from "./pages/Harbor/DashboardHarbor";
import Example from "./pages/Example";
import PageNotFound from "./pages/PageNotFound";
import WetLeavesXYZ from "./pages/WetLeaves";
import DryLeavesXYZ from "./pages/DryLeaves";
import PowderXYZ from "./pages/Powder";
import ShipmentXYZ from "./pages/Shipment";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardCentra from "./pages/Centra/DashboardCentra";
import WetLeaves from "./pages/Centra/WetLeaves";
import WetLeavesDetail from "./pages/Centra/WetLeavesDetail";
import DryLeaves from "./pages/Centra/DryLeaves";
import DryLeavesDetail from "./pages/Centra/DryLeavesDetail";
import Powder from "./pages/Centra/Powder";
import PowderDetail from "./pages/Centra/PowderDetail";
import Shipment from "./pages/Centra/Shipment";
import ShipmentDetail from "./pages/Centra/ShipmentDetail";
import HarborLayout from "./pages/Harbor/HarborLayout";
import HarborReception from "./pages/Harbor/HarborReception";
import HarborScanner from './pages/Harbor/HarborScanner';
import Reception from "./pages/Reception";
import CentraLayout from "./pages/Centra/CentraLayout";
import CentraTabContent from "./pages/CentraTabContent";
import HarborTabContent from "./pages/HarborTabContent";
import ShipmentOrders from "./pages/Centra/ShipmentOrders";
import ShipmentSent from "./pages/Centra/ShipmentSent";
import ShipmentCompleted from "./pages/Centra/ShipmentCompleted";
import AdminWetLeaves from "./pages/Admin/AdminWetLeaves";
import XYZLayout from "./pages/XYZMobile/XYZLayout";
import XYZShipmentList from "./pages/XYZMobile/XYZShipmentList";
import XYZScanner from './pages/XYZMobile/XYZScanner';
import DashboardXYZ from "./pages/XYZMobile/DashboardXYZ";
import XYZShipmentDetail from "./pages/XYZMobile/XYZShipmentDetail";
import UserSetting from "./pages/XYZResponsive/UserSetting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnBoarding />}></Route>
        <Route path="verify" element={<Verification />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="approval" element={<Approval />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        {/* <Route path="company" element={<PageNotFound />}></Route> */}
        <Route path="company" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="wetleaves" element={<WetLeavesXYZ />}></Route>
          <Route path="dryleaves" element={<DryLeavesXYZ />}></Route>
          <Route path="powder" element={<PowderXYZ />}></Route>
          <Route path="shipment" element={<ShipmentXYZ />}></Route>
          <Route path="reception" element={<Reception />}>
            <Route path="centra" element={<CentraTabContent />}></Route>
            <Route path="harbor" element={<HarborTabContent />}></Route>
          </Route>
        </Route>
        <Route path="harbor" element={<HarborLayout />}>
          <Route path="dashboard" element={<DashboardHarbor />} />
          <Route path="reception" element={<HarborReception />} />
          <Route path="Scanner" element={<HarborScanner />} />
        </Route>
        <Route path="centra" element={<CentraLayout />}>
          <Route path="Dashboard" element={<DashboardCentra />}></Route>
          <Route path="Wet Leaves" element={<WetLeaves />}></Route>
          <Route path="Dry Leaves" element={<DryLeaves />}></Route>
          <Route path="Powder" element={<Powder />}></Route>
          <Route path="Shipment" element={<Shipment />}>
            <Route path="ShipmentOrder" element={<ShipmentOrders />}></Route>
            <Route path="ShipmentSent" element={<ShipmentSent />}></Route>
            <Route path="ShipmentCompleted" element={<ShipmentCompleted />}></Route>
          </Route>
        </Route>
        <Route path="xyzmobile" element = {<XYZLayout />}>
          <Route path="dashboard" element={<DashboardXYZ />} />
          <Route path="Shipment List" element={<XYZShipmentList />} />
          <Route path="Scanner" element={<XYZScanner />} />
        </Route>
        <Route path="wetleavesadmin" element={<AdminWetLeaves />}></Route>

        <Route path="/wetleavesdetail" element={<WetLeavesDetail />} />
        <Route path="/dryleavesdetail" element={<DryLeavesDetail />} />
        <Route path="/powderdetail" element={<Powder />} />
        <Route path="/shipmentdetail" element={<ShipmentDetail />} />
        <Route path="/xyzshipmentdetail" element={<XYZShipmentDetail />} />
        <Route path="/usersetting" element={<UserSetting />} />
      </Routes>
    </Router>
  )
}

export default App;
export const API_URL = "http://localhost:8000";