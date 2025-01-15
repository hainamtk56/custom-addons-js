# __manifest__.py
{
    'name': 'Custom Document Management',
    'version': '1.0',
    'depends': ['base', 'mail'],
    'data': [
        'security/ir.model.access.csv',
        'views/document_views.xml',
        # 'views/view_message_form_inherit.xml',
    ],
    'installable': True,
    'application': True,
}