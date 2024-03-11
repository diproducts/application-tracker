#!/usr/bin/env bash

set -e

exec poetry run celery -A application_tracker worker --loglevel=info --concurrency 1 -E
