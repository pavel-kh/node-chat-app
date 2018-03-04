/*global describe it */

var expect = require('expect');
var { generateMessage } = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var message = generateMessage('Pasha', 'Hello');
        expect(message).toInclude({ from: 'Pasha', text: 'Hello' });
        expect(message.createdAt).toBeA('number');
    });
});