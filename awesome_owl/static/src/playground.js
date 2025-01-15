/** @odoo-module **/

import { Component, useState, markup } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";
import { TodoList } from "./todo/todo_list";

export class Playground extends Component {
    static template = "awesome_owl.Playground";
    static components = { Counter, Card, TodoList };

    setup() {
        this.state = useState({ sum: 0 });
        this.htmlContent = markup("<div style='color: red;'>This is <b>HTML</b> content!</div>");
    }

    incrementSum() {
        this.state.sum += 1;
    }
}