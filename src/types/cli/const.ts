export interface IModelsJSON {
  properties: {
    [restName: string]: {
      $ref: string;
    };
  };
}

export interface ISpec {
  $id: string;
  $modelName: string;
  $modelRestName: string;
  properties: {
    [restName: string]: {};
  };
  title?: string;
}
