# Car monitor

Currently WIP!

Mainly an interface for the excellent [`bluetooth-obd`](https://github.com/EricSmekens/node-bluetooth-obd)
npm package.

This project is composed of 2 packages:

- `server` is a node.js + express + socket.io application which connect in
bluetooth to a OBD reader (like a typical OBD-II ELM327 based device)

- `client` is a React application that connects to the `server` and fetch from
it PID values

Both applications are written in ES2015 with a Babel compilation in older
version of JS for maximum compatibilities.

## Installation

`bluetooth-obd` is based on [`bluetooth-serial-port`](https://github.com/eelcocramer/node-bluetooth-serial-port)
which provides bluetooth features to node. It works for Linux, MacOS and Windows
but can require some system dependencies - check their README. For example, on
Linux you need to run:

`sudo apt-get install build-essential libbluetooth-dev`

You also need to have `nodejs` and `yarn` installed. A `Makefile` is available to
ease install, building and running. Have a look to `make help` if you want.

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
