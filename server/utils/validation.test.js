const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString',()=>{

    it('should reject non-string values',()=>{
        let n=10;
        let validation = isRealString(n);
        expect(validation).toBe(false);
    });

    it('should reject string with only spaces',()=>{
        let str='  ';
        let validation = isRealString(str);
        expect(validation).toBe(false);
    });

    it('should allow strings with non-space characters',()=>{
        let str=' He is the one ';
        let validation = isRealString(str);
        expect(validation).toBe(true);
    });

});