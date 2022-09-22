import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Payment({ deliveryData, setDeliveryData }) {
  const [checkedShpment, setCheckedShipment] = useState(deliveryData.payment.courier);
  const [checkedPayment, setCheckedPayment] = useState(deliveryData.payment.payType);

  const onShipmentCheck = (value) => {
    setCheckedShipment(value);

    const updateData = { 
      ...deliveryData,
      payment: {
        ...deliveryData.payment,
        courier: value,
      }
    }

    setDeliveryData(updateData);
    localStorage.setItem("deliveryData", JSON.stringify(updateData) );
  };

  const onPaymentCheck = (value) => {
    setCheckedPayment(value);

    const updateData = { 
      ...deliveryData,
      payment: {
        ...deliveryData.payment,
        payType: value,
      }
    }

    setDeliveryData(updateData);
    localStorage.setItem("deliveryData", JSON.stringify(updateData) );
  };

  return (
    <div className="main-content">
      <div className="payment-container">
        <div className="shipment-box">
          <div className="page-label">
            <div className="text-label">Shipment</div>
            <div className="underline-label"></div>
          </div>
          <div className="section-content">
            <div className={`check-box ${checkedShpment === "GO-SEND" ? "active" : ""}`} onClick={() => onShipmentCheck("GO-SEND")}>
              <div className="content">
                <div className="text">G0-SEND</div>
                <div className="fee">15,000</div>
              </div>
              {checkedShpment === "GO-SEND" && <span className="check-icon"><FontAwesomeIcon icon="fa-solid fa-check" /></span>}
            </div>
            <div className={`check-box ${checkedShpment === "JNE" ? "active" : ""}`} onClick={() => onShipmentCheck("JNE")}>
              <div className="content">
                <div className="text">JNE</div>
                <div className="fee">9,000</div>
              </div>
              {checkedShpment === "JNE" && <span className="check-icon"><FontAwesomeIcon icon="fa-solid fa-check" /></span>}
            </div>
            <div className={`check-box ${checkedShpment === "Personal Courier" ? "active" : ""}`} onClick={() => onShipmentCheck("Personal Courier")}>
              <div className="content">
                <div className="text">Personal Courier</div>
                <div className="fee">29,000</div>
              </div>
              {checkedShpment === "Personal Courier" && <span className="check-icon"><FontAwesomeIcon icon="fa-solid fa-check" /></span>}
            </div>
          </div>
        </div>
        <div className="payment-box">
          <div className="page-label">
            <div className="text-label">Payment</div>
            <div className="underline-label"></div>
          </div>
          <div className="section-content">
            <div className={`check-box ${checkedPayment === "e-Wallet" ? "active" : ""}`} onClick={() => onPaymentCheck("e-Wallet")}>
              <div className="content">
                <div className="text">e-Wallet</div>
                <div className="fee">1,500,000 left</div>
              </div>
              {checkedPayment === "e-Wallet" && <span className="check-icon"><FontAwesomeIcon icon="fa-solid fa-check" /></span>}
            </div>
            <div className={`check-box ${checkedPayment === "Bank Transfer" ? "active" : ""}`} onClick={() => onPaymentCheck("Bank Transfer")}>
              <div className="content">
                <div className="text only">Bank Transfer</div>
              </div>
              {checkedPayment === "Bank Transfer" && <span className="check-icon"><FontAwesomeIcon icon="fa-solid fa-check" /></span>}
            </div>
            <div className={`check-box ${checkedPayment === "Virtual Account" ? "active" : ""}`} onClick={() => onPaymentCheck("Virtual Account")}>
              <div className="content">
                <div className="text only">Virtual Account</div>
              </div>
              {checkedPayment === "Virtual Account" && <span className="check-icon"><FontAwesomeIcon icon="fa-solid fa-check" /></span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment;