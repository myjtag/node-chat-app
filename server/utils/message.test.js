const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');

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

describe('GenerateLocationMessage',()=>{
    it('should generate the corret location object',()=>{
        let from = 'Ali';
        let latitude=15;
        let longitude=19;
        let url= `https://www.google.com/maps?q=15,19`;
        let message = generateLocationMessage(from,latitude,longitude);
        
        expect(message).toMatchObject({
            from,
            url
        });
        expect(typeof message.createdAt).toBe('number');
    });
});