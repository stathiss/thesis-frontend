# thesis-frontend

## Requirements

- NodeJS
- nodeenv (https://pypi.org/project/nodeenv/)

## Development

### Preparation
 
Create a virtual environment for Node.js 12.6.0 (needs to be done only once):

    nodeenv -n 12.6.0 env --prebuilt

Use the virtual environment:

    source env/bin/activate

Install dependencies using yarn:

    yarn install

Modify the `.env` file according to your backend api.
    

## Deploy

Start server:

    sudo yarn start

You should be able to see frontend at (http://localhost:4000/)


