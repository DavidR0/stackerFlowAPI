import {Express} from 'express'
import usersApi from './api/user.routes.api';


export default function routesLoader(app: Express){
    //user api
    app.use('/api/users',usersApi);
}