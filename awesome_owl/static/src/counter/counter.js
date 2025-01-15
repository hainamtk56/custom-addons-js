/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Counter extends Component {
    static template = "awesome_owl.Counter";

    static props = {
        onChange: { type: Function, optional: true },
    };

    setup() {
        // Sử dụng useState để tạo trạng thái phản ứng (reactive state)
        this.state = useState({ value: 0 });
    }

    increment() {
        this.state.value++;

        //Luôn kiểm tra xem callback prop có tồn tại trước khi gọi nó, vì nó có thể là tùy chọn (optional: true).
        if (this.props.onChange) {
            this.props.onChange();
        }
    }
}