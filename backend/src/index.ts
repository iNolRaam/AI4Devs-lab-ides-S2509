import { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';


dotenv.config();
const prisma = new PrismaClient();

export const app = express();
export default prisma;

const port = 3010;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

app.post('/api/candidates', async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, address, education, workExperience } = req.body;
  const errors: { [key: string]: string } = {};
  if (!firstName?.trim()) errors.firstName = 'First name is required.';
  if (!lastName?.trim()) errors.lastName = 'Last name is required.';
  if (!email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!phone?.trim()) {
    errors.phone = 'Phone is required.';
  } else if (!/^\+?[0-9\s\-]{7,}$/.test(phone)) {
    errors.phone = 'Enter a valid phone number.';
  }
  if (!address?.trim()) errors.address = 'Address is required.';
  if (!education?.trim()) errors.education = 'Education is required.';
  if (!workExperience?.trim()) errors.workExperience = 'Work experience is required.';
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  // TODO: Add duplicate email check and DB persistence in later tasks
  return res.status(201).json({ message: 'Candidate added successfully.' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain'); 
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
