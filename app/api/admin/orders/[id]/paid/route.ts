import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import { timeZoneVietNam } from '@/lib/utils'

export const PUT = auth(async (...args: any) => {
    const [req, { params }] = args
    if (!req.auth || !req.auth.user?.isAdmin) {
        return Response.json(
            { message: 'unauthorized' },
            {
                status: 401
            }
        )
    }
    try {
        await dbConnect()

        const order = await OrderModel.findById(params.id)
        const now = new Date(Date.now())
        now.setHours(now.getHours() + 7)

        if (order && !order.isPaid) {
            order.isPaid = true;
            order.paidAt = timeZoneVietNam()
            const updatedOrder = await order.save()
            return Response.json(updatedOrder)
        } else {
            return Response.json(
                { message: 'Đơn hàng này đã được thanh toán hoặc không tồn tại!' },
                {
                    status: 404
                }
            )  
        }
    } catch (error: any) {
        return Response.json(
            { message: error.message },
            { 
                status: 500
             }
        ) 
    }
}) as any