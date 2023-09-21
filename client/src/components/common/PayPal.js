import React, { memo, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const style = { layout: "vertical" };
// NÚT XÁC NHẬN
const ButtonWrapper = ({ currency, showSpinner, amount }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: { ...options, currency: currency },
    });
  }, [currency, showSpinner]);
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderID) => orderID)
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            console.log(response);
            // if(response.status==='COMPLETED'){
            //     console.log(response)
            // }
          })
        }
      />
    </>
  );
};

const PayPal = ({ amount }) => {
  return (
    <div className="max-w-[750px] min-h-[200px]">
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper currency={"USD"} amount={amount} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
};

export default memo(PayPal);
