const clients=require('../models/clients.js');

const administrators=require('../models/administrators.js');
const changeRequests=require('../models/change-requests.js');
const ownerAprovals=require('../models/owner-aprovals.js');
const peers=require('../models/peers.js');
const ratings=require('../models/ratings.js');

const updatePeers=(req,res)=>{
    clients.map(client => {
        let clientRatings=ratings.filter(rating => rating.clientId==client.clientId);
        //console.log(clientRatings)

        clients.map(otherClient=>{
            if(otherClient.clientId!==client.clientId && client.locationId===otherClient.locationId){
                let otherClientRatings=ratings.filter(rating => rating.clientId==otherClient.clientId);
                let compatibilityLength=Math.floor(clientRatings.length*0.8);
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

                        }else{
                            compatibilityIndex-=1;
                        }
                        //console.log(otherClientRate)
                    })
                    console.log(client.clientId,otherClient.clientId,compatibilityIndex)
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