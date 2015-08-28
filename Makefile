NODE_ENV ?= development
NODE_BIN = ./node_modules/.bin
COMPONENTS_PATH = ./components
NODEMON = ${NODE_BIN}/nodemon

.PHONY: all
all:
	@echo ${NODE_ENV}

.PHONY: clear
clear:
	@rm -fr build/

node_modules:
	@npm install

.PHONY: build
build: node_modules

watch:

serve: build
