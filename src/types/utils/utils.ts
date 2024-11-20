import { Identifiable, Identity, PropertyDetails } from "./const";

export function isIdentity(obj: unknown): obj is Identity {
  return typeof obj === "object" && (<any>obj).isIdentity;
}

export const makeCopyOfIdentity = <T extends Identifiable>(
  obj: T,
  identity: Identity
): T => {
  const newObject: any = {};
  let useFriendlyName = false;

  for (const [propertyName, property] of Object.entries<PropertyDetails>(
    identity.properties
  )) {
    if (
      property.readOnly ||
      [
        "importHash",
        "importLabel",
        "namespace",
        "createTime",
        "updateTime",
        "ID",
      ].includes(propertyName)
    ) {
      newObject[propertyName] = undefined;
      continue;
    }

    let value = obj[propertyName];
    if (propertyName === "name" || propertyName === "friendlyName") {
      value = "Copy of " + value;
      if (propertyName === "friendlyName") {
        useFriendlyName = true;
      }
    }

    newObject[propertyName] = value;
  }

  if (useFriendlyName) {
    newObject.name = "";
  }

  return newObject as T;
};
