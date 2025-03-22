const RolePaths: { [key: string]: string[] } = {
  admin: ["/", "/contact", "/voucher"],
  manager: ["/", "/contact", "/voucher"],
  student: ["/", "/contact", "/voucher"],
  guest: ["/", "/login", "/register", "/contact", "/voucher"],
  onlyGuest: ["/login", "/register"],
};

export default RolePaths;
