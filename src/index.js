const express = require('express');
const { logger } = require('./logger');
const { getStatus } = require('./rite-aid');


const PORT = 3000;

const app = express();

app.get('/status', async (req, res) => {
    logger.info('handling request');

    let status = undefined;

    try {
        status = await getStatus();
    } catch (err) {
        logger.error(`error retrieving status: [${err}]`);
        res.status(500).send('error retrieving status');
        return;
    }

    logger.info('request handled successfully');
    res.status(200).send(status);
});

app.listen(PORT, () => {
    logger.info(`Listening on port [${PORT}]`);
});
