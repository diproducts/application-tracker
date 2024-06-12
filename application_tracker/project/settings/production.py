SECRET_KEY = env('SECRET_KEY')  # type: ignore # noqa: F821

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')  # type: ignore # noqa: F821

CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS')  # type: ignore # noqa: F821
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = env.list('CSRF_TRUSTED_ORIGINS')  # type: ignore # noqa: F821

EMAIL_BACKEND = 'application_tracker.users.backends.AsyncSmtpEmailBackend'

AWS_S3_CUSTOM_DOMAIN = env('AWS_S3_CUSTOM_DOMAIN')  # type: ignore # noqa: F821
AWS_CLOUDFRONT_KEY_ID = env.str('AWS_CLOUDFRONT_KEY_ID').strip()  # type: ignore # noqa: F821
AWS_CLOUDFRONT_KEY = env.str('AWS_CLOUDFRONT_KEY', multiline=True).encode('ascii').strip()  # type: ignore # noqa: F821
