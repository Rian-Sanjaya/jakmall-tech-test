import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { defaultData } from "../views/App";

function Delivery({ deliveryData, setDeliveryData }) {
  const { register, handleSubmit, trigger, watch, setValue, formState: { errors, isValid } } = useForm();

  // only execute once on first mount / load
  useEffect(() => {
    let deliverData = {};

    if (localStorage.getItem("deliveryData")) {
      deliverData = {...JSON.parse(localStorage.getItem("deliveryData"))};
    } else {
      deliverData = defaultData;
    }

    setValue("email", deliverData.delivery.email);
    setValue("phone", deliverData.delivery.phone);
    setValue("address", deliverData.delivery.address);
    setValue("isDropshipping", deliverData.delivery.isDropshipping);
    setValue("dropshippingName", deliverData.delivery.dropshippingName);
    setValue("dropshippingPhone", deliverData.delivery.dropshippingPhone);
    trigger();

    const updateData = { 
      ...deliverData,
      delivery: {
        ...deliverData.delivery,
        email: watch("email"),
        phone: watch("phone"),
        address: watch("address"),
        isDropshipping: watch("isDropshipping"),
        dropshippingName: watch("dropshippingName"),
        dropshippingPhone: watch("dropshippingPhone"),
      }
    }
    
    setDeliveryData(updateData);
    localStorage.setItem("deliveryData", JSON.stringify(updateData) );

  }, [setValue, trigger, watch, setDeliveryData])

  // execute everytime when there is an update to update the localstorage
  useEffect(() => {
    let deliverData = {};

    if (localStorage.getItem("deliveryData")) {
      deliverData = {...JSON.parse(localStorage.getItem("deliveryData"))};
    } else {
      deliverData = defaultData;
    }
    
    const updateData = { 
      ...deliverData,
      delivery: {
        ...deliverData.delivery,
        email: watch("email"),
        phone: watch("phone"),
        address: watch("address"),
        isDropshipping: watch("isDropshipping"),
        dropshippingName: watch("dropshippingName"),
        dropshippingPhone: watch("dropshippingPhone"),
      }
    }

    localStorage.setItem("deliveryData", JSON.stringify(updateData) );
  });

  const onSubmit = data => console.log("data: ", data);
  
  const onErrors = errors => console.log("Errors: ", errors);

  const onUpdate = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setValue(name, value);
    trigger(name);
    
    const updateData = { 
      ...deliveryData,
      delivery: {
        ...deliveryData.delivery,
        [name]: value,
      }
    }

    setDeliveryData(updateData);
  }

  const fieldChange = (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    setValue("isDropshipping", value);

    if (value === false) {
      setValue("dropshippingName", "");
      setValue("dropshippingPhone", "");
    }

    const updateData = { 
      ...deliveryData,
      delivery: {
        ...deliveryData.delivery,
        isDropshipping: value,
        dropshippingName: value === false ? "" : deliveryData.delivery.dropshippingName,
        dropshippingPhone: value === false ? "" : deliveryData.delivery.dropshippingPhone,
      }
    }

    setDeliveryData(updateData);
  }

  return (
    <div className="main-content">
      <form className="form-box" onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className="delivery-container">
          <div>
            <div>Delivery details</div>
          </div>
          <div className={`input-box ${errors.email ? "error" : "valid"} ${watch("email") ? "filled" : ""}`}>
            <input 
              name="email" 
              {...register("email", { 
                required: true, 
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })} 
              onChange={e => onUpdate(e)}
            />
            <span className="placeholder">Email</span>
          </div>
          <div className={`input-box ${errors.phone ? "error" : "valid"} ${watch("phone") ? "filled" : ""}`}>
            <input 
              name="phone" 
              {...register("phone", { 
                required: true, 
                pattern: /^[0-9-+()]{6,20}$/g,
              })} 
              onChange={e => onUpdate(e)}
            />
            <span className="placeholder">Phone Number</span>
          </div>
          <div className={`input-box ${errors.address ? "error" : "valid"} ${watch("address") ? "filled" : ""}`}>
            <textarea 
              rows="3" 
              name="address" 
              {...register("address", {
                required: true,
                maxLength: 120,
              })}
              onChange={e => onUpdate(e)}
            />
            <span className="placeholder">Delivery Address</span>
          </div>
        </div>
        <div className="dropshipper-container">
          <div>
            <input 
              type="checkbox" 
              name="isDropshipping" 
              {...register("isDropshipping")}
              onChange={e => fieldChange(e)} 
            />
            <span>Send as dropshipper</span>
          </div>
          <div className={`input-box ${watch("isDropshipping") ? errors.dropshippingName ? "error" : "valid" : ""} ${watch("dropshippingName") ? "filled" : ""}`}>
            <input 
              name="dropshippingName"
              {...register("dropshippingName", {
                required: true,
              })} 
              disabled={!watch("isDropshipping")}
              onChange={e => onUpdate(e)}
            />
            <span className="placeholder">Dropshipper name</span>
          </div>
          <div className={`input-box ${watch("isDropshipping") ? errors.dropshippingPhone ? "error" : "valid" : ""} ${watch("dropshippingPhone") ? "filled" : ""}`}>
            <input 
              name="dropshippingPhone" 
              {...register("dropshippingPhone", {
                required: true,
                minLength: 6, 
                maxLength: 20,
              })}
              disabled={!watch("isDropshipping")}
              onChange={e => onUpdate(e)}
            />
            <span className="placeholder">Dropshipper phone number</span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Delivery;