type User = import("../user/user.entity").default;

declare namespace Express {
  export type User = User
}
