export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const {registerOtelServer} = await import('@/app/openTelemetry/instrumentation.node');

    registerOtelServer();
  }
}
