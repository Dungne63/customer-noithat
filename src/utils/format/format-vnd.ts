/**
 * Định dạng số thành tiền Việt Nam Đồng (VNĐ).
 * @param {number} amount - Số tiền cần định dạng.
 * @returns {string} - Số tiền đã định dạng với đơn vị VNĐ.
 */
function formatVND(amount: number | any): string {
  if (amount === 0) {
    return `0 đ`;
  }
  if (isNaN(amount) || amount === null) {
    return "Số tiền không hợp lệ";
  }

  // Định dạng số với dấu phân cách hàng nghìn và ký tự VNĐ
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

export default formatVND;
