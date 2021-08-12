export function userErrors({ storename, cnpj, email, password }) {
  if (!storename) return "'nome'";
  if (typeof cnpj !== 'number') return "'CNPJ' só números";
  if (!cnpj) return "'CNPJ'";
  if (!email) return "'email'";
  if (!password) return "'senha'";
}
