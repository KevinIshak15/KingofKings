import { z } from 'zod';
import { 
  insertContactSchema, 
  insertInvestorSchema, 
  insertAnalysisSchema, 
  insertSubscriberSchema,
  contactSubmissions,
  investorApplications,
  rentalAnalysisRequests,
  subscribers
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertContactSchema,
      responses: {
        201: z.custom<typeof contactSubmissions.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  investors: {
    apply: {
      method: 'POST' as const,
      path: '/api/investors' as const,
      input: insertInvestorSchema,
      responses: {
        201: z.custom<typeof investorApplications.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  analysis: {
    request: {
      method: 'POST' as const,
      path: '/api/analysis' as const,
      input: insertAnalysisSchema,
      responses: {
        201: z.custom<typeof rentalAnalysisRequests.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  subscribers: {
    join: {
      method: 'POST' as const,
      path: '/api/subscribers' as const,
      input: insertSubscriberSchema,
      responses: {
        201: z.custom<typeof subscribers.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
