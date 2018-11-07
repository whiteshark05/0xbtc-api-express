# 0xbtc-api-express
HTTP GET APIs for 0xbtc using expressjs

Simple Express Server to convert web3 to HTTP GET APIs for 0xbtc. 

How to use:

```
git clone https://github.com/whiteshark05/0xbtc-api-express.git
cd 0xbtc-api-express
npm start
```
server runs at http://localhost:4000/

Currently built APIs:
| Routes | Description |
| --- | --- |
| ":/" | Welcome Page |
| "/owner" | Get the current owner of 0xbtc contract |
| ":/balanceOf/:address" | Get 0xbtc balance from a given address |
| ":/stats" | Display some useful stats |



Feel free to add more for your own use. :)
