import { Router } from 'express';
import { body, check, validationResult } from 'express-validator';
import { UserModel } from '../../models/User.js';
import passport from 'passport';

export const viewUser = Router();

viewUser.get(
  '/',
  // @todo: Validación y sanitización de los datos de entrada
  passport.authenticate('jwt', {session: false}),

  // @todo: Ver información del usuario actual según la sesión del token JWT
  async (request, response) => {
    try {
      const userId = request.user.sub;

      const data = await UserModel.findById({ _id: userId });

      if(!data){
        return response.status(400).json({error: 'User not found'});
      }

      const { _id, username } = data;

      return response.status(200).json({
        _id,
        username
      });

    } catch (error) {
      console.error(`[View-profile]: ${error}`);

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  }
);
