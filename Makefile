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
	docker compose -f docker-compose.backend-dev.yaml down; \
	docker compose -f docker-compose.backend-dev.yaml up --force-recreate db --force-recreate redis --force-recreate worker

.PHONY: run-dependencies-mail
run-dependencies-mail:
	test -f .env || touch .env
	EMAIL_BACKEND=application_tracker.users.backends.AsyncSmtpEmailBackend docker compose -f docker-compose.backend-dev.yaml down; \
	EMAIL_BACKEND=application_tracker.users.backends.AsyncSmtpEmailBackend docker compose -f docker-compose.backend-dev.yaml up --force-recreate db --force-recreate redis --force-recreate worker

.PHONY: stop-dependencies
stop-dependencies:
	docker compose -f docker-compose.backend-dev.yaml down

.PHONY: run-backend
run-backend:
	test -f .env || touch .env
	docker compose -f docker-compose.frontend-dev.yaml down; \
	docker compose -f docker-compose.frontend-dev.yaml build; \
	docker compose -f docker-compose.frontend-dev.yaml up

.PHONY: run-backend-mail
run-backend-mail:
	EMAIL_BACKEND=application_tracker.users.backends.AsyncSmtpEmailBackend docker compose -f docker-compose.frontend-dev.yaml down; \
	EMAIL_BACKEND=application_tracker.users.backends.AsyncSmtpEmailBackend docker compose -f docker-compose.frontend-dev.yaml build; \
	EMAIL_BACKEND=application_tracker.users.backends.AsyncSmtpEmailBackend docker compose -f docker-compose.frontend-dev.yaml up

.PHONY: stop-backend
stop-backend:
	docker compose -f docker-compose.frontend-dev.yaml down

.PHONY: runserver
runserver:
	poetry run python -m application_tracker.manage runserver

.PHONY: runserver-mail
runserver-mail:
	EMAIL_BACKEND=application_tracker.users.backends.AsyncSmtpEmailBackend poetry run python -m application_tracker.manage runserver

.PHONY: shell
shell:
	poetry run python -m application_tracker.manage shell_plus

.PHONY: superuser
superuser:
	poetry run python -m application_tracker.manage createsuperuser

.PHONY: run-frontend
run-frontend:
	cd frontend; npm i; npm start

.PHONY: build-frontend
build-frontend:
	cd frontend; npm i; npm run build

.PHONY: run-production
run-production:
	test -f .env || touch .env
	docker compose down; docker compose build; docker compose up -d --force-recreate
