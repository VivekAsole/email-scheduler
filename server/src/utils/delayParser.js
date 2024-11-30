export default function parseDelay(delay) {
    //separate number and string
    const match = delay.match(/^(\d+)(min|hr|days)$/);
    if (!match) throw new Error(`Invalid delay format: ${delay}`);

    const [, value, unit] = match;
    // const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
    const multipliers = { min: 60000, hr: 3600000, days: 86400000 };

    return parseInt(value, 10) * multipliers[unit];
}
