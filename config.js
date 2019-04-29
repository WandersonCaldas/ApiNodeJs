
/*
HTTP

200 - OK
201 - CREATED(INCLUSÃO)
202 - ACCEPTED(RECEBEU A REQUISIÇÃO E NECESSITA DE TEMPO PARA DAR O RETORNO)

400 - BAD REQUEST
401 - UNAUTHORIZED(AUTENTICAÇÃO)
403 - FORBIDDEN(AUTORIZAÇÃO)
404 - NOT FOUND

500 - INTERNAL SERVER ERROR
501 - NOT IMPLEMENTED
503 - SERVICE UNAVAILABLE

*/

global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';

const config = () => {
    return {
        bd_string: 'mongodb+srv://admin:abcd1234@cluster0-ixxhf.mongodb.net/test?retryWrites=true'       
    }      
}

module.exports = config();

