const Ably = require('ably');
const argv = require('yargs').argv
const env = require('node-env-file');

const channel = (argv.channel) ? argv.channel : 'test-channel';
const message = (argv.message) ? argv.message : 'test-message';
const payload = (argv.payload) ? argv.payload : '';
console.debug(`read args, channel: ${channel} message: ${message} payload: ${payload}`);

env('.env');
if (!process.env.ablyKey) {
    throw new Error('error: there should be a .env file with an ablyKey entry');
}
console.debug('read .env, ablyKey:', process.env.ablyKey);

const abortTimer = setTimeout(() => {
    throw new Error('error: there was no ably connection...');
}, 3000)

console.debug('connecting to Ably...');
const ablyInstance = new Ably.Realtime({ key: process.env.ablyKey });
ablyInstance.connection.once('connected', () => {
    console.debug('ably connected');
    clearTimeout(abortTimer);

    const ablyChannel = ablyInstance.channels.get(channel);
    console.debug(`got ably channel: ${channel}`)

    ablyChannel.publish(message, payload, () => {
        console.debug(`ably published: ${message} with payload: ${payload}`);

        process.exit();
    });
});

