FROM python:3.10.12-buster

WORKDIR /opt/project

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH .

RUN set -xe \
    && apt-get update \
    && apt-get install -y --no-install-recommends build-essential \
    && pip install virtualenvwrapper poetry==1.7.1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY ["poetry.lock", "pyproject.toml", "./"]
RUN poetry install --no-root

COPY ["README.md", "Makefile", "./"]
COPY application_tracker application_tracker
COPY .env .env

EXPOSE 8000

COPY scripts/entrypoint.sh /entrypoint.sh
COPY scripts/worker-entrypoint.sh /worker-entrypoint.sh
RUN chmod a+x /entrypoint.sh
RUN chmod a+x /worker-entrypoint.sh
