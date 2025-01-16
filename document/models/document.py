from odoo import models, fields, api


class Document(models.Model):
    _name = 'custom.document'
    _description = 'Custom Document'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char('Tên tài liệu', required=True)

    # Trường để upload một tệp đơn
    file = fields.Binary(
        string='Tệp đính kèm',
        attachment=True
    )
    file_name = fields.Char('Tên tệp')

    # @api.model_create_multi
    # def create(self, vals_list):
    #     documents = super().create(vals_list)
    #
    #     for doc in documents:
    #         attachment = self.env['ir.attachment'].create({
    #             'name': doc.file_name,
    #             'datas': doc.file,
    #             'res_model': 'custom.document',
    #             'res_id': doc.id,
    #             'type': 'binary',
    #         })
    #
    #         doc.message_post(
    #             attachment_ids=[attachment.id],
    #             subtype_xmlid="mail.mt_note",
    #         )
    #     return documents





