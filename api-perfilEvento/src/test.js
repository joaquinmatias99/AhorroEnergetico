const dia = new Date();
console.log(dia);
console.log(dia.getDay());
console.log(dia.toDateString());

const [day, month, year] = [ dia.getDate(),dia.getMonth(), dia.getFullYear()];
console.log(day, month,  year);

const [hour, minute] = [dia.getHours(),dia.getMinutes()];
console.log(hour + ":" + minute + ":00");