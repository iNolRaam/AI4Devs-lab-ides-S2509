import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';


dotenv.config();
const prisma = new PrismaClient();

export const app = express();
export default prisma;

const port = 3010;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
import multer from 'multer';

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX are allowed.'));
    }
  },
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});


function validateCandidateInput(body: any, file?: Express.Multer.File): { [key: string]: string } {
  const { firstName, lastName, email, phone, address, education, workExperience } = body;
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
  } else if (!/^\+?[0-9\s-]{7,}$/.test(phone)) {
    errors.phone = 'Enter a valid phone number.';
  }
  if (!address?.trim()) errors.address = 'Address is required.';
  if (!education?.trim()) errors.education = 'Education is required.';
  if (!workExperience?.trim()) errors.workExperience = 'Work experience is required.';
  // CV file validation
  if (file) {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      errors.cvFile = 'Upload a PDF or DOCX file.';
    } else if (file.size > 5 * 1024 * 1024) {
      errors.cvFile = 'File must be ≤ 5 MB.';
    }
  }
  return errors;
}

app.post('/api/candidates', upload.single('cvFile'), async (req: Request, res: Response) => {
  const errors = validateCandidateInput(req.body, (req as any).file);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  const { firstName, lastName, email, phone, address, education, workExperience } = req.body;
  // Duplicate email check (server-side validation)
  try {
    const existing = await prisma.$queryRaw<{ exists: number }[]>`
      SELECT 1 as "exists" FROM "Candidate" WHERE "email" = ${email} LIMIT 1
    `;
    if (Array.isArray(existing) && existing.length > 0) {
      return res.status(400).json({ errors: { email: 'A candidate with this email already exists.' } });
    }
  } catch (error_) {
    // If the table doesn't exist yet (prior to persistence task), do not fail the request here.
    // Log and continue so other validations still work.
    console.warn('Duplicate check skipped (likely missing Candidate table):', error_);
  }

  // Persist candidate record in DB
  try {
    const candidate = await prisma.candidate.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
        education,
        workExperience,
        // createdAt is auto-set by Prisma
        // createdByUserId: null // can be set if user context is available
        // cvUrl: (req as any).file ? (req as any).file.path : undefined // add storage logic later
      },
    });
    return res.status(201).json({ message: 'Candidate added successfully.', candidate });
  } catch (error) {
    console.error('Error persisting candidate:', error);
    return res.status(500).json({ error: 'Failed to save candidate.' });
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain'); 
  res.status(500).send('Something broke!');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
