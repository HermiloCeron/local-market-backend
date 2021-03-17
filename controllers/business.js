const Rating=require('../models').Rating;
const Business=require('../models').Business;
const Counter=require('../models').Counter;
const ChangeRequest=require('../models').ChangeRequest;
const OwnerAproval=require('../models').OwnerAproval;
const constants = require('../constants');
const Peer=require('../models').Peer;

const { Op } = require("sequelize");

const renderBusiness=(req,res)=>{
    Business.findOne({
        where: {
            businessId:req.params.businessIndex
        },
        include: [Rating]
    })
    .then(business=>{
        if(business){
            Rating.findOne({
                where: {
                    clientId: req.params.clientIndex,
                    businessId:req.params.businessIndex
                }
            })
            .then(rate=>{
                console.log(rate);
                let modifiedBusiness=business.dataValues;
                if(rate){
                    modifiedBusiness.requesterRating=rate.dataValues.rating;
                }else{
                    modifiedBusiness.requesterRating=0;
                }
                
                console.log(modifiedBusiness)
                res.status(constants.SUCCESS).json(modifiedBusiness);
            })
        }else{
            res.status(constants.BAD_REQUEST).send('ERROR: Incorrect Username/Password');
        }
    })
}

const renderNew=(req,res)=>{
    res.render('business/new.ejs',{
        clientIndex: req.params.clientIndex
    });
}

const createBusiness=(req,res)=>{
    Counter.findByPk(1)
    .then(counters=>{
        counters.business++;
        Counter.update(counters.dataValues,{
            where:{id:1},
            returning:true
        })
        .then(updatedCounter=>{
            let newBusinessData=req.body;
            newBusinessData.businessId=updatedCounter[1][0].dataValues.business;
            //newBusinessData.ownerId=req.params.clientIndex;
            Business.create(newBusinessData)
            .then(newBusiness=>{
                if(newBusiness){
                    let modifiedBusiness=newBusiness.dataValues;
                    modifiedBusiness.requesterRating=0;
                    res.status(constants.SUCCESS).json(modifiedBusiness);
                }else{
                    res.status(constants.BAD_REQUEST).send('ERROR: Incorrect Username/Password');
                }
            })     
        })
    })
}

const renderEdit=(req,res)=>{
    Business.findOne({
        where: {
            businessId:req.params.businessIndex
        }
    })
    .then(business=>{
        res.render('business/edit.ejs',{
            business: business,
            clientIndex: req.params.clientIndex
        })
    })
}

const editBusiness=(req,res)=>{
    req.body.businessId=req.params.businessIndex;
    Business.findOne({
        where: {
            businessId:req.params.businessIndex
        }
    })
    .then(business=>{
        console.log(business.ownerId,req.params.clientIndex)
        if(business.ownerId===parseInt(req.params.clientIndex)){
            editedBusinessData=req.body;
            //editedBusinessData.businessId=req.params.businessIndex;
            //editedBusinessData.ownerId=req.params.clientIndex;
            Business.update(editedBusinessData,{
                where: {businessId: req.params.businessIndex},
                returning: true
            })
            .then(updatedBusiness=>{
                
                if(updatedBusiness){

                    Rating.findOne({
                        where: {
                            clientId: req.params.clientIndex,
                            businessId:req.params.businessIndex
                        }
                    })
                    .then(rate=>{
                        console.log(rate);
                        let modifiedBusiness=updatedBusiness[1][0].dataValues;
                        if(rate){
                            modifiedBusiness.requesterRating=rate.dataValues.rating;
                        }else{
                            modifiedBusiness.requesterRating=0;
                        }
                        
                        console.log(modifiedBusiness)
                        res.status(constants.SUCCESS).json(modifiedBusiness);
                    })
                }else{
                    res.status(constants.BAD_REQUEST).send('ERROR: Something went wrong');
                }

            })
        }else{
            Counter.findByPk(1)
            .then(counters=>{
                counters.changeRequests++;
                Counter.update(counters.dataValues,{
                    where:{id:1},
                    returning:true
                })
                .then(updatedCounter=>{
                    changeRequestBusinessData=req.body;
                    changeRequestBusinessData.businessId=req.params.businessIndex;
                    changeRequestBusinessData.ownerId=business.ownerId;
                    changeRequestBusinessData.changeId=updatedCounter.changeRequests;
                    changeRequestBusinessData.clientId=req.params.clientIndex;
                    changeRequestBusinessData.status=0;
                    ChangeRequest.create(changeRequestBusinessData)
                    .then(createdChangeRequest=>{
                        res.redirect(`/business/${req.params.clientIndex}/show/${req.params.businessIndex}`);
                    })
                })
            })
        }
    })
}

const deleteBusiness=(req,res)=>{
    Business.findOne({
        where: {
            businessId:req.params.businessIndex
        }
    })
    .then(business=>{
        if(business.ownerId===parseInt(req.params.clientIndex)){
            ChangeRequest.destroy({
                where: {businessId: req.params.businessIndex}
            })
            .then(()=>{
                Rating.destroy({
                    where: {businessId: req.params.businessIndex}
                })
                .then(()=>{
                    Business.destroy({
                        where: {businessId: req.params.businessIndex}
                    })
                    .then(()=>{
                        res.status(constants.SUCCESS).send('Business deleted succesfully!');
                    })
                })
            })
        }else{
            res.redirect(`/business/${req.params.clientIndex}/show/${req.params.businessIndex}`)
        }
    })
}

const changeAction=(req,res)=>{
    ChangeRequest.findByPk(req.params.changeIndex)
    .then(changeRequest=>{
        let updateChange=changeRequest.dataValues;
        updateChange.status=req.body.status;
        let updateBusiness=updateChange;
        delete updateBusiness.id;
        delete updateBusiness.changeId;
        delete updateBusiness.clientId;
        ChangeRequest.update(updateChange,{
            where: {id: req.params.changeIndex},
            returning: true
        }).then(updatedRequest=>{
            if(parseInt(req.body.status)==1){
                Business.update(updateBusiness,{
                    where: {businessId: updateBusiness.businessId},
                    returning: true
                })
                .then(updatedBusiness=>{
                    res.redirect(`/business/${req.params.clientIndex}/show/${updateBusiness.businessId}`);
                })
            }else{
                res.redirect(`/business/${req.params.clientIndex}/show/${updateBusiness.businessId}`);
            }
        })
    })
}

const createOwnerRequest=(req,res)=>{
    Counter.findByPk(1)
    .then(counters=>{
        counters.ownerAprovals++;
        Counter.update(counters.dataValues,{
            where:{id:1},
            returning:true
        })
        .then(updatedCounter=>{
            let request={
                clientId:req.params.clientIndex,
                message: req.body.message,
                businessId: req.params.businessIndex,
                status: 0,
                previousOwner: req.params.ownerIndex,
                aprovalId: counters.ownerAprovals
            }
            console.log(request)
            OwnerAproval.create(request)
            .then(newOwnerAproval=>{
                res.redirect(`/business/${req.params.clientIndex}/show/${updateBusiness.businessId}`);
            })
        })
    })   
}

const aprovalAction=(req,res)=>{
    OwnerAproval.findOne({
        where: {
            aprovalId: req.params.aprovalIndex
        }
    })
    .then(aprovalRequest=>{
        console.log(aprovalRequest)
        if(parseInt(req.body.status)==1){
            Business.findOne({
                where: {
                    businessId: aprovalRequest.dataValues.businessId
                }
            })
            .then(foundBusiness=>{
                foundBusiness.dataValues.ownerId=aprovalRequest.dataValues.clientId;
                Business.update(foundBusiness.dataValues,{
                    where:{id:aprovalRequest.dataValues.businessId},
                    returning:true
                })
                .then(updatedBusiness =>{
                    res.redirect(`/business/${req.params.clientIndex}/show/${aprovalRequest.dataValues.businessId}`);
                })
            })
        }else{
            console.log("HOLA",req.params.clientIndex,aprovalRequest.dataValues.businessId)
            res.redirect(`/business/${req.params.clientIndex}/show/${aprovalRequest.dataValues.businessId}`);
        }
        
    })
}

const renderLocalBusiness=(req,res)=>{
    Business.findAll({
        where: {
            location:req.params.businessArea
        },
        include: [Rating]
    })
    .then(business=>{
        if(business){
            res.status(constants.SUCCESS).json(business);
        }else{
            res.status(constants.BAD_REQUEST).send('ERROR: Incorrect Username/Password');
        }
    })
}

const renderLucky=(req,res)=>{
    console.log("HOLA")
    Peer.findAll({
        where: {
            clientId:req.params.clientIndex
        }
    })
    .then(peers=>{
        console.log(peers)
        if(peers){
            if(peers.length>0){
                let luckyIndex=Math.floor(Math.random() * peers.length);
                let luckyId=peers[luckyIndex].dataValues.peerClientId
                console.log(luckyIndex,luckyId);
                Rating.findAll({
                    where: {
                        clientId: luckyId,
                        rating: {
                            [Op.gte]:4
                        }
                    }
                })
                .then(peerRatings=>{
                    console.log(peerRatings)
                    if(peerRatings){
                        if(peerRatings.length>0){
                            let newLuckyIndex=Math.floor(Math.random() * peerRatings.length);
                            Business.findOne({
                                where: {
                                    businessId: peerRatings[newLuckyIndex].businessId
                                }
                            })
                            .then(luckyBusiness=>{
                                Rating.findOne({
                                    where: {
                                        clientId: req.params.clientIndex,
                                        businessId:luckyBusiness.businessId
                                    }
                                })
                                .then(rate=>{
                                    console.log(rate);
                                    let modifiedBusiness=luckyBusiness.dataValues;
                                    if(rate){
                                        modifiedBusiness.requesterRating=rate.dataValues.rating;
                                    }else{
                                        modifiedBusiness.requesterRating=0;
                                    }
                                    
                                    console.log(modifiedBusiness)
                                    res.status(constants.SUCCESS).json(modifiedBusiness);
                                })
                                //res.status(constants.SUCCESS).json(luckyBusiness);
                            })
                        }
                    }
                })
            }
        }else{
            res.status(constants.BAD_REQUEST).send('ERROR: Insuficcient data');
        }
    })
}

module.exports = {
    renderBusiness,
    renderNew,
    createBusiness,
    renderEdit,
    editBusiness,
    deleteBusiness,
    changeAction,
    createOwnerRequest,
    aprovalAction,
    renderLocalBusiness,
    renderLucky
};