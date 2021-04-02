const express = require('express');
const { logger } = require('./logger');
const { getStatus } = require('./walgreens');


const PORT = 3000;

const app = express();
app.use(express.json());

app.post('/status', async (req, res) => {
    logger.info('handling request');

    const request = req.body;

    if (request === undefined) {
        logger.error(`request undefined`);
        res.status(400).send('malformed request');
        return;
    }

    const zipCode = request.zipCode;

    if (zipCode === undefined) {
        logger.error(`error reading zip code from message: [${JSON.stringify(request)}]`);
        res.status(400).send('malformed message');
        return;
    }

    let status = undefined;

    try {
        status = await getStatus(zipCode);
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
