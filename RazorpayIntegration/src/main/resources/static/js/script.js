  $(".btn").click(function () {
    let amount = $("#amount").val();
    if (amount == "") {
      alert("Invalid Amount..");
      return;
    }
    $.ajax({
      url: "/create_order",
      data: JSON.stringify({ amount: amount }),
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        console.log(response);
        if (response.status == "created") {
          var options = {
            key: "rzp_test_J9FKUdZ4JAtMa7", // Enter the Key ID generated from the Dashboard
            amount: response.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "SATYA",
            description: "Test Transaction",
            image:
              "/image/logo.png",
            order_id: response.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);
              console.log("Payment Successful");
              alert("Payment Successful");
            },
            "prefill": {
				"name": "Gaurav Kumar",
				"email": "gaurav.kumar@example.com",
				"contact": "9000090000"
			},
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
          var rzp1 = new Razorpay(options);
          rzp1.on("payment.failed", function (response) {
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
			alert("Payment failed....");
          });
          rzp1.open();
        }
      },
      error: function (error) {
		alert
        console.log(error);
      },
    });
  });
