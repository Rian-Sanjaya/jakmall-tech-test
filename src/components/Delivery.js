function Delivery() {
  return (
    <div className="delivery-content">
      <div className="form-box">
        <div className="delivery-container">
          <div>
            <div>Delivery details</div>
          </div>
          <div className="input-box">
            <input type="text" name="email-input" id="email-input" autoComplete="false" />
            <span className="placeholder">Email</span>
          </div>
          <div className="input-box">
            <input name="phone-input" id="phone-input" />
            <span className="placeholder">Phone Number</span>
          </div>
          <div className="input-box">
            <textarea rows="3" name="address-input" id="address-input" />
            <span className="placeholder">Delivery Address</span>
          </div>
        </div>
        <div className="dropshipper-container">
          <div>
            <input type="checkbox" />
            <span>Send as dropshipper</span>
          </div>
          <div className="input-box">
            <input name="dropshipper-name-input" id="dropshipper-name-input" />
            <span className="placeholder">Dropshipper name</span>
          </div>
          <div className="input-box">
            <input name="dropshipper-phone-input" id="dropshipper-phone-input" />
            <span className="placeholder">Dropshipper phone number</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delivery;