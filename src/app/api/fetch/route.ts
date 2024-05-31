import {metrics} from "@opentelemetry/api";
import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic';

export function GET() {
  const metricsPage = metrics.getMeter('route')

  const counter = metricsPage.createCounter('metric-from-route');
  console.log('counter', counter)
  counter.add(10, {'key': 'Метрика из next приложения'});

  return NextResponse.json({message: 'success'})
}