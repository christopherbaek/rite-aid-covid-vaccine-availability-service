const { transports, createLogger, format } = require('winston');


const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    defaultMeta: { service: 'rite-aid-covid-vaccine-availability-service' },
    transports: [
        new transports.Console()
    ],
});

module.exports = { logger };
