DEBUG = True

SECRET_KEY = 'django-insecure-6f572t$tk#vxwd+ce1*4&_1@=g+$2=-lc%6(9-1@s8la_re3gl'

CORS_ALLOWED_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']

EMAIL_BACKEND = env(  # type: ignore # noqa: F821
    'EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend'
) or 'django.core.mail.backends.console.EmailBackend'

LOGGING['formatters']['colored'] = {  # type: ignore # noqa: F821
    '()': 'colorlog.ColoredFormatter',
    'format': '%(log_color)s%(asctime)s %(levelname)s %(name)s %(bold_white)s%(message)s',
}
LOGGING['loggers']['application_tracker']['level'] = 'DEBUG'  # type: ignore # noqa: F821
LOGGING['handlers']['console']['level'] = 'DEBUG'  # type: ignore # noqa: F821
LOGGING['handlers']['console']['formatter'] = 'colored'  # type: ignore # noqa: F821
