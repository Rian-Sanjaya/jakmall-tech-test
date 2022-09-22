import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Delivery({ deliveryData, setDeliveryData, setIsValid }) {
  const { register, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    setValue("email", deliveryData.delivery.email);
    setValue("phone", deliveryData.delivery.phone);
    setValue("address", deliveryData.delivery.address);
    setValue("isDropshipping", deliveryData.delivery.isDropshipping);
    setValue("dropshippingName", deliveryData.delivery.dropshippingName);
    setValue("dropshippingPhone", deliveryData.delivery.dropshippingPhone);
    trigger();
  }, [setValue, trigger, deliveryData])

  const onSubmit = data => console.log("data: ", data);
  
  const onErrors = errors => console.log("Errors: ", errors);

  const onUpdate = async (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setValue(name, value);

    let result;
    if (watch("isDropshipping")) {
      result = await trigger(["email", "phone", "address", "dropshippingName", "dropshippingPhone"]);
    } else {
      result = await trigger(["email", "phone", "address"]);
    }
    
    const updateData = { 
      ...deliveryData,
      delivery: {
        ...deliveryData.delivery,
        [name]: value,
      }
    }

    setDeliveryData(updateData);
    setIsValid(result);
    localStorage.setItem("deliveryData", JSON.stringify(updateData) );
  }

  const fieldChange = async (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    setValue("isDropshipping", value);

    if (value === false) {
      setValue("dropshippingName", "");
      setValue("dropshippingPhone", "");
    }

    let result;
    if (watch("isDropshipping")) {
      result = await trigger(["email", "phone", "address", "dropshippingName", "dropshippingPhone"]);
    } else {
      result = await trigger(["email", "phone", "address"]);
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
    setIsValid(result);
    localStorage.setItem("deliveryData", JSON.stringify(updateData) );
  }

  return (
    <div className="main-content">
      <form className="form-box" onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className="delivery-container">
          <div className="page-label">
            <div className="text-label">Delivery details</div>
            <div className="underline-label"></div>
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
            <span className={`placeholder ${errors.email ? "error" : "valid"} ${watch("email") ? "filled" : ""}`}>Email</span>
            {errors.email && <span className="error-icon"><FontAwesomeIcon icon="fa-solid fa-times" /></span>}
            {!errors.email && <span className="valid-icon"><FontAwesomeIcon icon="fa-solid fa-check" /></span>}
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
            <span className={`placeholder ${errors.phone ? "error" : "valid"} ${watch("phone") ? "filled" : ""}`}>Phone Number</span>
            {errors.phone && <span className="error-icon"><FontAwesomeIcon icon="fa-solid fa-times" /></span>}
            {!errors.phone && <span className="valid-icon"><FontAwesomeIcon icon="fa-solid fa-check" /></span>}
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
            <span className={`placeholder ${errors.address ? "error" : "valid"} ${watch("address") ? "filled" : ""}`}>Delivery Address</span>
            {errors.address && <span className="error-icon"><FontAwesomeIcon icon="fa-solid fa-times" /></span>}
            {!errors.address && <span className="valid-icon"><FontAwesomeIcon icon="fa-solid fa-check" /></span>}
          </div>
        </div>
        <div className="dropshipper-container">
          <div className="check-box">
            <input 
              type="checkbox" 
              name="isDropshipping" 
              {...register("isDropshipping")}
              onChange={e => fieldChange(e)} 
            />
            <span className="text">Send as dropshipper</span>
          </div>
          <div className={`input-box ${watch("isDropshipping") ? errors.dropshippingName ? "error" : "valid" : ""} ${watch("dropshippingName") ? "filled" : ""}`}>
            <input 
              style={{ background: "transparent" }}
              name="dropshippingName"
              {...register("dropshippingName", {
                required: true,
              })} 
              disabled={!watch("isDropshipping")}
              onChange={e => onUpdate(e)}
            />
            <span className={`placeholder ${watch("isDropshipping") ? errors.dropshippingName ? "error" : "valid" : ""} ${watch("dropshippingName") ? "filled" : ""}`}>Dropshipper name</span>
            {watch("isDropshipping") && errors.dropshippingName && <span className="error-icon"><FontAwesomeIcon icon="fa-solid fa-times" /></span>}
            {watch("isDropshipping") && !errors.dropshippingName && <span className="valid-icon"><FontAwesomeIcon icon="fa-solid fa-check" /></span>}
          </div>
          <div className={`input-box ${watch("isDropshipping") ? errors.dropshippingPhone ? "error" : "valid" : ""} ${watch("dropshippingPhone") ? "filled" : ""}`}>
            <input 
              style={{ background: "transparent" }}
              name="dropshippingPhone" 
              {...register("dropshippingPhone", {
                required: true,
                pattern: /^[0-9-+()]{6,20}$/g,
              })}
              disabled={!watch("isDropshipping")}
              onChange={e => onUpdate(e)}
            />
            <span className={`placeholder ${watch("isDropshipping") ? errors.dropshippingPhone ? "error" : "valid" : ""} ${watch("dropshippingPhone") ? "filled" : ""}`}>Dropshipper phone number</span>
            {watch("isDropshipping") && errors.dropshippingPhone && <span className="error-icon"><FontAwesomeIcon icon="fa-solid fa-times" /></span>}
            {watch("isDropshipping") && !errors.dropshippingPhone && <span className="valid-icon"><FontAwesomeIcon icon="fa-solid fa-check" /></span>}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Delivery;