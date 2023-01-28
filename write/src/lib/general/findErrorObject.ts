const findErrorObject = (errorArray: [], desiredParam: string) =>
  errorArray.find(
    (errorObject: { param: string }) => errorObject.param === desiredParam
  ) || null;

export default findErrorObject;
