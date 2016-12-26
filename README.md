# Car monitor

Currently WIP!

Mainly an interface for the excellent `bluetooth-obd` npm package.

This project is composed of 2 packages:

- `server` is a node.js + express + socket.io application which connect in
bluetooth to a OBD reader (like a typical OBD-II ELM327 based device)

- `client` is a React application that connects to the `server` and fetch from
it PID values

Both applications are written in ES2015 with a Babel compilation in older
version of JS for maximum compatibilities.

## Installation

It requires some system dependencies:

`apt-get install build-essential libbluetooth-dev`

You also need to have `nodejs` and `yarn` installed. A `Makefile` is available to
ease install, building and running. Have a look to `make help` is you want.

Now install js dependencies for both project:

`make install`

## Run the app with dist files

- Build dist files for both projects

`make build`

- Launch the node server:

`make start-server`


## Run the app with watchers

Watchers are available for dev purposes.

- Launch the watcher for the client (watch and rebuild)

`make watch-client`

- Launch the watcher for the server (watch, rebuild and restart the server):

`make watch-server`
