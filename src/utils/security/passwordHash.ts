import bcrypt from 'bcrypt';


const SALT_ROUNDS = 12;

const generateSalt = async (): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return salt;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await generateSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  
  return hashedPassword;
};
