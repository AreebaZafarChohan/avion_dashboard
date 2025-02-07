interface OrderData {
    productId: string;
    productName: string;
    quantity: number;
    totalAmount: number;
    status: string;
    originalPrice: number;
  }
  
export  interface Order {
    orderId: string;
    _id: string;
    userId: string;
    orderDate: string;
    orderData: OrderData[];
  }

 export interface ShipmentData {
    orderId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    countryCode: string;
    shippingAddress: string;
    trackingNumber: string;
    shipmentDate: string;
    deliveryDate: string;
    carrier: string;
  }

  export interface UserData {
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    address: string;
    country: string;
    zipCode: string;
    state: string;
    city: string;
    order: Order[];
  }