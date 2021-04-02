const axios = require('axios');
const { logger } = require('./logger');


const stores = {
    5433: '1001 S Glendon Avenue, Los Angeles, CA 90024; (310) 209-0708',
    5456: '11321 National Boulevard, Los Angeles, CA 90064; (310) 479-5729',
    5490: '2412 Pico Boulevard, Santa Monica, CA 90405; (310) 450-7624',
    5489: '1808 Wilshire Boulevard, Santa Monica, CA 90403; (310) 829-3951',
    5488: '1331 Wilshire Boulevard, Santa Monica, CA 90403; (310) 458-0731',
    5441: '9864 National Boulevard, Los Angeles, CA 90034; (310) 836-0623',
    5461: '463 North Bedford Drive, Beverly Hills, CA 90210; (310) 247-0843',
    5463: '3802 Culver Center Street, Culver City, CA 90232; (310) 837-2122',
    5485: '888 Lincoln Boulevard, Venice, CA 90291; (310) 396-2838',
    5462: '300 North Canon Drive, Beverly Hills, CA 90210; (310) 273-3561'
};

const getStatus = async () => {
    logger.info(`retrieving status`);

    const avaiabilities = {};

    for (const storeIdentifier in stores) {
        try {
            const storeSlots = await _getStoreSlots(storeIdentifier);
            avaiabilities[storeIdentifier] = _hasAvailability(storeSlots);
        } catch (err) {
            logger.error(`exception retrieving slots for store [${storeIdentifier}]`);
        }
    }

    logger.info(`collected availabilities [${JSON.stringify(avaiabilities)}]`);

    const response = { avaiabilities };

    logger.info(`returning response [${JSON.stringify(response)}]`);

    return response;
};

const _getStoreSlots = async (storeIdentifier) => {
    const response = await axios.get(`https://www.riteaid.com/services/ext/v2/vaccine/checkSlots?storeNumber=${storeIdentifier}`)

    if (response.status !== 200 || response.data.Status !== 'SUCCESS') {
        throw new Error(`exception checking status for store [${storeIdentifier}]: [${response.data.ErrCde}: ${response.data.ErrMsg}]`);
    }

    return response.data.Data;
};

const _hasAvailability = storeSlots => Object.values(storeSlots.slots).some(v => v);

module.exports = { getStatus };
