const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {

    const authorization = request.get('authorization');
    
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        request.token = authorization.substring(7);
    }

    next();
}

const userExtractor = (request, response, next) => {
    const decodedToken =  request.token ? jwt.verify(request.token, process.env.SECRET) : null;

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        });
    }

    request.user = decodedToken;

    next();
}

module.exports = {
    tokenExtractor,
    userExtractor
}