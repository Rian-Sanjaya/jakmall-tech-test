import { useState, useEffect } from "react";
import TabNav from "../components/TabNav";
import BackNav from "../components/BackNav";
import Delivery from "../components/Delivery";
import Payment from "../components/Payment";
import Finish from "../components/Finish";
import Summary from "../components/Summary";

export const TAB = {
  DELIVERY: "delivery",
  PAYMENT: "payment",
  FINISH: "finish",
}

export const defaultData = {
  orderId: "",
  delivery: {
    email: "",
    phone: "",
    address: "",
    isDropshipping: false,
    dropshippingName: "",
    dropshippingPhone: "",
    costOfGoods: 500000,
    dropshippingFee: 5900,
  },
  payment: {
    courier: "GO-SEND",
    gopayFee: 15000,
    jneFee: 9000,
    personal: 29000,
    payType: "",
  }
}

function App() {
  const [activeTab, setActiveTab] = useState();
  const [deliveryData, setDeliveryData] = useState(defaultData);

  useEffect(() => {
    if (localStorage.getItem("deliveryData")) {
      setActiveTab(localStorage.getItem("activeTab"));
    } else {
      setActiveTab(TAB.DELIVERY);
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <TabNav activeTab={activeTab} />
        {activeTab !== TAB.FINISH && 
          <BackNav activeTab={activeTab} setActiveTab={setActiveTab} />
        }
        <main>
          {activeTab === TAB.DELIVERY &&
            <Delivery deliveryData={deliveryData} setDeliveryData={setDeliveryData} />
          }
          {activeTab === TAB.PAYMENT &&
            <Payment deliveryData={deliveryData} setDeliveryData={setDeliveryData} />
          }
          {activeTab === TAB.FINISH &&
            <Finish setActiveTab={setActiveTab} />
          }
          <Summary activeTab={activeTab} setActiveTab={setActiveTab} deliveryData={deliveryData} />
        </main>
      </div>
    </div>
  );
}

export default App;
