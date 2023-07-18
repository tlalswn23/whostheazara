class CustomErrorClass extends Error {
  response?: {
    data: any;
    status: number;
    headers: string;
  };
}

export default CustomErrorClass;
