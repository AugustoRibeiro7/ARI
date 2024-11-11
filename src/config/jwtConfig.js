const jwt = require('jsonwebtoken');

const blacklist = []; // Lista onde os tokens invalidados serão armazenados


const generateToken = (id)=>{
    return jwt.sign({id}, process.env.SECRET_JWT, {expiresIn:'1h'});
}

const verifyToken = (token)=>{

    if(blacklist.includes(token)){
        throw new Error('Token Inválido');
    }

    return jwt.verify(token, process.env.SECRET_JWT);
}

const blacklistToken = (token)=>{
    blacklist.push(token); // Adiciona o token à blacklist
}

module.exports = {
    generateToken,
    verifyToken,
    blacklistToken
};