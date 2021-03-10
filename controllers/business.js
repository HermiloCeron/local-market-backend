const Rating=require('../models').Rating;
const Business=require('../models').Business;

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

module.exports = {
    renderBusiness,
    renderNew
};