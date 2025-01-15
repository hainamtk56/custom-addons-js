# __manifest__.py
{
    'name': 'Custom Document Management',
    'version': '1.0',
    'depends': ['base', 'mail'],
    'data': [
        'security/ir.model.access.csv',
        'views/document_views.xml',
    ],
    'installable': True,
    'application': True,
}