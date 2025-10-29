import { Resend } from 'resend'

let resendClient: Resend | null = null

function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('Missing RESEND_API_KEY environment variable')
    }
    resendClient = new Resend(apiKey)
  }
  return resendClient
}

// Backward compatibility
export const resend = {
  emails: {
    send: (...args: Parameters<Resend['emails']['send']>) =>
      getResend().emails.send(...args),
  },
} as unknown as Resend

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}) {
  try {
    const data = await getResend().emails.send({
      from: `${process.env.NEXT_PUBLIC_SITE_NAME} <onboarding@resend.dev>`,
      to,
      subject,
      html,
      reply_to: replyTo,
    })

    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

