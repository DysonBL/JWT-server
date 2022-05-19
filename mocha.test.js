const axios=require('axios');
const {expect}=require('chai');

//signup api test
describe("Customer API Testing",async()=>{
    it("Sign up user test",async()=>{
        const response = await axios.post('http://localhost:3004/signup', { 
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);
        expect(response.status).equals(200); 
    })
})
//login api test
describe("Customer API Testing",async()=>{
    it("Login user test",async()=>{
        const response = await axios.post('http://localhost:3004/login', { 
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);
        expect(response.status).equals(200); 
    })
})
//get page
describe("Customer API Testing",async()=>{
    it("get api page test",async()=>{
        const response = await axios.get('https://jsonplaceholder.typicode.com/users', { 
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.Data);
        expect(response.status).equals(200); 
    })
})
