import React,{ useLayoutEffect} from 'react'

function ShippingPolicy() {
    useLayoutEffect(() => {
        window.scrollTo({top: 0, left: 0,});
      }, [])
    return (
        <div>
            <h1>Shipping policy</h1>


            We offer worldwide free shipping on all our products, and we deliver to almost every country in the world. However, please note that the estimated delivery time is 10-30 business days for most countries, with a maximum delivery time of 72 business days. Our delivery partners usually deliver the products within the expected timeframe of 10-30 business days.

            Upon shipment of your order, we will send you an email with a tracking number, although please note that tracking may not always be available due to the free shipping option. Additionally, items in the same purchase may be shipped separately for logistical reasons, even if you have requested combined shipping. Please be aware that any custom fees incurred upon shipment are not our responsibility.

            Tracking numbers are assigned to packages once they have shipped, and we will send you an email with the tracking code. However, please note that the current status of your package may not be the actual status, and if your package is not moving, it could already be in your country and not yet updated.

            If you have any further questions, please do not hesitate to contact us, and we will do our best to assist you.
        </div>
    )
}
export default ShippingPolicy     
