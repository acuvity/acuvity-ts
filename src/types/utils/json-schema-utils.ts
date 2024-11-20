import _ from "lodash";
import { IdentityName } from "../lib/@elemental-info";

export interface ISchemaTypeEnum {
  enum: string[];
}

export interface ISchemaTypeSome {
  type: Array<ISchemaTypeSimple["type"] | "object" | "array">;
}

export interface ISchemaTypeArray {
  type: "array";
  items?: ISchemaType;
}

export interface ISchemaTypeObject {
  type: "object";
  additionalProperties?: ISchemaType;
  properties?: Record<string, ISchemaType>;
  required?: string[];
}

export interface ISchemaTypeTime {
  type: "string";
  format: "date-time";
}

export interface ISchemaTypeSimple {
  type: "string" | "integer" | "boolean" | "null" | "number";
}

export interface ISchemaTypeRef {
  $ref: string;
}

export type ISchemaType =
  | ISchemaTypeSome
  | ISchemaTypeEnum
  | ISchemaTypeArray
  | ISchemaTypeObject
  | ISchemaTypeSimple
  | ISchemaTypeRef;

export interface ISchemaProperty {
  $defaultValue?: string;
  $readOnly?: boolean;
  $required?: boolean;
  $secret?: boolean;
  title: string;
  description: string;
  type: ISchemaType | ISchemaType[];
}

export interface ISchemaModel {
  properties: Record<string, ISchemaProperty>;
  $modelName: string;
  $modelRestName: IdentityName;
  $id: string;
}
export function isSchemaTypeTime(t: ISchemaType): t is ISchemaTypeTime {
  return _.get(t, "type") === "string" && _.get(t, "format") === "date-time";
}

export function isSchemaTypeRef(t: ISchemaType): t is ISchemaTypeRef {
  return _.has(t, "$ref");
}

export function isSchemaTypeEnum(t: ISchemaType): t is ISchemaTypeEnum {
  return _.has(t, "enum");
}

export function isSchemaTypeArray(t: ISchemaType): t is ISchemaTypeArray {
  return _.has(t, "items");
}

export function isSchemaTypeObject(t: ISchemaType): t is ISchemaTypeObject {
  return _.has(t, "additionalProperties");
}

export function isSchemaTypeSome(t: ISchemaType): t is ISchemaTypeSome {
  return !isSchemaTypeEnum(t) && !isSchemaTypeRef(t) && Array.isArray(t.type);
}

export function isSchemaTypeSimple(t: ISchemaType): t is ISchemaTypeSimple {
  return (
    !isSchemaTypeEnum(t) &&
    !isSchemaTypeRef(t) &&
    !isSchemaTypeSome(t) &&
    _.includes(["string", "integer", "boolean", "number"], t.type)
  );
}

export function identityNameToSchemaID(restName: IdentityName) {
  return `${restName}.json`;
}
