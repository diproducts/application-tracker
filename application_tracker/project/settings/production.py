SECRET_KEY = env('SECRET_KEY')  # type: ignore # noqa: F821

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')  # type: ignore # noqa: F821

CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS')  # type: ignore # noqa: F821
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = env.list('CSRF_TRUSTED_ORIGINS')  # type: ignore # noqa: F821

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
