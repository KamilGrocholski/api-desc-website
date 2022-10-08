import { t } from '../trpc'
import { z } from 'zod'

export const endpointsRouter = t.router({
    getAllEndpoints: t.procedure
        .query(({ ctx }) => {
            return ctx.prisma.endpoints.findMany()
        })
})
    