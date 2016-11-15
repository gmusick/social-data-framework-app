# social-data-framework-app Rebuild of fatalshootings to drop cruft

## Development

### Installation

Install [Node.js](https://nodejs.org) 6.8 or higher. Install dependencies from
the current directory by executing `npm install`.

Start the app by running `npm start`. You can instead execute `npm run dev` to
start the app and have it restart on code changes.

View the app at [http://localhost:3000](http://localhost:3000).

### Docker Installation (Optional)

You may use [Docker](https://www.docker.com/) to set up a production-like
environment on your local machine. It may also be helpful in situations where
it isn't desirable to install Node.js 6.8+ locally.

Start by [installing docker for your
platform](https://docs.docker.com/engine/installation). Then build the
container by running `scripts/docker-build.sh`. Start the container by running
`scripts/docker-run.sh`.

View the app at [http://localhost:3000](http://localhost:3000). Changes you
make to the code locally will be reflected in the container.
