import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
// import prisma from "../../../lib/prisma";
import prisma from "@/lib/prisma";
const JWT_SECRET = "your-secret-key"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required'});
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } else if (req.method === 'PUT') {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email. and password are required' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email }});

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exist' });
        }

        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });
        const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

            //    res.status(200).json({ message: 'Login successful', token })
        return res.status(200).json({ message: 'account registered succesfully', token});
    }
    else if (req.method === 'GET') {

        const user = await prisma.user.findMany({
            orderBy: {
                updatedAt: 'desc' // sort records by their updatedAt field in descending order
              },
        });

        return res.send(user);

     }
     else if (req.method === 'DELETE') {
        const { id } = req.body;

        const user = await prisma.user.delete({
            where: { id: id },
        });


        return res.status(200).json({ message: 'akun telah berhasil dihapus' });
     }
     else if (req.method === 'PATCH') {
        const {name,email,password,id} = req.body;
        const hashedPassword = await hash(password, 10);


        const user = await prisma.user.update({
            where: { id: id },
            data: {
              name: name,
              email: email,
              password: hashedPassword
            }
        });


        return res.status(200).json({ message: 'akun telah berhasil diupdate' });
     }
      else {
        return res.status(405).json({ message: 'method not allowed' });
    }
}