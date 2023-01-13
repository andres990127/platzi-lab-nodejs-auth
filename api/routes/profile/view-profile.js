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

    const userId = request.user.sub;

    const { _id, username } = await UserModel.findById({ _id: userId });

    return response.status(200).json({
      _id,
      username
    });
  }
);
