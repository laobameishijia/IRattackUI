const { join, basename } = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('/home/lebron/IRattckUI/IRattackUI/grpc_server/model.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const modelProto = grpc.loadPackageDefinition(packageDefinition).model;
const client = new modelProto.ModelService('localhost:50051', grpc.credentials.createInsecure());

exports.detect = (base64Content) => {
    const content = Buffer.from(base64Content, 'base64');
    return new Promise((resolve, reject) => {
        client.Detect({ content }, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response.probabilities);
            }
        });
    });
};