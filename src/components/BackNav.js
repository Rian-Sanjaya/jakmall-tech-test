import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TAB } from "../views/App";

function BackNav({ activeTab, setActiveTab }) {
  const onSetActiveTab = () => {
    if (activeTab === TAB.PAYMENT) {
      setActiveTab(TAB.DELIVERY);
      localStorage.setItem("activeTab", TAB.DELIVERY);
    }
  }

  return (
    <div className="back-nav" onClick={onSetActiveTab}>
      {activeTab !== TAB.FINISH && 
        <>
          <span style={{ marginRight: "12px" }}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></span>
          <span>{`${activeTab === TAB.DELIVERY ? "Back to cart" : "Back to delivery" }`}</span>
        </>
      }
      {activeTab === TAB.FINISH && 
        <>
          <span style={{ visibility: "hidden" }}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></span>
        </>
      }
    </div>
  )
}

export default BackNav;