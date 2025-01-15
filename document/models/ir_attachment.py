from odoo import models, api
from odoo.exceptions import AccessError

class IrAttachment(models.Model):
    _inherit = 'ir.attachment'

    @api.model
    def unlink(self):
        """Ngăn chặn xóa tệp đính kèm"""
        if not self.env.is_admin():
            raise AccessError("Không được phép xóa tệp đính kèm")
        return super().unlink()

    @api.model
    def write(self, vals):
        """Ngăn chặn sửa tệp đính kèm"""
        if not self.env.is_admin():
            raise AccessError("Không được phép chỉnh sửa tệp đính kèm")
        return super().write(vals)

    def _post_add_create(self):
        """Post message in chatter after attachment creation"""
        for attachment in self:
            if attachment.res_model and attachment.res_id:
                record = self.env[attachment.res_model].browse(attachment.res_id)
                if hasattr(record, 'message_post'):
                    body = f"""<p>Tệp đính kèm mới đã được tải lên:</p>
                            <p><a href="/web/content/{attachment.id}?download=true">{attachment.name}</a></p>"""
                    record.message_post(body=body, message_type='notification')

    @api.model_create_multi
    def create(self, vals_list):
        attachments = super().create(vals_list)
        for attachment in attachments:
            attachment._post_add_create()
        return attachments