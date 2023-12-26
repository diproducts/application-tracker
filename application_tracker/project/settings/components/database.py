DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': env('DATABASE_NAME'),  # type: ignore
            'USER': env('DATABASE_USER'),  # type: ignore
            'PASSWORD': env('DATABASE_PASSWORD'),  # type: ignore
            'HOST': 'localhost',  # type: ignore
            'PORT': '5432',  # type: ignore
        }
    }
