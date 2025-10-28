import * as z from 'zod'

export const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  from_city: z.string().min(1, 'Please select departure city'),
  to_city: z.string().min(1, 'Please select destination city'),
  date: z.date({
    required_error: 'Please select a date',
  }),
  passengers: z.number().min(1).max(20),
  aircraft_preference: z.string().optional(),
  message: z.string().max(1000).optional(),
  gdpr_consent: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy policy',
  }),
  marketing_consent: z.boolean().optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

