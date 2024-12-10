# Modality

Represents the modality of a some data.

## Example Usage

```typescript
import { Modality } from "acuvity/models/components";

let value: Modality = {
  group: "image",
  type: "png",
};
```

## Fields

| Field              | Type               | Required           | Description        | Example            |
| ------------------ | ------------------ | ------------------ | ------------------ | ------------------ |
| `group`            | *string*           | :heavy_check_mark: | The group of data. | image              |
| `type`             | *string*           | :heavy_check_mark: | The type of data.  | png                |