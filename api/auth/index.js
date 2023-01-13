import passport from 'passport';

import JwtStrategy from './strategies/jwt.js';

passport.use(JwtStrategy);