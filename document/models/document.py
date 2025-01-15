# models/document.py
from odoo import models, fields, api
from odoo.exceptions import AccessError


class Document(models.Model):
    _name = 'custom.document'
    _description = 'Custom Document'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char('Tên tài liệu', required=True)

    # Trường để upload một tệp đơn
    single_file = fields.Binary(
        string='Tệp đính kèm',
        attachment=True
    )
    single_file_name = fields.Char('Tên tệp')

    # Trường để upload nhiều tệp
    multi_files = fields.Many2many(
        'ir.attachment',
        'custom_document_attachment_rel',
        'document_id',
        'attachment_id',
        string='Nhiều tệp đính kèm',
        tracking=True
    )

    # @api.model_create_multi
    # def create(self, vals_list):
    #     records = super().create(vals_list)
    #     for record in records:
    #         # Log message khi tạo mới có tệp đính kèm
    #         if record.single_file:
    #             record._log_file_upload('single_file', record.single_file_name)
    #     return records
    #
    # def write(self, vals):
    #     # Kiểm tra và ngăn chặn việc cập nhật tệp đã tồn tại
    #     if 'single_file' in vals and self.single_file:
    #         raise AccessError('Không được phép chỉnh sửa tệp đã tải lên')
    #
    #     result = super().write(vals)
    #
    #     # Log message khi upload tệp mới
    #     if 'single_file' in vals and vals.get('single_file'):
    #         self._log_file_upload('single_file', vals.get('single_file_name'))
    #
    #     return result
    #
    # def _log_file_upload(self, field_name, file_name):
    #     """Ghi log khi có tệp được tải lên"""
    #     self.ensure_one()
    #     body = f"""
    #         <p>Tệp mới đã được tải lên bởi: {self.env.user.name}</p>
    #         <p>Tên tệp: {file_name}</p>
    #     """
    #     self.message_post(body=body, message_type='notification')

        # body = f"""<p>Tệp đính kèm mới đã được tải lên:</p>
        #                             <p><a href="/web/content/{record.single_file.id}?download=true">{record.single_file.name}</a></p>"""
        # record.message_post(body=body, message_type='notification')