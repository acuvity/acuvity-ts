# Latency

Holds information about latencies introduced by Apex.

## Example Usage

```typescript
import { Latency } from "@acuvity/acuvity/models/components";

let value: Latency = {};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `accessPolicy`                                                          | *number*                                                                | :heavy_minus_sign:                                                      | How much time it took to run the access policy in nanoseconds.          |
| `analysis`                                                              | *number*                                                                | :heavy_minus_sign:                                                      | How much time it took to run content analysis in nanoseconds.           |
| `assignPolicy`                                                          | *number*                                                                | :heavy_minus_sign:                                                      | How much time it took to run the assign policy in nanoseconds.          |
| `contentPolicy`                                                         | *number*                                                                | :heavy_minus_sign:                                                      | How much time it took to run content policy in nanoseconds.             |
| `extraction`                                                            | *number*                                                                | :heavy_minus_sign:                                                      | How much time it took to run input or output extraction in nanoseconds. |