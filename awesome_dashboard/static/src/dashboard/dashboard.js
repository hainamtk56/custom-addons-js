/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "../dashboard_item/dashboard_item";
import { Dialog } from "@web/core/dialog/dialog";
import { CheckBox } from "@web/core/checkbox/checkbox";
import { browser } from "@web/core/browser/browser";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, DashboardItem };

    setup() {
        this.action = useService("action");
        this.statistics = useState(useService("awesome_dashboard.statistics"));
        this.dialog = useService("dialog");
        this.display = {
            controlPanel: {},
        }
        this.items = registry.category("awesome_dashboard").getAll();
        this.state = useState({
            disabledItems: browser.localStorage.getItem("disabledDashboardItems") ? browser.localStorage.getItem("disabledDashboardItems")?.split(",") : []
        });
    }

    openConfiguration() {
        this.dialog.add(ConfigurationDialog, {
            items: this.items,
            disabledItems: this.state.disabledItems,
            onUpdateConfiguration: this.updateConfiguration.bind(this),
        })
    }

    updateConfiguration(newDisabledItems) {
        this.state.disabledItems = newDisabledItems;
    }

    openCustomerView() {
        this.action.doAction("base.action_partner_form");
    }

    openLeads() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "All leads",
            res_model: "crm.lead",
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }

}

//class ConfigurationDialog extends Component {
//    static template = "awesome_dashboard.ConfigurationDialog";
//    static components = { Dialog, CheckBox };
////    static props = ["close", "items", "disabledItems", "onUpdateConfiguration"];
//    static props = {
//      close: { type: Function },
//      items: {type: Array },
//      disabledItems: {type: Array },
//      onUpdateConfiguration: { type: Function }
//    };
//    setup() {
//        this.items = useState(this.props.items.map((item) => {
//            return {
//                ...item,
//                enabled: !this.props.disabledItems.includes(item.id),
//            }
//        }));
//    }
//
//    done() {
//        this.props.close();
//    }
//
//    onChange(checked, changedItem) {
//        changedItem.enabled = checked;
//        const newDisabledItems = Object.values(this.items).filter(
//            (item) => !item.enabled
//        ).map((item) => item.id)
//
//        browser.localStorage.setItem(
//            "disabledDashboardItems",
//            newDisabledItems.join(",")
//        );
//
//        this.props.onUpdateConfiguration(newDisabledItems);
//    }
//}

class ConfigurationDialog extends Component {
    static template = "awesome_dashboard.ConfigurationDialog";
    static components = { Dialog, CheckBox };
    static props = {
        close: { type: Function },
        items: { type: Array },
        disabledItems: { type: Array },
        onUpdateConfiguration: { type: Function }
    };

    setup() {
        // Tạo một bản copy của items và sử dụng useState để theo dõi state
        this.state = useState({
            itemStates: this.props.items.map((item) => ({
                id: item.id,
                description: item.description,
                // Các thuộc tính khác của item
                enabled: !this.props.disabledItems.includes(item.id),
            }))
        });

        this.onChange = this.onChange.bind(this);
    }

    onChange(checked, changedItem) {
        // Tìm và cập nhật item trong state thay vì mutate trực tiếp
        const updatedItems = this.state.itemStates.map(item => {
            if (item.id === changedItem.id) {
                return { ...item, enabled: checked };
            }
            return item;
        });
        this.state.itemStates = updatedItems;

        // Cập nhật danh sách các items bị disable
        const newDisabledItems = updatedItems
            .filter(item => !item.enabled)
            .map(item => item.id);

        // Lưu vào localStorage
        browser.localStorage.setItem(
            "disabledDashboardItems",
            newDisabledItems.join(",")
        );

        // Gọi callback để cập nhật configuration
        this.props.onUpdateConfiguration(newDisabledItems);
    }

    done() {
        this.props.close();
    }
}

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);