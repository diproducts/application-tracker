PHONY: install
install:
	poetry install

.PHONY: install-pre-commit
install-pre-commit:
	poetry run pre-commit uninstall; poetry run pre-commit install

.PHONY: lint
lint:
	poetry run pre-commit run --all-files

.PHONY: migrate
migrate:
	poetry run python3 -m application_tracker.manage migrate

.PHONY: migrations
migrations:
	poetry run python3 -m application_tracker.manage makemigrations

.PHONY: run-dependencies
run-dependencies:
	test -f .env || touch .env
	docker compose -f docker-compose.backend-dev.yaml up --force-recreate db

.PHONY: run-backend
run-backend:
	test -f .env || touch .env
	docker compose -f docker-compose.frontend-dev.yaml down; docker compose -f docker-compose.frontend-dev.yaml build; docker compose -f docker-compose.frontend-dev.yaml up

.PHONY: stop-backend
stop-backend:
	docker compose -f docker-compose.frontend-dev.yaml down

.PHONY: runserver
runserver:
	poetry run python -m application_tracker.manage runserver

.PHONY: shell
shell:
	poetry run python -m application_tracker.manage shell_plus

.PHONY: superuser
superuser:
	poetry run python -m application_tracker.manage createsuperuser
