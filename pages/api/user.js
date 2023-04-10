import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/middleware";

export default authMiddleware(async function handler(req, res){
    if (req.method === 'GET') {
        const userId = req.user.userId;
        const user = await prisma.user.findMany({
                    orderBy: {
                        updatedAt: 'desc' // sort records by their updatedAt field in descending order
                      },
                });

        if (!user) {
            return res.status(401).json({ message: 'invalid' });
        }

        return res.send( user );
    } else {
        return res.status(405).json({ message: 'method not allowed' })
    }
})