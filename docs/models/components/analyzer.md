# Analyzer

Represents an analyzer.

## Example Usage

```typescript
import { Analyzer } from "@acuvity/acuvity/models/components";

let value: Analyzer = {
  detectionMatchers: [
    [
      {},
    ],
  ],
};
```

## Fields

| Field                                                                                 | Type                                                                                  | Required                                                                              | Description                                                                           | Example                                                                               |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `id`                                                                                  | *string*                                                                              | :heavy_minus_sign:                                                                    | ID is the identifier of the object.                                                   |                                                                                       |
| `description`                                                                         | *string*                                                                              | :heavy_minus_sign:                                                                    | The description of the analyzer.                                                      |                                                                                       |
| `detectionMatchers`                                                                   | [components.DetectionMatchers](../../models/components/detectionmatchers.md)[][]      | :heavy_minus_sign:                                                                    | A list of detection matcher that will trigger the analyzer.                           | [<br/>[<br/>{<br/>"confidence": "Medium",<br/>"group": "Text",<br/>"name": "txt",<br/>"operator": "min"<br/>}<br/>]<br/>] |
| `detectors`                                                                           | [components.Detector](../../models/components/detector.md)[]                          | :heavy_minus_sign:                                                                    | The detectors the analyzer can use.                                                   |                                                                                       |
| `enabled`                                                                             | *boolean*                                                                             | :heavy_minus_sign:                                                                    | Tell if the analyzer is enabled by default.                                           |                                                                                       |
| `group`                                                                               | *string*                                                                              | :heavy_minus_sign:                                                                    | The group the analyzer belongs to.                                                    |                                                                                       |
| `models`                                                                              | [components.Analyzermodel](../../models/components/analyzermodel.md)[]                | :heavy_minus_sign:                                                                    | The models used by the analyzer.                                                      |                                                                                       |
| `name`                                                                                | *string*                                                                              | :heavy_minus_sign:                                                                    | The name of the analyzer.                                                             |                                                                                       |
| `namespace`                                                                           | *string*                                                                              | :heavy_minus_sign:                                                                    | The namespace of the object.                                                          |                                                                                       |