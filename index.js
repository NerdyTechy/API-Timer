const core = require('@actions/core');
const github = require('@actions/github');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

(async () => {
    try {
        const timeLimit = core.getInput("time-limit");
        const base = core.getInput("base");
        const endpoints = core.getInput("endpoints").split(" ");

        for (endpoint of endpoints){
            const time = Date.now();
            await fetch(`${base}${endpoint}`).then(data => data.text());
            const timeTaken = Date.now() - time;
            if (timeTaken >= timeLimit){
                core.setFailed(`The endpoint ${endpoint} took ${timeTaken}ms to respond when limit was set to ${timeLimit}ms.`);
            }
        }
    } catch(err){
        core.setFailed(err.message);
    }
})();
