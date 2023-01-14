import { Router } from 'express';
import { body, check, validationResult } from 'express-validator';
import { UserModel } from '../../models/User.js';
import passport from 'passport';
import bcrypt from 'bcrypt';

export const updateUser = Router();

updateUser.put(
  '/',
  // @todo: Validación y sanitización de los datos de entrada
  passport.authenticate('jwt', {session: false}),

  // @todo: Actualizar información usuario según la sesión del token JWT
  async (request, response) => {
    try {
      const userId = request.user.sub;
      let data = request.body;

      if(request.body.password){
        const hash = await bcrypt.hash(data.password, 5);
        data = {...data, password: hash}
      }

      const { _id, username} = await UserModel.findByIdAndUpdate({ _id: userId }, data);

      return response.status(200).json({
        _id,
        username
      });

    } catch (error) {
      console.error(`[Update-profile]: ${error}`);

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  }
);
