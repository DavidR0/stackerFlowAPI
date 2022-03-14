import {Express} from 'express'
import usersApi from './api/user.routes.api';
import sessionApi from './api/session.routes.api'
import requireUser from "../middleWare/requireUser";
import questionApi from './api/question.routes.api'
import answerApi from './api/answer.routes.api'
import tagApi from './api/tag.routes.api'
import qTag from './api/qTag.routes.api'
import vote from './api/vote.routes.api'

export default function routesLoader(app: Express){
    //user api
    app.use('/api/user', usersApi);
    //session api
    app.use('/api/session', sessionApi);
    //question api
    app.use('/api/question', requireUser, questionApi);
    //answer api
    app.use('/api/answer', requireUser, answerApi);
    //tag api
    app.use('/api/tag', requireUser, tagApi);
    //qTag api
    app.use('/api/qTag', requireUser, qTag);
    //vote api
    app.use('/api/vote', requireUser, vote);
}