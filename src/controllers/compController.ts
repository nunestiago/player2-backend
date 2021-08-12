import { compModel } from '@models/compModel';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { checkCnpj } from 'src/utils/checkCnpj';
import { userErrors } from 'src/utils/fielsValidation';

export const register = async (req: Request, res: Response) => {
  const { storename, cnpj, email, password }: CompRegister = req.body;

  const fieldError = userErrors(req.body);

  if (fieldError) {
    return res
      .status(400)
      .json({ error: `O campo  ${fieldError} é obrigatório.` });
  }

  const cnpjCheck = await checkCnpj(cnpj, res);

  // TODO verificar caso de erro
  try {
    const isCNPJ = await compModel.findOne({ cnpj }).exec();
    if (isCNPJ) {
      res.status(400).json('CNPJ já existe no sistema');
    }
  } catch (e) {
    return res.status(404).json(e.message);
  }
  // mandar verif do CNPJ pro utils

  try {
    const hash = await bcrypt.hash(password, 10);

    const newComp = new compModel({
      storename,
      cnpj,
      email,
      password: hash,
    });

    const savedComp = await newComp.save();

    res.json(savedComp);
  } catch (e) {
    return res.status(404).json(e.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json('Todos os campos são obrigatórios');
  }

  try {
    const user: DBFind = await compModel.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ error: 'Email e/ou senha não conferem.' });
    }

    const verifiedPassword = await bcrypt.compare(password, user.password);

    if (!verifiedPassword) {
      return res.status(400).json({ error: 'Email e/ou senha não conferem.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET);

    const values = {
      id: user._id,
      storename: user.storename,
      cnpj: user.cnpj,
      email: user.email,
    };

    return res.status(200).json({ values, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const edit = async (req: Request, res: Response) => {
  const { storename, cnpj, email, password, newPassword } = req.body;

  const user = req.user;

  if (user.email !== email) {
    try {
      const isEmail = await compModel.findOne({ email }).exec();
      if (isEmail) {
        res.status(400).json('E-mail já existe no sistema');
      }
    } catch (e) {
      return res.status(404).json(e.message);
    }
  }

  if (user.cnpj !== cnpj) {
    try {
      const isCNPJ = await compModel.findOne({ email }).exec();
      if (isCNPJ) {
        res.status(400).json('CNPJ já existe no sistema');
      }
    } catch (e) {
      return res.status(404).json(e.message);
    }
  }

  const isPassword = await bcrypt.compare(user.password, password);

  if (!isPassword) {
    res.status(400).json('Senha não confere');
  }

  let newHash: String;
  if (newPassword) {
    newHash = await bcrypt.hash(newPassword, 10);
  }

  const values = {
    storename: storename ?? user.storename,
    cnpj: cnpj ?? user.cnpj,
    email: email ?? user.email,
    password: newHash ?? user.password,
  };
  let update = await compModel.findOneAndUpdate({ id: user.id }, values);

  update = await compModel.findById(user.id);

  res.json(update);
};

export const deleteComp = async (req: Request, res: Response) => {
  const user = req.user;

  const deleteUser = await compModel.findOneAndRemove({ id: user.id });
};
