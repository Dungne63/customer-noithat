const RolePaths: { [key: string]: string[] } = {
  // admin: ["/", "/contact", "/voucher"],
  user: [
    "/",
    "/contact",
    "/blog",
    "/user-info",
    "/product-all",
    "/payment",
    "/product/:id",
    "/order",
    "blog/:id",
  ],
  guest: ["/", "/login", "/register", "/contact", "/blog"],
  onlyGuest: ["/login", "/register"],
};

export default RolePaths;
