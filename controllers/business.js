const Rating=require('../models').Rating;
const Business=require('../models').Business;
const Counter=require('../models').Counter;

const renderBusiness=(req,res)=>{
    Business.findOne({
        where: {
            businessId:req.params.businessIndex
        },
        include: [Rating]
    })
    .then(business=>{
        console.log(JSON.stringify(business,null,4));
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
        //console.log(JSON.stringify(client,null,4));
        res.render('business/edit.ejs',{
            business: business,
            clientIndex: req.params.clientIndex
        })
    })
}

module.exports = {
    renderBusiness,
    renderNew,
    createBusiness,
    renderEdit
};