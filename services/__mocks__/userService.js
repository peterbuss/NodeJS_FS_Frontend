
const postRegister = async(body) => {
  console.log('Mocked Register');
 return Promise.resolve({
    data: {
      user: {
        firstName : "Peter",
        lastName: "BUSS",
        address: "123 bot street",
        city: "Bellach",
        state: "CA",
        zipCode: "12345",        
      },
      message: 'Successful Registration',
    }
 });
};

const postLogin = async(body) => {
  console.log('Mocked Login');
  return Promise.resolve({
    data: {
      user: {
        firstName: 'Peter',
        lastName: 'BUSS',
        address: '123 bord street',
        city: 'Bellach',
        state: 'CA',
        zipCode: '12345'
      },
      message: 'Login Successful',
      logged: true
    }
  })
  console.log(result);
  return result;  
}

module.exports = { postRegister, postLogin };


