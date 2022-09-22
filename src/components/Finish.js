import { TAB } from "../views/App";

function Finish({ setActiveTab }) {
  const handleBackClicked = () => {
    setActiveTab(TAB.DELIVERY);
    localStorage.setItem("activeTab", TAB.DELIVERY);
  }

  return (
    <div className="main-content">
      Finish
      <div style={{ cursor: "pointer" }} onClick={handleBackClicked}>
        <span>{`<- `}</span>
        <span>back to homepage</span>
      </div>
    </div>
  )
}

export default Finish;