import { useEffect, useState } from "react";
import { TAB, defaultData } from "../views/App";

function Summary({ activeTab, setActiveTab, deliveryData }) {
  const shipmentFee = () => {
    if (activeTab === TAB.PAYMENT) {
      if (deliveryData.payment.courier === "GO-SEND") {
        return deliveryData.payment.gopayFee;
      } else if (deliveryData.payment.courier === "JNE") {
        return deliveryData.payment.jneFee;
      } else {
        return deliveryData.payment.personal;
      }
    }
  };

  const totalCost = () => {
    let total = 0;
    total += deliveryData.delivery.costOfGoods;
    if (deliveryData.delivery.isDropshipping) {
      total += deliveryData.delivery.dropshippingFee;
    }
    if (activeTab === TAB.PAYMENT) {
      if (deliveryData.payment.courier === "GO-SEND") {
        total += deliveryData.payment.gopayFee;
      } else if (deliveryData.payment.courier === "JNE") {
        total += deliveryData.payment.jneFee;
      } else {
        total += deliveryData.payment.personal;
      }
    }
    return total;
  };

  const handleTabClicked = () => {
    if (activeTab === TAB.DELIVERY) {
      setActiveTab(TAB.PAYMENT);
      localStorage.setItem("activeTab", TAB.PAYMENT);
    } else {
      setActiveTab(TAB.FINISH);
      localStorage.setItem("activeTab", TAB.FINISH);
    }
  };

  return (
    <div className="summary-content">
      <div className="summary-box">
        <div className="top-summary">
          <div>Summary</div>
          <div>10 items purchased</div>
        </div>
        <div className="bottom-summary">
          <div className="cost-box">
            <span className="text-label">Cost of goods</span>
            <span className="text-content">{ deliveryData.delivery.costOfGoods }</span>
          </div>
          { deliveryData.delivery.isDropshipping && 
            <div className="cost-box">
              <span className="text-label">Dropshipping Fee</span>
              <span className="text-content">{ deliveryData.delivery.dropshippingFee }</span>
            </div>
          }
          { activeTab === TAB.PAYMENT && 
            <div className="cost-box">
              <span className="text-label">{`${deliveryData.payment.courier} ${deliveryData.payment.courier === "Personal Courier" ? "" : " shipment"}`}</span>
              <span className="text-content">{ shipmentFee() }</span>
            </div>
          }
          <div className="cost-box">
            <span className="text-label">Total</span>
            <span className="text-content">{ totalCost() }</span>
          </div>
          {activeTab !== TAB.FINISH && 
            <div className="cost-box">
            <button onClick={handleTabClicked}>Continue Payment</button>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Summary;