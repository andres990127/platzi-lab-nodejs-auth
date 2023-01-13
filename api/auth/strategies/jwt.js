import { Strategy, ExtractJwt } from 'passport-jwt';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
}

const JwtStrategy = new Strategy(options, (payload, done) =>{
    return done(null, payload);
});

export default JwtStrategy;