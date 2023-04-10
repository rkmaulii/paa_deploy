import { sign } from "jsonwebtoken";
// import prisma from "../../../lib/prisma";
import prisma from "@/lib/prisma";
const JWT_SECRET = "My-Lover"

export default async function handler(req, res) {
    // if (req.method === 'GET') {
    //     const item = await prisma.item.findMany({
    //         orderBy: {
    //             updatedAt: 'desc' // sort records by their updatedAt field in descending order
    //           },
    //     });

    //     return res.send(item);

    //  }
    if (req.method === 'POST') {
        const { token,name,category,price } = req.body;
        if(!token ){
            return res.status(400).json({ message: 'Token API tidak ada' });
        }
        if(!name || !category || !price ){
            return res.status(400).json({ message: 'Tolong Inputkan nama,kategori dan juga harga' });
        }
        const confirmToken = token === JWT_SECRET;
        if(!confirmToken){
            return res.status(401).json({ message: 'Token API Anda Salah' });
        }
        const nameautentic = await prisma.item.findUnique({ where: { name } });
        if(nameautentic){
            return res.status(400).json({ message: 'Item ini sudah tersedia ' });
        }

        const item = await prisma.item.create({
            data: {
                name,
                category,
                price
            }
        });
 
        return res.status(200).json({ message: 'Data Berhasil Ditambahkan'});

     }
     else if (req.method === 'PATCH') {
        const { token,name,category,price,id } = req.body;
        if(!token ){
            return res.status(400).json({ message: 'Token API tidak ada' });
        }
        const confirmToken = token === JWT_SECRET;
        if(!confirmToken){
            return res.status(401).json({ message: 'Token API Anda Salah' });
        }

        const item = await prisma.item.update({
            where: { id: id },
            data: {
              name,
              category,
              price
            }
        });

        return res.status(200).json({ message: 'Data Berhasil Diperbarui'});

     }
     else if (req.method === 'DELETE') {
        const { token,id } = req.body;
        if(!token ){
            return res.status(400).json({ message: 'Token API tidak ada' });
        }
        const confirmToken = token === JWT_SECRET;
        if(!confirmToken){
            return res.status(401).json({ message: 'Token API Anda Salah' });
        }

        const item = await prisma.item.delete({
            where: { id: id }
        });

        return res.status(200).json({ message: 'Data Berhasil Dihapus'});

     }
}
