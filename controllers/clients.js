const Client=require('../models').Client;
const Counter=require('../models').Counter;
const Rating=require('../models').Rating;
const Business=require('../models').Business;
const ChangeRequest=require('../models').ChangeRequest;
const OwnerAproval=require('../models').OwnerAproval;
const Administrator=require('../models').Administrator;
const constants = require('../constants');

const renderLogin=(req,res)=>{
    res.render('clients/login.ejs')
}

const renderSignup=(req,res)=>{
    res.render('clients/signup.ejs')
}

const loginClient=(req,res)=>{
    console.log(req.body)
    Client.findOne({
        where: {
            username:req.body.username,
            password:req.body.password
        }
    })
    .then(client=>{
        if(client){
            //res.redirect(`/clients/profile/${client.clientId}`)
            res.status(constants.SUCCESS).json(client)
        }else{
            //res.redirect('/clients/signup')
            res.status(constants.BAD_REQUEST).send('ERROR: Incorrect Username/Password');
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
        console.log(counters.dataValues)
        counters.clients++;
        Counter.update(counters.dataValues,{
            where:{id:1},
            returning:true
        })
        .then(updatedCounter=>{
            console.log(req.body)
            let newClientData=req.body;
            newClientData.clientId=updatedCounter[1][0].dataValues.clients;
            Client.create(newClientData)
            .then(newClient=>{
                //res.redirect(`/clients/profile/${newClient.clientId}`);
                if(newClient){
                    res.status(constants.SUCCESS).json(newClient)
                }else{
                    res.status(constants.BAD_REQUEST).send('ERROR: Something went wrong, try again');
                }

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
        //res.redirect(`/clients/profile/${req.params.index}`);
        if(client){
            res.status(constants.SUCCESS).json(client[1][0].dataValues);
        }else{
            res.status(constants.BAD_REQUEST).send('ERROR: Something went wrong, try again');
        }
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
            res.status(constants.SUCCESS).send('User deleted succesfully!');
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

const renderOwnerAprovals=(req,res)=>{
    Administrator.findOne({
        where: {clientId: req.params.index}
    })
    .then(anAdministrator=>{
        if(anAdministrator){
            OwnerAproval.findAll()
            .then(ownerAprovals=>{
                console.log(ownerAprovals);
                res.render('clients/ownerAprovals.ejs',{
                    ownerAprovals: ownerAprovals,
                    clientIndex:req.params.index
                })
            })
        }else{
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
    renderChangeRequests,
    renderOwnerAprovals
};