import { TAB } from "../views/App";
import { formattedCurrency } from "../helper/numberFunctions";

function Summary({ activeTab, setActiveTab, deliveryData, isValid }) {
  const shipmentFee = () => {
    if (activeTab !== TAB.DELIVERY) {
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
    if (activeTab !== TAB.DELIVERY) {
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
      if (isValid) {
        setActiveTab(TAB.PAYMENT);
        localStorage.setItem("activeTab", TAB.PAYMENT);
      }
    } else {
      setActiveTab(TAB.FINISH);
      localStorage.setItem("activeTab", TAB.FINISH);
    }
  };

  const formatCurrency = (val) => {
    if (!val) return formattedCurrency.format(0);
      return formattedCurrency.format(val);
  };

  const buttonText = () => {
    if (activeTab === TAB.DELIVERY) {
      return "Continue to Payment";
    } else {
      return `Pay with ${deliveryData.payment.payType}`;
    }
  };

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
    <div className="summary-content">
      <div className="summary-box">
        <div>
          <div className="top-summary">
            <div className="top-label">Summary</div>
            <div className="bottom-label">10 items purchased</div>
          </div>
          {activeTab !== TAB.DELIVERY && 
            <div className="delivery-estimation">
              <div className="divider"></div>
              <div className="top-text">Delivery estimation</div>
              <div className="bottom-text">
                <span>{ dayComputed() + " by " }</span>
                <span className="courier">{ deliveryData.payment.courier}</span>
              </div>
            </div>
          }
          {activeTab === TAB.FINISH && 
            <div className="payment-method">
              <div className="divider"></div>
              <div className="top-text">Payment method</div>
              <div className="bottom-text">
                <span className="pay-type">{ deliveryData.payment.payType}</span>
              </div>
            </div>
          }
        </div>
        <div className="bottom-summary">
          <div className="cost-box">
            <span className="text-label">Cost of goods</span>
            <span className="text-content cost">{ deliveryData.delivery.costOfGoods.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</span>
          </div>
          { deliveryData.delivery.isDropshipping && 
            <div className="cost-box">
              <span className="text-label">Dropshipping Fee</span>
              <span className="text-content cost">{ formatCurrency(deliveryData.delivery.dropshippingFee).replace(/[$]/g, '') }</span>
            </div>
          }
          { activeTab !== TAB.DELIVERY && 
            <div className="cost-box">
              <div>
                <span className="text-label courier">{`${deliveryData.payment.courier}`}</span>
                <span>{deliveryData.payment.courier === "Personal Courier" ? "" : " shipment"}</span>
              </div>
              <span className="text-content cost">{ formatCurrency(shipmentFee()).replace(/[$]/g, '') }</span>
            </div>
          }
          <div className="cost-box total">
            <span className="text-label total">Total</span>
            <span className="text-content total">{ formatCurrency(totalCost()).replace(/[$]/g, '') }</span>
          </div>
          {activeTab !== TAB.FINISH && 
            <div className="cost-box">
            <button onClick={handleTabClicked}>{ buttonText() }</button>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Summary;