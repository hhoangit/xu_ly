# API Test Commands

## 1. Health Check
```bash
curl http://localhost:3001/health
```

## 2. Extract Transaction Data
```bash
curl -X POST http://localhost:3001/api/extract \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Khách hàng Nguyễn Văn A, địa chỉ 123 Đường ABC, hợp đồng HD001, thanh toán lần 1 số tiền 5000000 bằng tiền mặt. Ghi chú: CỌC VÁY"
  }'
```

## 3. Extract Multiple Transactions
```bash
curl -X POST http://localhost:3001/api/extract \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Khách hàng Nguyễn Văn A, địa chỉ 123 Đường ABC, hợp đồng HD001, thanh toán lần 1 số tiền 5000000 bằng tiền mặt. Ghi chú: CỌC VÁY. Khách hàng Trần Thị B, địa chỉ 456 Đường XYZ, hợp đồng HD002, cọc ưu đãi số tiền 3000000 bằng chuyển khoản."
  }'
```

## 4. Test Error Handling (Missing text field)
```bash
curl -X POST http://localhost:3001/api/extract \
  -H "Content-Type: application/json" \
  -d '{}'
```

## 5. Pretty Print JSON Response (using jq)
```bash
curl -X POST http://localhost:3001/api/extract \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Khách hàng Nguyễn Văn A, địa chỉ 123 Đường ABC, hợp đồng HD001, thanh toán lần 1 số tiền 5000000 bằng tiền mặt. Ghi chú: CỌC VÁY"
  }' | jq .
```
