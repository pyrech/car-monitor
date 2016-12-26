
# HELP MENU
all: help
help:
	@echo ""
	@echo "# Help Menu"
	@echo ""
	@echo "   Need some help?"
	@echo ""
	@echo "   ## Installation"
	@echo ""
	@echo "   .  make install              - Install all projects"
	@echo "   .  make install-client       - Install client project"
	@echo "   .  make install-server       - Install server project"
	@echo ""
	@echo "   ## Build"
	@echo ""
	@echo "   .  make build                - Build all projects"
	@echo "   .  make build-client         - Build client project"
	@echo "   .  make build-server         - Build server project"
	@echo ""
	@echo "   ## Run"
	@echo ""
	@echo "   .  make start-server         - Run the server with dist files"
	@echo "   .  make watch-client         - Watch changes on client project and rebuild client"
	@echo "   .  make watch-server         - Watch changes on server project, rebuild and restart server"
	@echo ""

install:
	@echo ""
	@echo "====================== Installing all projects ======================="
	@echo ""
	@make -s install-client
	@make -s install-server

install-client:
	@echo ""
	@echo "# Installing client"
	@echo ""
	cd client && yarn install

install-server:
	@echo ""
	@echo "# Installing server"
	@echo ""
	cd server && yarn install

build:
	@echo ""
	@echo "====================== Building all projects ======================="
	@echo ""
	@make -s build-client
	@make -s build-server

build-client:
	@echo ""
	@echo "# Building client"
	@echo ""
	cd client && yarn build

build-server:
	@echo ""
	@echo "# Building server"
	@echo ""
	cd server && yarn build

start-server:
	@echo ""
	@echo "====================== Starting the server with dist files ======================="
	@echo ""
	cd server && yarn start

watch-client:
	@echo ""
	@echo "# Watching changes on client"
	@echo ""
	cd client && yarn watch

watch-server:
	@echo ""
	@echo "# Watching changes on server and run it"
	@echo ""
	cd server && yarn watch
