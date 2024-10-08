const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum: number = 0;
  let remainder: number;

  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

function formatCPF(cpf: string): string {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    throw new Error("CPF deve ter 11 dígitos.");
  }

  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return cpf;
}

export { validateCPF, formatCPF };
