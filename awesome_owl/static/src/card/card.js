/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Card extends Component {
    static template = "awesome_owl.Card";

    static props = {
        title: { type: String, optional: false },
        slots: { type: Object, default: true }, // để dùng t-slot="default"
    };

    setup() {
        this.state = useState({ isOpen: true});
    }

    toggleContent() {
        this.state.isOpen = !this.state.isOpen;
    }
}