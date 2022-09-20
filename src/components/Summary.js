function Summary() {
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
            <span className="text-content">500,000</span>
          </div>
          <div className="cost-box">
            <span className="text-label">Dropshipping Fee</span>
            <span className="text-content">5,900</span>
          </div>
          <div className="cost-box">
            <span className="text-label">Total</span>
            <span className="text-content">505,900</span>
          </div>
          <div className="cost-box">
            <button>Continue Payment</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary;