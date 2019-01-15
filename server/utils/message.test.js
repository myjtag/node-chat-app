const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage',()=>{
    it('should generate the correct message object',()=>{
        let from = 'jen';
        let text = 'some message';
        let message = generateMessage(from,text);
        expect(message).toMatchObject({
            from,
            text
        });
        expect(typeof message.createdAt).toBe('number');
    });
});