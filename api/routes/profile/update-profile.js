import { Router } from 'express';
import { body, check, validationResult } from 'express-validator';
import { UserModel } from '../../models/User.js';
import passport from 'passport';

export const updateUser = Router();

updateUser.put(
  '/',
  // @todo: Validación y sanitización de los datos de entrada
  passport.authenticate('jwt', {session: false}),

  // @todo: Actualizar información usuario según la sesión del token JWT
  async (request, response) => {
    try {
      const userId = request.user.sub;

      const data = await UserModel.findByIdAndUpdate({ _id: userId }, request.body);

      return response.status(200).json({
        data
      });

    } catch (error) {
      console.error(`[Update-profile]: ${error}`);

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  }
);
