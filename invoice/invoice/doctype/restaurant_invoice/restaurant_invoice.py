# Copyright (c) 2024, swati and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class RestaurantInvoice(Document):
	def validate(self):
		total_amount = 0

		for item in self.product_items:
			total_amount += item.product_quantity * item.product_price

		self.total_amount = total_amount


		discount_percentage = 10
		discount_amount = (self.total_amount * discount_percentage) / 100

		self.payable_amount = self.total_amount - discount_amount
		self.discount = discount_amount
