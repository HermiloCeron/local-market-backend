const Client=require('../models').Client;
const Counter=require('../models').Counter;
const Rating=require('../models').Rating;
const Business=require('../models').Business;
const ChangeRequest=require('../models').ChangeRequest;

const renderLogin=(req,res)=>{
    res.render('clients/login.ejs')
}

const renderSignup=(req,res)=>{
    res.render('clients/signup.ejs')
}

const loginClient=(req,res)=>{
    Client.findOne({
        where: {
            username:req.body.username,
            password:req.body.password
        }
    })
    .then(client=>{
        if(client){
            res.redirect(`/clients/profile/${client.clientId}`)
        }else{
            res.redirect('/clients/signup')
        }
        
    })
}

const renderProfile=(req,res)=>{
    Client.findOne({
        where: {
            clientId:req.params.index
        },
        include: [Business]
    })
    .then(client=>{
        res.render('clients/profile.ejs',{
            client: client
        })
    })
}

const signupClient=(req,res)=>{
    Counter.findByPk(1)
    .then(counters=>{
        counters.clients++;
        Counter.update(counters.dataValues,{
            where:{id:1},
            returning:true
        })
        .then(updatedCounter=>{
            let newClientData=req.body;
            newClientData.clientId=updatedCounter[1][0].dataValues.clients;
            Client.create(newClientData)
            .then(newClient=>{
                res.redirect(`/clients/profile/${newClient.clientId}`);
            })     
        })
    })
}

const renderEdit=(req,res)=>{
    Client.findOne({
        where: {
            clientId:req.params.index
        }
    })
    .then(client=>{
        console.log(JSON.stringify(client,null,4));
        res.render('clients/edit.ejs',{
            client: client
        })
    })
}

const editClient=(req,res)=>{
    req.body.clientId=req.params.index;
    Client.update(req.body,{
        where: {clientId: req.params.index},
        returning: true
    })
    .then(client=>{
        res.redirect(`/clients/profile/${req.params.index}`);
    })
}

const deleteClient=(req,res)=>{
    Client.destroy({
        where: {clientId: req.params.index}
    })
    .then(()=>{
        Rating.destroy({
            where: {clientId: req.params.index}
        })
        .then(()=>{
            res.redirect('/')
        })
    })
}

const renderChangeRequests=(req,res)=>{
    ChangeRequest.findAll({
        where: {ownerId: req.params.index}
    })
    .then(ownerRequests=>{
        res.render('clients/changeRequests.ejs',{
            ownerRequests: ownerRequests,
            clientIndex:req.params.index
        })
    })
}

module.exports = {
    renderLogin,
    renderSignup,
    loginClient,
    renderProfile,
    signupClient,
    renderEdit,
    editClient,
    deleteClient,
    renderChangeRequests
};