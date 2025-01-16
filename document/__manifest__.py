# __manifest__.py
{
    'name': 'Custom Document Management',
    'version': '1.0',
    'depends': ['base', 'mail'],
    'data': [
        'security/ir.model.access.csv',
        'security/record_rule.xml',
        'views/document_views.xml',
    ],
    'assets': {
            'web.assets_backend': [
                'custom_module/static/src/js/ir_attachment_disable_delete.js',
            ],
        },
    'installable': True,
    'application': True,
}