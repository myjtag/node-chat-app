const expect = require('expect');
const {Users} = require('./users');

describe('Users',()=>{
    
    let users;

    beforeEach(()=>{
        users = new Users();
        users.users=[{
            id:'1',
            name:'Mike',
            room:'ASiDesigner'
        },{
            id:'2',
            name:'Jen',
            room:'Node course'
        },{
            id:'3',
            name:'Julie',
            room:'ASiDesigner'
        }];
    });

    it('should add new user',()=>{
        let users = new Users();
        let user={
            id:'123',
            name:'Ali',
            room:'ASiDesigner HQ'
        };

        let resUser= users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    });


    it('should return names for ASiDesigner',()=>{

        let userList = users.getUserList('ASiDesigner');
        expect(userList).toEqual(['Mike','Julie']);
    });

    it('should return names for Node course',()=>{

        let userList = users.getUserList('Node course');
        expect(userList).toEqual(['Jen']);
    });

    it('should remove a user',()=>{
        let userID = '1';
        let user= users.removeUser(userID);
        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user',()=>{
        let userID = '99';
        let user= users.removeUser(userID);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user',()=>{
        let userID ='2';
        let user = users.getUser(userID);

        expect(user.id).toBe(userID);
    });

    it('should not find user',()=>{
        let userID ='99';
        let user = users.getUser(userID);

        expect(user).toBeFalsy();
    });

});