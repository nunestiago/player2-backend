import mongoose from 'mongoose';

const compSchema = new mongoose.Schema({
  storename: {
    type: String,
    required: 'Nome do negócio obrigatório',
    trim: true,
  },
  cnpj: { type: Number, required: 'CNPJ obrigatório', trim: true },
  email: { type: String, required: 'E-mail obrigatório', trim: true },
  password: { type: String, required: 'Senha obrigatória', trim: true },
});

export const compModel = mongoose.model('compSchema', compSchema);
