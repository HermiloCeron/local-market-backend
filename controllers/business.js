const Rating=require('../models').Rating;
const Business=require('../models').Business;
const Counter=require('../models').Counter;
const ChangeRequest=require('../models').ChangeRequest;

const renderBusiness=(req,res)=>{
    Business.findOne({
        where: {
            businessId:req.params.businessIndex
        },
        include: [Rating]
    })
    .then(business=>{
        res.render(`business/show.ejs`,{
            business: business,
            clientIndex: req.params.clientIndex
        })
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
            newBusinessData.ownerId=req.params.clientIndex;
            Business.create(newBusinessData)
            .then(newBusiness=>{
                res.redirect(`/business/${req.params.clientIndex}/show/${newBusiness.businessId}`);
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
            editedBusinessData.businessId=req.params.businessIndex;
            editedBusinessData.ownerId=req.params.clientIndex;
            Business.update(editedBusinessData,{
                where: {businessId: req.params.businessIndex},
                returning: true
            })
            .then(updatedBusiness=>{
                res.redirect(`/business/${req.params.clientIndex}/show/${req.params.businessIndex}`);
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
                    ChangeRequest.create(changeRequestBusinessData)
                    .then(createdChangeRequest=>{
                        res.redirect(`/business/${req.params.clientIndex}/show/${req.params.businessIndex}`);
                    })
                })
            })
        }
    })
}

module.exports = {
    renderBusiness,
    renderNew,
    createBusiness,
    renderEdit,
    editBusiness
};