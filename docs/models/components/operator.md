# Operator

Specifies how to compare the detection's confidence value against the matcher's
threshold:
- 'Is': All Detections confidence must exactly match the threshold
- 'Min': At least one detection confidence must be greater than or equal to the
threshold
- 'Max': At least one detection confidence must be less than the threshold
The default value is 'Min'.

## Example Usage

```typescript
import { Operator } from "@acuvity/acuvity/models/components";

let value: Operator = "Max";
```

## Values

```typescript
"Is" | "Min" | "Max"
```