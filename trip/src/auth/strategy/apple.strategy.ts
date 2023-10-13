// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { Strategy } from "passport-apple";
// import { UserService } from "src/user/user.service";

// @Injectable()
// export class AppleStrategy extends PassportStrategy(Strategy, "apple") {
//   constructor(
//     private readonly userService: UserService,
//   ) {
//     super({
//       clientID: process.env.APPLE_CLIENT_ID,
//       teamID: process.env.APPLE_TEAM_ID,
//       callbackURL: process.env.APPLE_CALLBACK_URL,
//       keyID: process.env.APPLE_KEY_ID,
//       privateKeyString: process.env.APPLE_KEY.replace(/\\n/g, '\n'),
//       passReqToCallback: false,
//     });
//   }

//   async validate(accessToken: string, refreshToken: string, idToken: string, profile: any) {
//     console.log(profile)
//     console.log(idToken)
//   }
// }