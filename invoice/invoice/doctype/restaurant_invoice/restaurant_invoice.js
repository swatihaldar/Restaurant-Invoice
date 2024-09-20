// Copyright (c) 2024, swati and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Restaurant Invoice", {
// 	refresh(frm) {

// 	},
// });



frappe.ui.form.on("Restaurant Invoice", {
	refresh(frm) {
        frm.trigger("update_total_amount");
	},

    update_total_amount(frm) {
        let total_amount = 0;
        let discount_percentage = 10;

        frm.doc.product_items.forEach(item => {
            total_amount += item.product_quantity * item.product_price;
        });

        frm.set_value("total_amount", total_amount);

        let discount = (total_amount * discount_percentage) / 100;
        let payable_amount = total_amount - discount;

        frm.set_value("discount", discount);
        frm.set_value("payable_amount", payable_amount);
    }
});

frappe.ui.form.on("Product Table", {
    product_quantity(frm, cdt, cdn) {
        console.log(cdt, cdn);           // cdt- child document table,  cdn-child document name
        console.log(frappe.get_doc(cdt, cdn));
        frm.trigger("update_total_amount");
    }, 

    // product_price(frm, cdt, cdn) {
    //     frm.trigger("update_total_amount");
    // },

    product_items_remove(frm) {
        frm.trigger("update_total_amount");
    }
});