const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

async function getClientGrpc() {
  try {
    return new Promise((resolve) => {
      const protoFilePath = path.join(__dirname, '../protos/webScraping.proto');
      const packageDefinition = protoLoader.loadSync(protoFilePath);
      const webScrapingProto = grpc.loadPackageDefinition(packageDefinition).webScraping;
      const client = new webScrapingProto.WebScraping('webscraping-openai:5001', grpc.credentials.createInsecure());
      resolve(client);
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getClientGrpc,
}