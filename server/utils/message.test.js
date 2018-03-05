/*global describe it */

var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var message = generateMessage('Pasha', 'Hello');
        expect(message).toInclude({ from: 'Pasha', text: 'Hello' });
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var message = generateLocationMessage('Admin',{latitude: 1, longitude: 1});
        expect(message).toInclude({from: 'Admin', url : 'https://www.google.com/maps?q=1,1'});
        expect(message.createdAt).toBeA('number');
    });
});