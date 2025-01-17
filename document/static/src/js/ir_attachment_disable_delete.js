/** @odoo-module */

import { patch } from '@web/core/utils/patch';
import { AttachmentList } from '@mail/core/common/attachment_list';

patch(AttachmentList.prototype, {
    setup() {
        this._super(...arguments);
    },

    get showDelete() {
        return false;
    }
});