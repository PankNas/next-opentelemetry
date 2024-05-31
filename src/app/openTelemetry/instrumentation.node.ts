import {NodeSDK} from '@opentelemetry/sdk-node'
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-http'
import {Resource} from '@opentelemetry/resources'
import {SemanticResourceAttributes} from '@opentelemetry/semantic-conventions'
import {SimpleSpanProcessor} from '@opentelemetry/sdk-trace-node'
import {OTLPMetricExporter} from "@opentelemetry/exporter-metrics-otlp-http";
import {PeriodicExportingMetricReader} from "@opentelemetry/sdk-metrics";

const collectorOptions = {
  url: "http://localhost:5556/v1/metrics", // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
  concurrencyLimit: 1, // an optional limit on pending requests
};

const otlpExporter = new OTLPMetricExporter(collectorOptions);

export function registerOtelServer() {
  const sdk = new NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'next-app',
    }),
    metricReader: new PeriodicExportingMetricReader({exporter: otlpExporter, exportIntervalMillis: 1000,}),
    spanProcessors: [new SimpleSpanProcessor(new OTLPTraceExporter())],
  })

  sdk.start();
}