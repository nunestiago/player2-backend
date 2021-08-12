interface CompRegister {
  storename: String;
  cnpj: Number;
  email: String;
  password: String;
}

interface DBFind extends CompRegister {
  _id?: string;
  id?: string;
  __v: Number;
}
