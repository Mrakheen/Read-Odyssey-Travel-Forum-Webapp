export const GetUsername = (name) => {
  console.log(name);
  if (name) return name.replace("signedbygoogle", "");
  return "";
};
