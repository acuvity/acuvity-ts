# Detector

Represent a detector an analyzer can use.

## Example Usage

```typescript
import { Detector } from "@acuvity/acuvity/models/components";

let value: Detector = {};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `description`                        | *string*                             | :heavy_minus_sign:                   | The description of the detection.    |
| `group`                              | *string*                             | :heavy_minus_sign:                   | The group the detection belongs to.  |
| `label`                              | *string*                             | :heavy_minus_sign:                   | The label returned by the model.     |
| `name`                               | *string*                             | :heavy_minus_sign:                   | The name of the detection.           |
| `positional`                         | *boolean*                            | :heavy_minus_sign:                   | Tell if the detection is positional. |