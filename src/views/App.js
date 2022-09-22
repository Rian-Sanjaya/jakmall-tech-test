import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TabNav from "../components/TabNav";
import BackNav from "../components/BackNav";
import Delivery from "../components/Delivery";
import Payment from "../components/Payment";
import Finish from "../components/Finish";
import Summary from "../components/Summary";

library.add(
  faCheck,
  faTimes,
  faArrowLeft,
)

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
    payType: "e-Wallet",
  }
}

function App() {
  const [activeTab, setActiveTab] = useState();
  const [deliveryData, setDeliveryData] = useState(defaultData);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("deliveryData")) {
      setActiveTab(localStorage.getItem("activeTab"));
    } else {
      setActiveTab(TAB.DELIVERY);
    }

    if (localStorage.getItem("deliveryData")) {
      setDeliveryData(JSON.parse(localStorage.getItem("deliveryData")));
    } else {
      setDeliveryData(defaultData);
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <TabNav activeTab={activeTab} />
        <BackNav activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === TAB.FINISH && 
          <div style={{  }}></div>
        }
        <main>
          {activeTab === TAB.DELIVERY &&
            <Delivery deliveryData={deliveryData} setDeliveryData={setDeliveryData} setIsValid={setIsValid} />
          }
          {activeTab === TAB.PAYMENT &&
            <Payment deliveryData={deliveryData} setDeliveryData={setDeliveryData} />
          }
          {activeTab === TAB.FINISH &&
            <Finish setActiveTab={setActiveTab} deliveryData={deliveryData} setDeliveryData={setDeliveryData} />
          }
          <Summary activeTab={activeTab} setActiveTab={setActiveTab} deliveryData={deliveryData} isValid={isValid} />
        </main>
      </div>
    </div>
  );
}

export default App;
