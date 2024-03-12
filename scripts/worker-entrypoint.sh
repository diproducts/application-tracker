#!/usr/bin/env bash

set -e

exec poetry run celery -A application_tracker.project worker --loglevel=info --concurrency 1 -E
