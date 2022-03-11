import {Express} from 'express'
import usersApi from './api/user.routes.api';
import sessionApi from './api/session.routes.api'
import requireUser from "../middleWare/requireUser";
import questionApi from './api/question.routes.api'


export default function routesLoader(app: Express){
    //user api
    app.use('/api/user', usersApi);
    //session api
    app.use('/api/session', sessionApi);
    //question api
    app.use('/api/question', requireUser, questionApi);
}