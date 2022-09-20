function TabNav() {
  return (
    <div className="tab-nav">
      <ul>
        <li>
          <div>
            <div className="tab-circle"><span>1</span></div>
            <span className="text">Delivery</span>
          </div>
          <span className="chev-right">{`>`}</span>
        </li>
        <li>
          <div>
            <div className="tab-circle"><span>2</span></div>
            <span className="text">Payment</span>
          </div>
          <span className="chev-right">{`>`}</span>
        </li>
        <li className="last">
          <div style={{ marginRight: "0" }}>
            <div className="tab-circle"><span>3</span></div>
            <span className="text">Finish</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default TabNav;