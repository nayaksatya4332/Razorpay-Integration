package com.satya.razorpay.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Controller
public class PaymentController {
	@GetMapping(path = "/payment")
	public String payment() {
		return "payment";
	}

	@PostMapping(path = "/create_order")
	@ResponseBody
	public String createOrder(@RequestBody Map<String, Integer> data) throws RazorpayException {
		int amount = data.get("amount");
		RazorpayClient razorpay = new RazorpayClient("rzp_test_J9FKUdZ4JAtMa7", "kigS3eNeUjJQWE8bAFEy8tVJ");
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", amount*100); // amount in the smallest currency unit
		orderRequest.put("currency", "INR");
		orderRequest.put("receipt", "order_rcptid_11");

		Order order = razorpay.orders.create(orderRequest);
		
		System.out.println(order);
		return order.toString();
	}
}
