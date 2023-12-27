from pathlib import Path

import environ
from split_settings.tools import include

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
ENVVAR_SETTINGS_PREFIX = 'APPLICATION_TRACKER_SETTING_'

env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')

STAGE = env.get_value('STAGE', default='development')  # type: ignore
STAGE_SETTINGS = f'{STAGE}.py'

include(
    'base.py',
    'components/logging.py',
    'components/database.py',
    'components/email.py',
    'components/storage.py',
    'components/rest_framework.py',
    STAGE_SETTINGS,
    'envvars.py',
)
