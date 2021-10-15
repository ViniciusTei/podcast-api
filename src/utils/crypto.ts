import crypto from 'crypto';

const returnHashString = (strToHash: string) => {
  const sha256Hasher = crypto.createHmac('sha256', process.env.SECRET || '');
  return sha256Hasher.update(strToHash).digest('hex');
};

export default returnHashString;
