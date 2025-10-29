import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      database: false,
      email: false,
    },
  }

  try {
    // Check database connection
    const { error: dbError } = await supabaseAdmin
      .from('leads')
      .select('count')
      .limit(1)

    checks.checks.database = !dbError

    // Check email service (Resend)
    checks.checks.email = !!process.env.RESEND_API_KEY

    // Determine overall status
    const allHealthy = Object.values(checks.checks).every((check) => check === true)
    checks.status = allHealthy ? 'healthy' : 'degraded'

    return NextResponse.json(checks, {
      status: allHealthy ? 200 : 503,
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 503 }
    )
  }
}

