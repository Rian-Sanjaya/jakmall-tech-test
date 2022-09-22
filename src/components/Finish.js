import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TAB, defaultData } from "../views/App";
import { randomSpecificString } from "../helper/stringFunctions";

function Finish({ setActiveTab, deliveryData, setDeliveryData }) {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const result = randomSpecificString(5, "23456789abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ")
    setOrderId(result);
  }, [])

  const handleBackClicked = () => {
    setActiveTab(TAB.DELIVERY);
    localStorage.setItem("activeTab", TAB.DELIVERY);

    setDeliveryData(defaultData);
    localStorage.setItem("deliveryData", JSON.stringify(defaultData));
  }

  const dayComputed = () => {
    if (deliveryData.payment.courier === "GO-SEND") {
      return "today";
    } else if (deliveryData.payment.courier === "JNE") {
      return "2 days";
    } else if (deliveryData.payment.courier === "Personal Courier") {
      return "1 day";
    }

    return "";
  };

  return (
    <div className="main-content">
      <div className="finish-container">
        <div className="finish-box">
          <div className="page-label">
            <div className="text-label">Thank you</div>
            <div className="underline-label"></div>
          </div>
          <div className="order-box">
            <div className="orderID">
              <span>Order ID: {orderId}</span>
            </div>
            <div className="description">
              <span>Your order will be delivered {dayComputed()} with {deliveryData.payment.courier}</span>
            </div>
          </div>
          <div className="back-home" onClick={handleBackClicked}>
            <span style={{ marginRight: "12px" }}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></span>
            <span>Go to homepage</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Finish;