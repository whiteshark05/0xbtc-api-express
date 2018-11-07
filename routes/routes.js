const abi = require('./0xbtc_abi.json')
var Web3 = require('web3');
var web3 = new Web3();

const configs = {
  contractAddress:
  {
    mainnet: '0xB6eD7644C69416d67B522e20bC294A9a9B405B31',
    ropsten: '0x9D2Cc383E677292ed87f63586086CfF62a009010',
  }
}

// Using mainnet
web3.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io/121d12a96a9e4bee9b12ec5c82b4c223'));
var contractInstance = new web3.eth.Contract(abi,configs.contractAddress.mainnet);

var appRouter = function (app) {
    app.get("/", function(req, res) {
      var welcomeText = "Welcome to 0xbtc API hub. You can find most of the useful get APIs here. Post APIs are not included due to private keys being required"
      res.status(200).send(welcomeText);
    });


    // Calling a single public variable (owner)
    app.get("/owner", function(req,res){
      function getStats(response){
        contractInstance.methods.owner().call()
        .then(result => {
          var data = {owner: result};
          response.status(200).send(JSON.stringify(data))
        })
        .catch(err => {
          console.log(err)
          response.status(400).send('You suck =))')
        })
      }
      getStats(res);
    });


    // Calling contract method with argument
    app.get("/balanceOf/:address", function (req, res) {
      var address = req.params.address;
      function getBalance(response){
        contractInstance.methods.balanceOf(address).call()
        .then(result => {
          var data = {}
          data.address = address;  
          data.balance = result/Math.pow(10,8);
          response.status(200).send(data)
        })
        .catch(err => {
          console.log(err)
          response.status(400).send('You suck =))')
        })
      }
      getBalance(res);
      } 
    );


    // Calling multiple public variables at the same time, results are stored in values array
    app.get("/stats", function(req,res){
      var ownerPromise = contractInstance.methods.owner().call()
      var symbolPromise = contractInstance.methods.symbol().call()
      var namePromise = contractInstance.methods.name().call()
      var decimalsPromise = contractInstance.methods.decimals().call() 
      
      function getStats(response){
      Promise.all([ownerPromise, symbolPromise, namePromise, decimalsPromise])
      .then(function(values,res) {
        console.log(values);
        var data = {};
        data.owner = values[0];
        data.symbol = values[1];
        data.name = values[2];
        data.decimals = values[3];
        response.status(200).send(JSON.stringify(data))
      })
      .catch(err => {
        console.log(err)
        response.status(400).send('You suck =))')
      })}

      getStats(res);
    });
  }
  
  module.exports = appRouter;



  // Promise all

  // var promise1 = Promise.resolve(3);
  // var promise2 = 42;
  // var promise3 = new Promise(function(resolve, reject) {
  //   setTimeout(resolve, 100, 'foo');
  // });
  
  // Promise.all([promise1, promise2, promise3]).then(function(values) {
  //   console.log(values);
  // });
  // expected output: Array [3, 42, "foo"]










// Dectect Meta Mask

// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
//   } else {
//     // Set the provider you want from Web3.providers
//     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }













// Sample using contract get method using web3 

// contractInstance.methods.balanceOf('0xbad3EC8d6f8ca597058B5967945a01FF61fe7990').call()
// .then(res => console.log('0xbtc: ',res/Math.pow(10,8)))
// .catch(err => console.log(err))

//  web3.eth.getBalance('0xbad3EC8d6f8ca597058B5967945a01FF61fe7990')
//  .then(res => console.log('eth: ', web3.utils.fromWei(res)))