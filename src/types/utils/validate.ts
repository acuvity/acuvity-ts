import _ from "lodash";

import { IdentityName } from "../lib/@elemental-info";
import schemasMap from "../lib/@schemasMap.json";
import { ElementalValidationError } from "./const";
import {
  ISchemaModel,
  ISchemaType,
  isSchemaTypeEnum,
  isSchemaTypeRef,
  isSchemaTypeSome,
  identityNameToSchemaID,
} from "./json-schema-utils";
// import { newElementalError } from "./const";
// import { type HTTPErrorItem, HTTPError } from "../../manipulate/http-error";

const checkType = (schemaType: ISchemaType, target: any): boolean => {
  if (isSchemaTypeSome(schemaType)) {
    const res = schemaType.type.some((type) =>
      checkType({ type: type }, target)
    );
    return res;
  }
  if (isSchemaTypeEnum(schemaType)) {
    return schemaType.enum.includes(target);
  }
  if (isSchemaTypeRef(schemaType)) {
    // sample ref: myid.json#/pointer1/pointer2
    const identityName = schemaType.$ref
      .split("#")[0]
      .split(".")[0] as IdentityName;
    const schemaID = identityNameToSchemaID(identityName);
    const accessors = schemaType.$ref.split("/").slice(1);
    if (accessors.length === 0) {
      return createFindErrorForIdentity(identityName)(target) === null;
    }

    const refType = _.get(schemasMap, [schemaID, ...accessors]);
    return checkType(refType, target);
  }
  // handle `{}` type, which is equivalent to `any`
  if (
    Object.keys(schemaType).length === 0 &&
    schemaType.constructor === Object
  ) {
    return true;
  }

  switch (schemaType.type) {
    case "null":
      return target === null;
    case "string":
      return typeof target === "string";
    case "boolean":
      return typeof target === "boolean";
    case "integer":
    case "number":
      return typeof target === "number";
    case "array":
      return target === null || Array.isArray(target);
    // TODO: Relax verification
    // if (typeof schemaType.items === "object") {
    //   return (
    //     Array.isArray(target) &&
    //     schemaType.items !== undefined &&
    //     checkType(schemaType.items!, target)
    //   );
    // } else {
    //   return Array.isArray(target);
    // }
    case "object": {
      const isObject = typeof target === "object";
      if (
        schemaType.required !== undefined &&
        !schemaType.required.every(
          (requiredProp) => target[requiredProp] !== undefined
        )
      ) {
        return false;
      }
      if (
        schemaType.properties !== undefined &&
        Object.keys(schemaType.properties).length !== 0
      ) {
        return (
          isObject &&
          Object.entries(schemaType.properties).every(([propName, type]) =>
            checkType(type, target[propName])
          )
        );
      } else if (typeof schemaType.additionalProperties === "object") {
        return (
          isObject &&
          schemaType.additionalProperties !== undefined &&
          Object.values(target).every((item) =>
            checkType(schemaType.additionalProperties!, item)
          )
        );
      } else {
        return isObject;
      }
    }
  }
};

// Create a validator for a given identity
export function createFindErrorForIdentity(name: IdentityName) {
  const schemaID = identityNameToSchemaID(name) as keyof typeof schemasMap;
  const currentSchema = schemasMap[schemaID] as ISchemaModel;

  return (object: any): null | ElementalValidationError => {
    if (object === null) {
      return new ElementalValidationError(
        `Invalid ${name}: Object is null`,
        object,
        schemaID
      );
    }

    const isValid = Object.entries(currentSchema.properties).every(
      ([propName, propValue]) => {
        const typeValid =
          object[propName] !== undefined &&
          checkType(propValue as unknown as ISchemaType, object[propName]);

        if (propValue.$required) {
          if (!typeValid) {
            console.error(
              "invalid type for ",
              propName,
              object[propName],
              propValue
            );
          }
          return typeValid;
        } else {
          const result = object[propName] === undefined || typeValid;
          if (!result) {
            console.error(
              "undefined value for ",
              propName,
              object[propName],
              propValue
            );
          }
          return result;
        }
      }
    );
    if (!isValid) {
      console.error("invalid object", object, currentSchema);
      return new ElementalValidationError(
        `Invalid ${name}: Object does not match schema`,
        object,
        schemaID
      );
    }
    return null;
  };
}

// create a validate function for the given identity.
export function createValidateIdentity<T>(name: IdentityName) {
  // TODO: Client side validation
  // const findErrorForIdentity = createFindErrorsForIdentity(name);
  const findErrorForIdentity = createFindErrorForIdentity(name);

  return (obj: unknown): T => {
    const err = findErrorForIdentity(obj);
    if (err === null /*|| _.size(err) === 0*/) {
      return <T>obj;
    }
    throw err;
  };
}

// ValidateIdentities runs a validate function over a list of identities
export function ValidateIdentities<T>(
  data: unknown,
  validateIdentity: (d: unknown) => T
): T[] {
  const items = _.isArray(data) ? data : [data];
  const results: T[] = [];
  _.forEach(items, (item: unknown) => {
    try {
      results.push(validateIdentity(item));
    } catch (e) {
      console.warn(e);
    }
  });
  return results;
}

// /**
//  * Used for client side validation before the object is submitted to backend
//  * will return HTTPError if required properties are missing
//  */
// export function findClientErrorForIdentity(name: IdentityName) {
//   const schemaID = identityNameToSchemaID(name) as keyof typeof schemasMap;
//   const currentSchema = schemasMap[schemaID] as ISchemaModel;

//   return (object: object) => {
//     const errors: HTTPErrorItem[] = [];

//     Object.entries(currentSchema.properties).forEach(
//       ([propName, propValue]) => {
//         const typeValid =
//           object[propName] !== undefined &&
//           checkType(propValue as unknown as ISchemaType, object[propName]);

//         if (propValue.$required && !typeValid) {
//           errors.push(
//             newElementalError(
//               422,
//               `Attribute '${propName}' is required`,
//               propName
//             )
//           );
//         }
//       }
//     );

//     if (errors.length) {
//       return new HTTPError(422, errors);
//     }
//     return null;
//   };
// }

// export function createClientValidateIdentity<T>(name: IdentityName) {
//   const findErrorForIdentity = findClientErrorForIdentity(name);

//   return (obj: object): T => {
//     const err = findErrorForIdentity(obj);
//     if (err instanceof HTTPError) {
//       throw err;
//     }
//     return <T>obj;
//   };
// }
