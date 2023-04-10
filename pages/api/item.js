import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/middleware";

export default authMiddleware(async function handler(req, res){
    if (req.method === 'GET') {
        const userId = req.user.userId;
        const item = await prisma.item.findMany({
                    orderBy: {
                        updatedAt: 'desc' // sort records by their updatedAt field in descending order
                      },
                });

        if (!item) {
            return res.status(401).json({ message: 'No Data' });
        }

        return res.send( item );
    } else {
        return res.status(405).json({ message: 'method not allowed' })
    }
})