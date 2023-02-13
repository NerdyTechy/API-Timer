# API-Timer

GitHub Actions workflow for testing the response time of endpoints on an API.

## What does it do?

This workflow allows you to measure the response time of your API endpoints with custom parameters. This means that if you are hosting your API somewhere, you can have an actions workflow check your endpoints on push to ensure they respond within a set amount of time automatically, everytime you push new code. This endpoint can also serve the purpose of checking if your API is online by setting the time limit parameter to a high value, therefore giving the API lots of time to respond.

## Using this action

To use this action, create a YML file within the `.github/workflows` directory. This file can be named anything as long as it has the extention `.yml`, but we recommend calling it `api-timer.yml`.

Use the following snippet in the file to setup API-Timer, changing the values that have comments next to them as needed.
```yaml
name: "API Timer"
on: 
  push:
    branches: [ "main" ] # The branches that will run this action when pushed to

jobs:
  api-timer:
    runs-on: ubuntu-latest
    name: API Timer
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
      - name: Run API Tests
        uses: NerdyTechy/API-Timer@v1
        with:
          time-limit: 1000 # The amount of time endpoints must respond within before the test fails in ms
          base: "https://api.example.com" # The base URL of your API
          endpoints: "/endpoint1 /endpoint2 /endpoint3" # A space-separated list of endpoints on the base URL to test
```
