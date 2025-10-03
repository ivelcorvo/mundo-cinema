export const dateFormat = (date:string):string=>{
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("pt-BR");
};