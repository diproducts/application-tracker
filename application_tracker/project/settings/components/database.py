DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DATABASE_NAME'),  # type: ignore # noqa: F821
        'USER': env('DATABASE_USER'),  # type: ignore # noqa: F821
        'PASSWORD': env('DATABASE_PASSWORD'),  # type: ignore # noqa: F821
        'HOST': 'localhost',  # type: ignore # noqa: F821
        'PORT': '5432',  # type: ignore # noqa: F821
    }
}
