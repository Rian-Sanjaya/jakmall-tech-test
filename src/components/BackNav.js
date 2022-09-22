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
      <span>{`<- `}</span>
      <span>{`${activeTab === TAB.DELIVERY ? "Back to cart" : "Back to delivery" }`}</span>
    </div>
  )
}

export default BackNav;