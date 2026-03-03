export interface Transaction {
  mshd: string;
  ten_khach_hang: string;
  dia_chi: string;
  lan_thanh_toan: string;
  so_tien_thu_thuc_te: number;
  ghi_chu: string;
  remark: string;
}

export interface ExtractionResponse {
  transactions: Transaction[];
}

export const TABLE_HEADERS: Record<keyof Transaction, string> = {
  mshd: "MSHĐ",
  ten_khach_hang: "TÊN KHÁCH HÀNG",
  dia_chi: "ĐỊA CHỈ",
  lan_thanh_toan: "LẦN THANH TOÁN",
  so_tien_thu_thuc_te: "SỐ TIỀN THU THỰC TẾ",
  ghi_chu: 'GHI CHÚ("CỌC VÁY" hoặc "")',
  remark: "REMARK ( Tiền mặt/Chuyển khoản)"
};