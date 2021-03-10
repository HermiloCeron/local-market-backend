// const clients=require('../models/clients.js');

// const administrators=require('../models/administrators.js');
// const changeRequests=require('../models/change-requests.js');
// const ownerAprovals=require('../models/owner-aprovals.js');
// const peers=require('../models/peers.js');
// const ratings=require('../models/ratings.js');

const Client=require('../models').Client;
const Counter=require('../models').Counter;

const renderLogin=(req,res)=>{
    res.render('login.ejs')
}

const renderSignup=(req,res)=>{
    res.render('signup.ejs')
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
        }
    })
    .then(client=>{
        res.render('profile.ejs',{
            client: client
        })
    })
}

const signupClient=(req,res)=>{
    Counter.findByPk(1)
    .then(counters=>{
        //console.log(counters)
        counters.clients++;
        //console.log(counters)
        Counter.update(counters.dataValues,{
            where:{id:1},
            returning:true
        })
        .then(updatedCounter=>{
            console.log(updatedCounter[1][0].dataValues)
            let newClientData=req.body;
            newClientData.clientId=updatedCounter[1][0].dataValues.clients;
            console.log(newClientData)
            Client.create(newClientData)
            .then(newClient=>{
                res.redirect(`/clients/profile/${newClient.clientId}`);
            })     
        })
    })
}

module.exports = {
    renderLogin,
    renderSignup,
    loginClient,
    renderProfile,
    signupClient
};