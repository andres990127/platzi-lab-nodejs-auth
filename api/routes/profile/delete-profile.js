import { Router } from 'express';
import { body, check, validationResult } from 'express-validator';
import { UserModel } from '../../models/User.js';
import passport from 'passport';

export const deleteUser = Router();

deleteUser.delete(
  '/',
  // @todo: Validación y sanitización de los datos de entrada
  passport.authenticate('jwt', {session: false}),

  // @todo: Eliminar el usuario actual según la sesión del token JWT
  async (request, response) => {

    const userId = request.user.sub;

    const data = await UserModel.deleteOne({ _id: userId });

    return response.status(200).json({
      data
    });
  }
);
