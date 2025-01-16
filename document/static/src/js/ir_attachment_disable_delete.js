odoo.define('custom_module.ir_attachment_disable_delete', function (require) {
    "use strict";

    const AttachmentBox = require('mail.attachment_box');

    AttachmentBox.include({
        _getAttachmentActions(attachment) {
            const actions = this._super(attachment);
            // Loại bỏ nút xóa khỏi danh sách hành động
            return actions.filter(action => action.name !== 'delete');
        },
    });
});
