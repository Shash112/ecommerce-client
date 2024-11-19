import { useRazorpay } from "react-razorpay";

export default function PaymentButton({amount}) {
  
  const {Razorpay} = useRazorpay();
  
//   const RAZORPAY_KEY_ID = import.meta.env.RAZORPAY_ID;

  const handlePayment = async () => {
    try {
      // Make the API call to backend
      const response = await fetch("https://razorpay-node-js-backend.vercel.app/generateOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount * 100 }),
      });

      const order = await response.json();
      console.log(order)
    // add option for the payment gateway it can be dynamic if you want 
    // we can use prop drilling to make it dynamic
      const options = {
        key: "rzp_test_QnZqng7pQVvf4L",
        amount: order.amount,
        currency: order.currency,
        name: "Your Company Name", // Add company details
        description: "Payment for your order", // Add order details
        order_id: order.id,
        // this is make function which will verify the payment
        // after making the payment 
        handler: async (response) => {
          try {
            await fetch("https://razorpay-node-js-backend.vercel.app/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            alert("Payment successful!");
          } catch (err) {
            alert("Payment failed: " + err.message);
          }
        },
        prefill: {
          name: "John Doe", // add customer details
          email: "john@example.com", // add customer details
          contact: "9999999999", // add customer details
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzpay = new Razorpay(options);

      rzpay.open(options);
    } catch (err) {
      alert("Error creating order: " + err.message);
    }
  };

  return <button onClick={handlePayment} className='bg-blue-600 p-2 text-white w-full mt-2'>Pay {amount}</button>;
}