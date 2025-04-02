const RolePaths: { [key: string]: string[] } = {
  // admin: ["/", "/contact", "/voucher"],
  user: [
    "/",
    "/contact",
    "/voucher",
    "/user-info",
    "/product-all",
    "/payment",
    "/product/:id",
    "/order",
  ],
  guest: ["/", "/login", "/register", "/contact", "/voucher"],
  onlyGuest: ["/login", "/register"],
};

export default RolePaths;
