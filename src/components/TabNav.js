// import { useEffect } from "react";
import { TAB } from "../views/App";

function TabNav({ activeTab }) {
  const toggleActive = (val) => {
    if (val === "delivery") {
      if (activeTab === TAB.FINISH || activeTab === TAB.PAYMENT || activeTab === TAB.DELIVERY) {
        return "active";
      } else {
        return "";
      }
    }

    if (val === "payment") {
      if (activeTab === TAB.FINISH || activeTab === TAB.PAYMENT) {
        return "active";
      } else {
        return "";
      }
    }

    if (val === "finish") {
      if (activeTab === TAB.FINISH) {
        return "active";
      } else {
        return "";
      }
    }
  };

  return (
    <div className="tab-nav">
      <ul>
        <li>
          <div>
            <div className={`tab-circle ${toggleActive("delivery")}`}><span>1</span></div>
            <span className="text">Delivery</span>
          </div>
          <span className="chev-right">{`>`}</span>
        </li>
        <li>
          <div>
            <div className={`tab-circle ${toggleActive("payment")}`}><span>2</span></div>
            <span className="text">Payment</span>
          </div>
          <span className="chev-right">{`>`}</span>
        </li>
        <li className="last">
          <div style={{ marginRight: "0" }}>
            <div className={`tab-circle ${toggleActive("finish")}`}><span>3</span></div>
            <span className="text">Finish</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default TabNav;