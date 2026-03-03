import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Transaction } from "../types";

const getSchema = (): Schema => {
  return {
    type: Type.OBJECT,
    properties: {
      transactions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            mshd: { type: Type.STRING, description: "Mã số hợp đồng (Contract Code, e.g. HD001)." },
            ten_khach_hang: { type: Type.STRING, description: "Customer Name." },
            dia_chi: { type: Type.STRING, description: "Address." },
            lan_thanh_toan: { 
              type: Type.STRING, 
              description: "Payment phase. must be one of: 'Thanh toán hết', 'Cọc ưu đãi', 'Cọc váy', '1', '2', '3', etc." 
            },
            so_tien_thu_thuc_te: { type: Type.NUMBER, description: "Actual Amount Collected/Paid in this transaction." },
            ghi_chu: { type: Type.STRING, description: "Note. Must be 'CỌC VÁY' if mentioned, otherwise check for other critical notes or leave empty." },
            remark: { type: Type.STRING, description: "Payment method: 'Tiền mặt' (Cash) or 'Chuyển khoản' (Transfer)." }
          },
          required: ["ten_khach_hang", "so_tien_thu_thuc_te", "remark"]
        }
      }
    }
  };
};

export const extractTransactionData = async (text: string): Promise<Transaction[]> => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    You are an expert data entry assistant for a Vietnamese business.
    Your task is to parse unstructured natural language text describing sales or payment transactions into a structured JSON format.

    Rules for specific fields:
    - 'lan_thanh_toan': Identify the payment phase. Use the exact values: "Thanh toán hết", "Cọc ưu đãi", "Cọc váy", "1", "2", "3", etc.
      - If text contains "TTH", "thanh toán hết", "tất toán", use "Thanh toán hết".
      - If the text says "cọc lần 1" treat it as "1" or "Cọc váy" depending on context, but prefer "Cọc váy" if specifically depositing for a dress.
      - If it says "thanh toán lần 1", use "1".
    - 'ghi_chu': Look specifically for the phrase "CỌC VÁY". If present, set this field to "CỌC VÁY". If not, leave it empty unless there is another critical short note.
    - 'remark': Detect the payment method. If the text mentions cash, use "Tiền mặt". If it mentions banking, transfer, ck, or bank, use "Chuyển khoản".
    - 'mshd': Extract the Contract Code (Mã số hợp đồng), e.g., HD001, 2305, etc.
    - 'so_tien_thu_thuc_te': Extract the actual amount of money received/paid in this transaction.
    - If a field is missing in the text, return an empty string or 0 as appropriate. Do not invent data.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: text,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: getSchema(),
        temperature: 0.1, // Low temperature for consistent extraction
      },
    });

    if (response.text) {
      const parsedData = JSON.parse(response.text);
      return parsedData.transactions || [];
    }
    return [];
  } catch (error) {
    console.error("Gemini Extraction Error:", error);
    throw error;
  }
};