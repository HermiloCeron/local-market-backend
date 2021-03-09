const clients=require('../models/clients.js');

const administrators=require('../models/administrators.js');
const changeRequests=require('../models/change-requests.js');
const ownerAprovals=require('../models/owner-aprovals.js');
const peers=require('../models/peers.js');
const ratings=require('../models/ratings.js');

const minimumCompatibilityLenghtIndex=0.6; 
const sigmaSquareConstant=1;

const densityFunction=(x,mu,squareSigma)=>{
    return (1.0/(Math.sqrt(2*Math.PI*squareSigma)))*Math.exp(-Math.pow(x-mu,2)/(2.0*squareSigma));
}

const correctionConstant=1.0/densityFunction(0,0,sigmaSquareConstant);

const updatePeers=(req,res)=>{
    clients.map(client => {
        let clientRatings=ratings.filter(rating => rating.clientId==client.clientId);
        //console.log(clientRatings)

        clients.map(otherClient=>{
            if(otherClient.clientId!==client.clientId && client.locationId===otherClient.locationId){
                let otherClientRatings=ratings.filter(rating => rating.clientId==otherClient.clientId);
                let compatibilityLength=Math.floor(clientRatings.length*minimumCompatibilityLenghtIndex);
                if(compatibilityLength>0 && otherClientRatings.length>compatibilityLength){
                    if(otherClientRatings.length<=clientRatings.length){
                        compatibilityIndex=otherClientRatings.length;
                    }
                    else{
                        compatibilityIndex=clientRatings.length;
                    }
                    clientRatings.map(clientRate =>{
                        otherClientRate=otherClientRatings.filter(otherClientRate => otherClientRate.businessId==clientRate.businessId);
                        if(otherClientRate.length>0){
                            compatibility=1;

                        }else{
                            compatibilityIndex-=1;
                        }
                        //console.log(otherClientRate)
                    })
                    //console.log(client.clientId,otherClient.clientId,compatibilityIndex)
                }
                //console.log(compatibilityLength)
            }
        })
    })
    //console.log(clients)
    console.log("Hello world")
}

module.exports = {
    updatePeers
};