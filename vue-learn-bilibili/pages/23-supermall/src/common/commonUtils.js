export function formatDate(val){
  let a = new Date(val);

  return a.getFullYear()+'-'+(a.getMonth()+1)+'-'+a.getDate();
}
