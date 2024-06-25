export const getDateObj = (dateObj: any): Date =>
    dateObj.getVarDate ? dateObj.getVarDate() : dateObj;
