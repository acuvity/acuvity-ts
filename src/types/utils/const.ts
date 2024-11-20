import _ from "lodash";

import {
  IdentityName,
  IdentityNameToIdentifiable,
} from "../lib/@elemental-info";

export interface Identifiable {
  ID?: string | null;
  namespace?: string | null;
  name?: string | null;
}

// PropertyDetails store an elemental property details
export interface PropertyDetails {
  defaultValue?: unknown;
  creationOnly?: boolean;
  readOnly?: boolean;
  secret?: boolean;
  required?: boolean;
  title?: string;
  description?: string;
  type: string | string[];
}

export interface Identity<K extends IdentityName = IdentityName> {
  isIdentity: true;
  name: string;
  title: string;
  friendlyName: string;
  friendlyNamePlural: string;
  description: string;
  restName: K;
  resourceName: string;
  package: string;
  indexKey?: string;
  archivable: boolean;
  properties: Record<keyof IdentityNameToIdentifiable[K], PropertyDetails>;
  // Validates the data against the model's specification, and returns errors if any.
  // Guarantees to return null if no errors are found (error list will not be empty).
  findErrorForIdentity(data: unknown): ElementalValidationError | null;
}

export const identityPropertyDetailInfo = (
  identity: Identity,
  property: string,
  info: string
) => {
  if (!identity) {
    return null;
  }

  const details = _.get(identity.properties, property, undefined);

  if (!details) {
    return null;
  }

  return _.get(details, info);
};

// ElementalValidationError generates a new error for elemental validation

export class ElementalValidationError extends Error {
  constructor(message: string, public object: any, public schemaName: string) {
    super(message);
    this.name = "ElementalValidationError";
  }
}

export interface ElementalError {
  code: number;
  title: string;
  description: string;
  subject?: string;
  trace?: string;
  data?: any; // eslint-disable-line
}

// TODO: Client side validation
export const newElementalError = (
  code: number,
  message: string,
  property: string
): ElementalError => {
  return {
    code: code,
    title: "Validation error",
    description: message,
    subject: "frontend",
    data: {
      attribute: property,
    },
  };
};
